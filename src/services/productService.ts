import { wooClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import { Product } from '../types/product';

export const productService = {
    getProducts: async (): Promise<Product[]> => {
        try {
            const response = await wooClient.get(ENDPOINTS.products.list);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    getProductDetails: async (id: number): Promise<Product> => {
        try {
            const response = await wooClient.get(ENDPOINTS.products.details(id));
            return response.data;
        } catch (error) {
            console.error('Error fetching product details:', error);
            throw error;
        }
    }
};
