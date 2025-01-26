import { Request, Response } from 'express';
import cartService from '../services/cart.service';
import { successResponse, errorResponse } from '../utils/response.util';

// If using the custom AuthRequest type:
import { AuthRequest } from '../middlewares/auth.middleware';

class CartController {
    /**
     * Get or create a cart for the logged-in user
     */
    public async getOrCreateCart(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as AuthRequest).user?.userId;
            if (!userId) {
                errorResponse(res, 'User not found in request', 401);
                return
            }

            const cart = await cartService.findOrCreateCart(userId);
            successResponse(res, cart, 'Cart retrieved successfully');
        } catch (error: any) {
            errorResponse(res, error.message, 500, error);
        }
    }

    /**
     * Add a product to the cart
     */
    public async addItem(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as AuthRequest).user?.userId;
            if (!userId) {
                errorResponse(res, 'User not found in request', 401);
                return 
            }

            const { productId, quantity } = req.body;

            const cart = await cartService.addItemToCart(userId, productId, quantity);
            successResponse(res, cart, 'Item added to cart');
        } catch (error: any) {
            errorResponse(res, error.message, 500, error);
        }
    }

    /**
     * Remove or decrement a product's quantity in the cart
     */
    public async removeItem(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as AuthRequest).user?.userId;
            if (!userId) {
                errorResponse(res, 'User not found in request', 401);
                return 
            }

            const { productId, quantity } = req.body;

            const cart = await cartService.removeItemFromCart(userId, productId, quantity);
            successResponse(res, cart, 'Item removed or decremented from cart');
        } catch (error: any) {
            errorResponse(res, error.message, 500, error);
        }
    }

    /**
     * Clear the user's cart
     */
    public async clearCart(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as AuthRequest).user?.userId;
            if (!userId) {
                errorResponse(res, 'User not found in request', 401);
                return 
            }

            const cart = await cartService.clearCart(userId);
            successResponse(res, cart, 'Cart cleared successfully');
        } catch (error: any) {
            errorResponse(res, error.message, 500, error);
        }
    }
}

export default new CartController();
