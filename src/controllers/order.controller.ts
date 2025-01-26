import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import orderService from '../services/order.service';
import { errorResponse, successResponse } from '../utils/response.util';

class OrderController {
    /**
     * POST /api/orders/checkout
     * Creates an order from the user's cart
     */
    public async checkout(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as AuthRequest).user?.userId;
            if (!userId) {
                errorResponse(res, 'No user ID found in request', 401);
                return;
            }

            const newOrder = await orderService.checkout(userId);
            successResponse(res, newOrder, 'Order created successfully', 201);
        } catch (error: any) {
            errorResponse(res, error.message, 400, error);
        }
    }

    /**
     * GET /api/orders
     * Returns all orders belonging to the logged-in user
     */
    public async getUserOrders(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as AuthRequest).user?.userId;
            if (!userId) {
                errorResponse(res, 'No user ID found in request', 401);
                return;
            }

            const orders = await orderService.getUserOrders(userId);
            successResponse(res, orders, 'Orders fetched successfully');
        } catch (error: any) {
            errorResponse(res, error.message, 400, error);
        }
    }

    /**
     * (Optional) GET /api/orders/:id
     * Fetch a specific order by ID (only if it belongs to the same user or if admin)
     */
    public async getOrderById(req: Request, res: Response): Promise<void> {
        try {
            const orderId = req.params.id;
            const order = await orderService.getOrderById(orderId);
            if (!order) {
                errorResponse(res, 'Order not found', 404);
                return;
            }
            // Optionally verify it belongs to the requesting user or that user is admin
            successResponse(res, order, 'Order fetched successfully');
        } catch (error: any) {
            errorResponse(res, error.message, 400, error);
        }
    }

    /**
     * (Optional) PATCH /api/orders/:id
     * Update the order status, typically by an admin or store manager
     */
    public async updateOrderStatus(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const updatedOrder = await orderService.updateOrderStatus(id, status);
            if (!updatedOrder) {
                errorResponse(res, 'Order not found', 404);
                return;
            }

            successResponse(res, updatedOrder, 'Order status updated successfully');
        } catch (error: any) {
            errorResponse(res, error.message, 400, error);
        }
    }
}

export default new OrderController();
