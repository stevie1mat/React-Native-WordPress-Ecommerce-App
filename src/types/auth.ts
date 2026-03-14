export interface User {
    id: number;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl?: string;
}

export interface AuthResponse {
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
}
