import { create } from 'zustand';
import { User } from '../types/auth';

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    loading: false,
    login: (user, token) => set({ user, token }),
    logout: () => set({ user: null, token: null }),
    setLoading: (loading) => set({ loading }),
}));
