import { wooClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import { ProductCategory } from '../types/category';

export const categoryService = {
    getCategories: async (): Promise<ProductCategory[]> => {
        try {
            const response = await wooClient.get(ENDPOINTS.categories.list);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
};
