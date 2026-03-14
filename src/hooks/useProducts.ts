import { useProductStore } from '../store/productStore';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';

export const useProducts = () => {
    const { products, categories, loading, setProducts, setCategories, setLoading } = useProductStore();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getProducts();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                throw new Error('API returned invalid format (not an array)');
            }
        } catch (error) {
            console.error('Failed to fetch products', error);
            // Fallback to mock data if API is not setup
            setProducts([
                {
                    id: 1, name: 'Sample T-Shirt', price: '19.99',
                    images: [{ id: 1, src: 'https://via.placeholder.com/150', name: 'tshirt', alt: 'T-Shirt' }]
                } as any
            ]);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
            setCategories([
                { id: 1, name: 'Clothing', slug: 'clothing' } as any,
                { id: 2, name: 'Accessories', slug: 'accessories' } as any
            ]);
        }
    };

    return {
        products,
        categories,
        loading,
        fetchProducts,
        fetchCategories
    };
};
