import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    age: number;
    createdAt: Date;
}

// Define the Mongoose Schema
const UserSchema: Schema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
