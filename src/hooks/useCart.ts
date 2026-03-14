import { useCartStore } from '../store/cartStore';

export const useCart = () => {
    const { items, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCartStore();

    return {
        items,
        totalItems: items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: getCartTotal(),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
};
