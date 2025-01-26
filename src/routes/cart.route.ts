import { Router } from 'express';
import cartController from '../controllers/cart.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// All cart endpoints require authentication
router.get('/', authMiddleware, cartController.getOrCreateCart);
router.post('/add', authMiddleware, cartController.addItem);
router.post('/remove', authMiddleware, cartController.removeItem);
router.post('/clear', authMiddleware, cartController.clearCart);

export default router;
