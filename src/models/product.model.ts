// src/models/product.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IVariant {
  sku: string;
  color?: string;
  size?: string;
  price: number;
  stock: number;
}

export interface IProduct extends Document {
  name: string;
  description?: string;
  // If a product can have a "base price" or "default" info, include here
  basePrice?: number;
  // The key part: an array of variant subdocuments
  variants: IVariant[];
  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema = new Schema<IVariant>(
  {
    sku: { type: String, required: true, unique: true },
    color: { type: String },
    size: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    basePrice: { type: Number, default: 0 },
    variants: {
      type: [VariantSchema],
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    versionKey: false,
  }
);

const ProductModel = model<IProduct>('Product', ProductSchema);

export default ProductModel;
