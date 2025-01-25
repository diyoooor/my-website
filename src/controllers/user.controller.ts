import { Request, Response } from 'express';
import userService from '../services/user.service';
import { errorResponse, successResponse } from '../utils/response.util';

class UserController {
    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = await userService.createUser(req.body);
            successResponse(res, newUser, 'User created successfully', 201);
        } catch (error: any) {
            errorResponse(res, error.message, error.code)
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            if (!user) {
                errorResponse(res, 'User not found', 404)
                return;
            }
            successResponse(res, user, '', 200);
        } catch (error: any) {
            errorResponse(res, error.message, error.code)
        }
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers();
            successResponse(res, users, '', 200);
        } catch (error: any) {
            errorResponse(res, error.message, error.code)
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedUser = await userService.updateUser(id, req.body);
            if (!updatedUser) {
                errorResponse(res, 'User not found', 404)
                return;
            }
            res.json(updatedUser);
        } catch (error: any) {
            errorResponse(res, error.message, error.code)
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedUser = await userService.deleteUser(id);
            if (!deletedUser) {
                errorResponse(res, 'User not found', 404)
                return;
            }
            res.json(deletedUser);
        } catch (error: any) {
            errorResponse(res, error.message, error.code)
        }
    }
}

export default new UserController();
