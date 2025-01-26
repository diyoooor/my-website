import OrderModel, { IOrder } from '../models/order.model';
import cartService from './cart.service';
import ProductModel from '../models/product.model';

class OrderService {
    /**
     * Create an Order from the user's Cart
     */
    public async checkout(userId: string): Promise<IOrder> {
        // 1. Fetch user's cart
        const cart = await cartService.findOrCreateCart(userId);

        if (!cart.items.length) {
            throw new Error('Cart is empty');
        }

        // 2. Build the array of order items
        let totalPrice = 0;
        const orderItems = [];

        for (const cartItem of cart.items) {
            // cartItem.product is the Product _id
            // cartItem.variantSKU might be the variant ID or SKU

            const product = await ProductModel.findById(cartItem.product).exec();
            if (!product) {
                throw new Error(`Product not found: ${cartItem.product}`);
            }

            // If the cart item references a variant
            let variantPrice = 0;
            let variantColor: string | undefined;
            let variantSize: string | undefined;
            let variantSKU: string | undefined;

            if (cartItem.variantSKU) {
                // Find the matching variant in the product.variants array
                const variant = product.variants.find(
                    (v) => v.sku === cartItem.variantSKU
                );
                if (!variant) {
                    throw new Error(`Variant not found: ${cartItem.variantSKU}`);
                }

                variantPrice = variant.price;
                variantColor = variant.color;
                variantSize = variant.size;
                variantSKU = variant.sku;
            } else {
                // No variant? Use product's base price (or throw error)
                variantPrice = product.basePrice || 0;
            }

            const quantity = cartItem.quantity;
            const itemTotal = variantPrice * quantity;
            totalPrice += itemTotal;

            orderItems.push({
                product: product._id,
                variantSKU,
                variantColor,
                variantSize,
                quantity,
                unitPrice: variantPrice,
            });
        }

        // 3. Create the Order
        const newOrder = new OrderModel({
            user: userId,
            items: orderItems,
            totalPrice,
            status: 'Created',
        });
        await newOrder.save();

        // 4. Clear the cart
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
