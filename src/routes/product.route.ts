import { Router } from 'express';
import productController from '../controllers/product.controller';
// If you need auth:
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * Add routes for the Product resource.
 * If you want them secured, add `authMiddleware` as needed.
 */
router.post('/', authMiddleware, productController.createProduct);
router.get('/:id', authMiddleware, productController.getProductById);
router.get('/', authMiddleware, productController.getAllProducts);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;
