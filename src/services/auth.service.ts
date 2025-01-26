
import dotenv from 'dotenv';
import UserModel, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? 'defaultSecret';

class AuthService {
    /**
     * Register a new user
     */
    public async register(
        name: string,
        email: string,
        password: string,
        age: number
    ): Promise<IUser> {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email }).exec();
        if (existingUser) {
            throw new Error('Email is already in use');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            age,
        });

        return newUser.save();
    }

    /**
     * Login and return a JWT
     */
    public async login(
        email: string,
        password: string
    ): Promise<{ token: string; user: IUser }> {
        const user = await UserModel.findOne({ email }).exec();
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        // Sign JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '30d',
        });

        return { token, user };
    }
}

export default new AuthService();
