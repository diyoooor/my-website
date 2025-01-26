import { Schema, model, Document } from 'mongoose';

import { IProduct } from './product.model';
import { IUser } from './user.model';

interface ICartItem {
    product: IProduct['_id'];
    quantity: number;
}

export interface ICart extends Document {
    user: IUser['_id'];
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
    },
    { _id: false } // We can disable _id on subdocs if desired
);

const CartSchema = new Schema<ICart>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: {
            type: [CartItemSchema],
            default: [],
        },
    },
    {
        timestamps: true, // automatically adds createdAt and updatedAt
        versionKey: false,
    }
);

const CartModel = model<ICart>('Cart', CartSchema);

export default CartModel;
