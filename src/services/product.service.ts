// src/services/product.service.ts

import ProductModel, { IProduct, IVariant } from '../models/product.model';

class ProductService {
    // Create a product (with or without initial variants)
    public async createProduct(data: Partial<IProduct>): Promise<IProduct> {
        const product = new ProductModel(data);
        return product.save();
    }

    // Get product by ID (populate or not, as needed)
    public async getProductById(productId: string): Promise<IProduct | null> {
        return ProductModel.findById(productId).exec();
    }

    // Get all products
    public async getAllProducts(): Promise<IProduct[]> {
        return ProductModel.find().exec();
    }

    // Update a product (basic fields)
    public async updateProduct(
        productId: string,
        data: Partial<IProduct>
    ): Promise<IProduct | null> {
        return ProductModel.findByIdAndUpdate(productId, data, { new: true }).exec();
    }

    // Delete a product
    public async deleteProduct(productId: string): Promise<IProduct | null> {
        return ProductModel.findByIdAndDelete(productId).exec();
    }

    /**
     * Add a variant to a product
     */
    public async addVariant(
        productId: string,
        variantData: IVariant
    ): Promise<IProduct | null> {
        const product = await ProductModel.findById(productId).exec();
        if (!product) {
            throw new Error('Product not found');
        }

        // Push the new variant
        product.variants.push(variantData);

        await product.save();
        return product;
    }

    /**
     * Update a variant by SKU
     */
    public async updateVariant(
        productId: string,
        sku: string,
        updateData: Partial<IVariant>
    ): Promise<IProduct | null> {
        const product = await ProductModel.findById(productId).exec();
        if (!product) {
            throw new Error('Product not found');
        }

        const variant = product.variants.find((v) => v.sku === sku);
        if (!variant) {
            throw new Error(`Variant with SKU ${sku} not found`);
        }

        // Update the fields
        if (updateData.color !== undefined) variant.color = updateData.color;
        if (updateData.size !== undefined) variant.size = updateData.size;
        if (updateData.price !== undefined) variant.price = updateData.price;
        if (updateData.stock !== undefined) variant.stock = updateData.stock;
        if (updateData.sku !== undefined) variant.sku = updateData.sku;

        await product.save();
        return product;
    }

    /**
     * Remove a variant by SKU
     */
    public async removeVariant(
        productId: string,
        sku: string
    ): Promise<IProduct | null> {
        const product = await ProductModel.findById(productId).exec();
        if (!product) {
            throw new Error('Product not found');
        }

        product.variants = product.variants.filter((v) => v.sku !== sku);
        await product.save();
        return product;
    }
}

export default new ProductService();
