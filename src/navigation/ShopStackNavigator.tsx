import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../types/navigation';
import { ProductListScreen } from '../screens/shop/ProductListScreen';
import { ProductDetailsScreen } from '../screens/shop/ProductDetailsScreen';
import { CategoryScreen } from '../screens/shop/CategoryScreen';
import { SearchScreen } from '../screens/shop/SearchScreen';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export const ShopStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{ title: 'Categories' }}
            />
            <Stack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{ title: 'Products' }}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{ title: 'Details' }}
            />
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ title: 'Search' }}
            />
        </Stack.Navigator>
    );
};
