import { Router } from 'express';
import orderController from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// POST /api/orders/checkout => create a new order from the user's cart
router.post('/checkout', authMiddleware, orderController.checkout);

// GET /api/orders => get user's own orders
router.get('/', authMiddleware, orderController.getUserOrders);

// GET /api/orders/:id => get specific order
router.get('/:id', authMiddleware, orderController.getOrderById);

// PATCH /api/orders/:id => update an order's status
router.patch('/:id', authMiddleware, orderController.updateOrderStatus);

export default router;
