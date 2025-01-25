import UserModel, { IUser } from "../models/User.model";

/**
 * The service layer encapsulates all database logic
 * so that the controllers remain focused on handling
 * request/response logic.
 */
class UserService {
    // Create a new user
    public async createUser(data: Partial<IUser>): Promise<IUser> {
        const user = new UserModel(data);
        return user.save();
    }

    // Retrieve a user by id
    public async getUserById(userId: string): Promise<IUser | null> {
        return UserModel.findById(userId).exec();
    }

    // Retrieve all users
    public async getAllUsers(): Promise<IUser[]> {
        return UserModel.find().exec();
    }

    // Update a user
    public async updateUser(userId: string, data: Partial<IUser>): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(userId, data, { new: true }).exec();
    }

    // Delete a user
    public async deleteUser(userId: string): Promise<IUser | null> {
        return UserModel.findByIdAndDelete(userId).exec();
    }
}

export default new UserService();
