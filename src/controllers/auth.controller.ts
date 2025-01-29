import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { errorResponse, successResponse } from '../utils/response.util';


class AuthController {
    /**
     * Register a new user
     */
    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, age } = req.body;

            console.log(req.body)
            const newUser = await authService.register(name, email, password, age);
            successResponse(res, newUser, 'User registered successfully', 201);
        } catch (error: any) {
            errorResponse(res, error.message, 400, error);
        }
    }

    /**
     * Login
     */
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const { token, user } = await authService.login(email, password);

            // Return token and user data
            successResponse(res, { token, user }, 'Login successful');
        } catch (error: any) {
            errorResponse(res, error.message, 401, error);
        }
    }
}

export default new AuthController();
