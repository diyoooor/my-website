import CartModel, { ICart } from '../models/cart.model';
import { IProduct } from '../models/product.model';

class CartService {
    /**
     * Find a user's cart or create one if it doesn't exist
     */
    public async findOrCreateCart(userId: string): Promise<ICart> {
        let cart = await CartModel.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            cart = new CartModel({ user: userId, items: [] });
            await cart.save();
        }
        return cart;
    }

    /**
     * Get a cart by user ID
     */
    public async getCartByUser(userId: string): Promise<ICart | null> {
        return CartModel.findOne({ user: userId }).populate('items.product').exec();
    }

    /**
     * Add a product to the cart or increment if it already exists
     */
    public async addItemToCart(userId: string, productId: string, quantity = 1): Promise<ICart> {
        // Get or create the cart
        const cart = await this.findOrCreateCart(userId);

        // See if product already in the cart
        const existingItem = cart.items.find(
            (item: any) => item.product.toString() === productId
        );

        if (existingItem) {
            // Increment the quantity
            existingItem.quantity += quantity;
        } else {
            // Add a new item
            cart.items.push({ product: productId as IProduct['_id'], quantity });
        }

        await cart.save();
        return cart.populate('items.product');
    }

    /**
     * Remove a product from the cart or decrement quantity
     */
    public async removeItemFromCart(userId: string, productId: string, quantity = 1): Promise<ICart> {
        const cart = await this.findOrCreateCart(userId);

        const existingItem = cart.items.find(
            (item: any) => item.product.toString() === productId
        );

        if (!existingItem) {
            // No such product in the cart; just return the cart as-is
            return cart;
        }

        // If quantity left would be <= 0, remove the item
        if (existingItem.quantity <= quantity) {
            cart.items = cart.items.filter((item: any) => item.product.toString() !== productId);
        } else {
            existingItem.quantity -= quantity;
        }

        await cart.save();
        return cart.populate('items.product');
    }

    /**
     * Clear all items from the cart
     */
    public async clearCart(userId: string): Promise<ICart> {
        const cart = await this.findOrCreateCart(userId);
        cart.items = [];
        await cart.save();
        return cart.populate('items.product');
    }
}

export default new CartService();
