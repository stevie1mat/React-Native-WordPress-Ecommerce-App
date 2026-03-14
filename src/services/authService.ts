import { apiClient, wooClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import { User, AuthResponse } from '../types/auth';

export const authService = {
    login: async (username: string, password: string): Promise<{ user: User, token: string }> => {
        try {
            // Requires "JWT Authentication for WP REST API" plugin installed on WordPress
            const response = await apiClient.post<AuthResponse>(ENDPOINTS.auth.login, {
                username,
                password
            });

            const { token, user_email, user_display_name } = response.data as any;

            const user: User = {
                id: 0, // Id usually needs a generic /users/me call if needed
                email: user_email,
                name: user_display_name,
                username: username,
            };

            return { user, token };
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Invalid username or password');
        }
    },

    register: async (email: string, password: string, username?: string): Promise<void> => {
        try {
            // Uses WooCommerce REST API to create a customer
            await wooClient.post('/customers', {
                email,
                password,
                username: username || email.split('@')[0]
            });
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error('Registration failed. Email might already exist.');
        }
    }
};
