import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import { storage } from '../utils/storage';

export const useAuth = () => {
    const { user, token, loading, login: storeLogin, logout: storeLogout, setLoading } = useAuthStore();
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (username: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            const { user, token } = await authService.login(username, password);
            await storage.set('userToken', token);
            await storage.set('userInfo', user);
            storeLogin(user, token);
            return true;
        } catch (err: any) {
            setError(err.message || 'Failed to login');
            return false;
        } finally {
            setLoading(false);
        }
    }, [setLoading, storeLogin]);

    const logout = useCallback(async () => {
        await storage.remove('userToken');
        await storage.remove('userInfo');
        storeLogout();
    }, [storeLogout]);

    return {
        user,
        token,
        isAuthenticated: !!token,
        loading,
        error,
        login,
        logout
    };
};
