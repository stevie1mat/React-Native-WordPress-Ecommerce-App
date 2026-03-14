import axios from 'axios';
import { CONFIG } from '../constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base client for WordPress generic API
export const apiClient = axios.create({
  baseURL: CONFIG.WORDPRESS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Specific client for WooCommerce REST API
// It uses OAuth 1.0a or Basic Auth over HTTPS using Consumer Key/Secret
export const wooClient = axios.create({
  baseURL: CONFIG.WORDPRESS_BASE_URL,
  params: {
    consumer_key: CONFIG.WOOCOMMERCE_CONSUMER_KEY,
    consumer_secret: CONFIG.WOOCOMMERCE_CONSUMER_SECRET,
  },
});

// You can add response interceptors to handle global errors (e.g. 401 Unauthorized)
