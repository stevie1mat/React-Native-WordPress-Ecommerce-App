import { Product } from './product';

export interface CartItem {
    id: string; // unique local ID or cart item key
    product: Product;
    quantity: number;
    // Options like size, color
    variationId?: number;
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}
