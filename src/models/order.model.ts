import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';
import { IProduct } from './product.model';

interface IOrderItem {
    product: IProduct['_id'];    // A reference to the product
    quantity: number;           // Quantity at the time of order
    unitPrice: number;          // Price per unit at the time of order
}

export interface IOrder extends Document {
    user: IUser['_id'];         // Which user owns this order
    items: IOrderItem[];        // Ordered items
    totalPrice: number;         // Summed total of the order
    status: string;             // E.g. 'Created', 'Pending', 'Completed', etc.
    createdAt: Date;
    updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
    {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
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
        timestamps: true, // adds createdAt and updatedAt
        versionKey: false,
    }
);

const OrderModel = model<IOrder>('Order', OrderSchema);
export default OrderModel;
