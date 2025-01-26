// src/models/cart.model.ts

import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';
import { IProduct } from './product.model';

/**
 * Each item in the cart references a specific product
 * plus optional variant fields (e.g., variantSKU, color, size).
 */
export interface ICartItem {
    product: IProduct['_id'];
    variantSKU?: string;    // unique identifier for the variant
    variantColor?: string;
    variantSize?: string;
    quantity: number;
}

/**
 * Cart document stores user reference + array of items
 */
export interface ICart extends Document {
    user: IUser['_id'];
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Subdocument schema for a single cart item
 */
const CartItemSchema = new Schema<ICartItem>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        variantSKU: { type: String },
        variantColor: { type: String },
        variantSize: { type: String },
        quantity: { type: Number, default: 1 },
    },
    { _id: false } // you can let Mongoose create _id if you prefer
);

/**
 * Main Cart schema
 */
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
        timestamps: true, // adds createdAt, updatedAt
        versionKey: false,
    }
);

const CartModel = model<ICart>('Cart', CartSchema);

export default CartModel;
