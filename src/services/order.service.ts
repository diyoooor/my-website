import OrderModel, { IOrder } from '../models/order.model';
import cartService from './cart.service';
import ProductModel from '../models/product.model';

class OrderService {
    /**
     * Create an Order from the user's Cart
     */
    public async checkout(userId: string): Promise<IOrder> {
        // 1. Get the cart items (or create an empty cart if none)
        const cart = await cartService.findOrCreateCart(userId);

        if (!cart.items.length) {
            throw new Error('Cart is empty');
        }

        // 2. Build the array of order items, pulling prices from the product docs
        let totalPrice = 0;
        const orderItems = [];

        for (const cartItem of cart.items) {
            // Fetch product to get latest price
            const product = await ProductModel.findById(cartItem.product).exec();
            if (!product) {
                throw new Error(`Product not found: ${cartItem.product}`);
            }

            const unitPrice = product.price; // current price from DB
            const quantity = cartItem.quantity;
            const itemTotal = unitPrice * quantity;

            totalPrice += itemTotal;

            orderItems.push({
                product: product._id,
                quantity,
                unitPrice,
            });
        }

        // 3. Create the Order
        const newOrder = new OrderModel({
            user: userId,
            items: orderItems,
            totalPrice,
            status: 'Created', // or any default status
        });
        await newOrder.save();

        // 4. (Optional) Clear the user's cart now that the order is created
        await cartService.clearCart(userId);

        return newOrder;
    }

    /**
     * Get all orders for a user (for user-facing history)
     */
    public async getUserOrders(userId: string): Promise<IOrder[]> {
        return OrderModel.find({ user: userId }).sort({ createdAt: -1 }).exec();
    }

    /**
     * (Optional) Get details of a specific order
     */
    public async getOrderById(orderId: string): Promise<IOrder | null> {
        return OrderModel.findById(orderId).exec();
    }

    /**
     * (Optional) Update order status (e.g., admin can change from 'Created' to 'Shipped')
     */
    public async updateOrderStatus(orderId: string, status: string): Promise<IOrder | null> {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).exec();
        return updatedOrder;
    }
}

export default new OrderService();
