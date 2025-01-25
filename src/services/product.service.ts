import ProductModel, { IProduct } from '../models/product.model';

class ProductService {
    /**
     * Create a new product
     */
    public async createProduct(data: Partial<IProduct>): Promise<IProduct> {
        const newProduct = new ProductModel(data);
        return newProduct.save();
    }

    /**
     * Fetch a product by its ID
     */
    public async getProductById(productId: string): Promise<IProduct | null> {
        return ProductModel.findById(productId).exec();
    }

    /**
     * Fetch all products
     */
    public async getAllProducts(): Promise<IProduct[]> {
        return ProductModel.find().exec();
    }

    /**
     * Update a product by ID
     */
    public async updateProduct(
        productId: string,
        data: Partial<IProduct>
    ): Promise<IProduct | null> {
        return ProductModel.findByIdAndUpdate(productId, data, { new: true }).exec();
    }

    /**
     * Delete a product by ID
     */
    public async deleteProduct(productId: string): Promise<IProduct | null> {
        return ProductModel.findByIdAndDelete(productId).exec();
    }
}

export default new ProductService();
