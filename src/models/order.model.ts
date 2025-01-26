// src/models/order.model.ts

import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';
import { IProduct } from './product.model';

interface IOrderItem {
    product: IProduct['_id'];       // A reference to the product
    variantSKU?: string;            // The SKU for the variant (unique)
    variantColor?: string;          // If you want to store color, etc.
    variantSize?: string;           // e.g., "Small", "Medium", ...
    quantity: number;               // Quantity purchased
    unitPrice: number;              // Price per unit at time of purchase
}

export interface IOrder extends Document {
    user: IUser['_id'];
    items: IOrderItem[];
    totalPrice: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
    {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        variantSKU: { type: String },
        variantColor: { type: String },
        variantSize: { type: String },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
    },
    { _id: false }
);

const OrderSchema = new Schema<IOrder>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: { type: [OrderItemSchema], default: [] },
        totalPrice: { type: Number, default: 0 },
        status: { type: String, default: 'Created' },
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false,
    }
);

const OrderModel = model<IOrder>('Order', OrderSchema);
export default OrderModel;
