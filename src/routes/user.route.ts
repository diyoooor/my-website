import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

/**
 * Routes for the User resource
 */

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
