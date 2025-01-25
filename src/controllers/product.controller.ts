import { Request, Response } from 'express';
import productService from '../services/product.service';
import { errorResponse, successResponse } from '../utils/response.util';

class ProductController {
    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await productService.createProduct(req.body);
            successResponse(res, product, 'Product created successfully', 201);
        } catch (error: any) {
            errorResponse(res, error.message, 400, error);
        }
    }

    public async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);
            if (!product) {
                errorResponse(res, 'Product not found', 404);
                return
            }
            successResponse(res, product, 'Product fetched successfully');
        } catch (error: any) {
            errorResponse(res, error.message, 500, error);
        }
    }

    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await productService.getAllProducts();
            successResponse(res, products, 'Products fetched successfully');
        } catch (error: any) {
            errorResponse(res, error.message, 500, error);
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedProduct = await productService.updateProduct(id, req.body);
            if (!updatedProduct) {
                errorResponse(res, 'Product not found', 404);
                return
            }
            successResponse(res, updatedProduct, 'Product updated successfully');
        } catch (error: any) {
            errorResponse(res, error.message, 400, error);
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedProduct = await productService.deleteProduct(id);
            if (!deletedProduct) {
                errorResponse(res, 'Product not found', 404);
                return
            }
            successResponse(res, deletedProduct, 'Product deleted successfully');
        } catch (error: any) {
            errorResponse(res, error.message, 500, error);
        }
    }
}

export default new ProductController();
