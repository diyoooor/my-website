import { Request, Response } from 'express';
import userService from '../services/user.service';

class UserController {
    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedUser = await userService.updateUser(id, req.body);
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(updatedUser);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedUser = await userService.deleteUser(id);
            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(deletedUser);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();
