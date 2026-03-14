export interface Product {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    manage_stock: boolean;
    stock_quantity: number | null;
    stock_status: 'instock' | 'outofstock' | 'onbackorder';
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    average_rating: string;
    rating_count: number;
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    images: Array<{
        id: number;
        src: string;
        name: string;
        alt: string;
    }>;
}
