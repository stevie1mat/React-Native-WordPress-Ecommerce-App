import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { MainTabNavigator } from './MainTabNavigator';
import { AuthNavigator } from './AuthNavigator';
import { CheckoutScreen } from '../screens/checkout/CheckoutScreen';
import { OrdersScreen } from '../screens/account/OrdersScreen';
import { OrderDetailsScreen } from '../screens/account/OrderDetailsScreen';
import { AddressBookScreen } from '../screens/account/AddressBookScreen';
import { useAuth } from '../hooks/useAuth';
import { storage } from '../utils/storage';
import { useAuthStore } from '../store/authStore';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
    const { isAuthenticated, user } = useAuth();
    const { login, setLoading } = useAuthStore();

    useEffect(() => {
        // Check local storage for existing session
        const checkAuthStatus = async () => {
            setLoading(true);
            try {
                const token = await storage.get('userToken');
                const userInfo = await storage.get('userInfo');
                if (token && userInfo) {
                    login(userInfo, token);
                }
            } catch (error) {
                console.error('Failed to restore session', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen
                            name="Main"
                            component={MainTabNavigator}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Checkout"
                            component={CheckoutScreen}
                            options={{ title: 'Checkout' }}
                        />
                        <Stack.Screen
                            name="Orders"
                            component={OrdersScreen}
                            options={{ title: 'My Orders' }}
                        />
                        <Stack.Screen
                            name="OrderDetails"
                            component={OrderDetailsScreen}
                            options={{ title: 'Order Details' }}
                        />
                        <Stack.Screen
                            name="AddressBook"
                            component={AddressBookScreen}
                            options={{ title: 'Address Book' }}
                        />
                    </>
                ) : (
                    <Stack.Screen
                        name="Auth"
                        component={AuthNavigator}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
