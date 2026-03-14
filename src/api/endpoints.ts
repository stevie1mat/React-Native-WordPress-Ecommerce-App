import { CONFIG } from '../constants/config';

export const ENDPOINTS = {
    auth: {
        login: '/wp-json/jwt-auth/v1/token',
        register: '/wp-json/wp/v2/users/register',
    },
    products: {
        list: '/wp-json/wc/v3/products',
        details: (id: number) => `/wp-json/wc/v3/products/${id}`,
    },
    categories: {
        list: '/wp-json/wc/v3/products/categories',
    },
    orders: {
        list: '/wp-json/wc/v3/orders',
        create: '/wp-json/wc/v3/orders',
        details: (id: number) => `/wp-json/wc/v3/orders/${id}`,
    },
};
