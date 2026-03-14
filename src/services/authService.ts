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
                firstName: user_display_name?.split(' ')[0] || '',
                lastName: user_display_name?.split(' ').slice(1).join(' ') || '',
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
            // Uses the secure custom REST API endpoint from wc-mobile-app.php
            const response = await apiClient.post('/wp-json/myapp/v1/register', {
                email,
                password,
                username: username || email.split('@')[0],
                name: ''
            });

            if (!response.data || !response.data.success) {
                throw new Error('Registration failed on server');
            }
        } catch (error: any) {
            console.error('Registration error:', error?.response?.data || error.message);
            const message = error?.response?.data?.message || 'Registration failed. Email might already exist.';
            throw new Error(message);
        }
    }
};
