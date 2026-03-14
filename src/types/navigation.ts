import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

export type ShopStackParamList = {
    ProductList: { categoryId?: number } | undefined;
    ProductDetails: { productId: number, title?: string };
    Category: undefined;
    Search: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Shop: NavigatorScreenParams<ShopStackParamList>;
    Cart: undefined;
    Account: undefined;
};

export type AppStackParamList = {
    Main: NavigatorScreenParams<MainTabParamList>;
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Checkout: undefined;
    Orders: undefined;
    OrderDetails: { orderId: number };
    AddressBook: undefined;
};
