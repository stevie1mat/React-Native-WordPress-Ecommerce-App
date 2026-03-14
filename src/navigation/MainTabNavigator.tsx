import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CartScreen } from '../screens/cart/CartScreen';
import { AccountScreen } from '../screens/account/AccountScreen';
import { ShopStackNavigator } from './ShopStackNavigator';
import { useCart } from '../hooks/useCart';
import { COLORS } from '../constants/colors';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
    const { totalItems } = useCart();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.slate500,
                tabBarStyle: {
                    backgroundColor: COLORS.background,
                    borderTopColor: COLORS.slate200,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof MaterialIcons.glyphMap = 'home';
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Shop') iconName = 'search';
                    else if (route.name === 'Cart') iconName = 'shopping-bag';
                    else if (route.name === 'Account') iconName = 'person';
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Tab.Screen
                name="Shop"
                component={ShopStackNavigator}
                options={{ title: 'Search' }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    title: 'Cart',
                    tabBarBadge: totalItems > 0 ? totalItems : undefined
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{ title: 'Profile' }}
            />
        </Tab.Navigator>
    );
};
