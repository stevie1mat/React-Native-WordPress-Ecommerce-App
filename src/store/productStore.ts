import { create } from 'zustand';
import { Product } from '../types/product';
import { ProductCategory } from '../types/category';

interface ProductState {
    products: Product[];
    categories: ProductCategory[];
    loading: boolean;
    setProducts: (products: Product[]) => void;
    setCategories: (categories: ProductCategory[]) => void;
    setLoading: (loading: boolean) => void;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    categories: [],
    loading: false,
    setProducts: (products) => set({ products }),
    setCategories: (categories) => set({ categories }),
    setLoading: (loading) => set({ loading }),
}));
