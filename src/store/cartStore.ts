import { create } from 'zustand';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';

interface CartState {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addToCart: (product, quantity = 1) => {
        set((state) => {
            const existingItem = state.items.find(item => item.product.id === product.id);
            if (existingItem) {
                return {
                    items: state.items.map(item =>
                        item.product.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    ),
                };
            }
            return { items: [...state.items, { id: product.id.toString(), product, quantity }] };
        });
    },
    removeFromCart: (itemId) => set((state) => ({
        items: state.items.filter(item => item.id !== itemId)
    })),
    updateQuantity: (itemId, quantity) => set((state) => ({
        items: state.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
        )
    })),
    clearCart: () => set({ items: [] }),
    getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (parseFloat(item.product.price || '0') * item.quantity), 0);
    }
}));
