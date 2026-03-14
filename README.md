# WordPress WooCommerce Mobile App Architecture

A clean, structured, and modular base architecture for a React Native ecommerce app powered by a WooCommerce (WordPress) backend.

## 🚀 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stacks & Bottom Tabs)
- **State Management**: Zustand
- **Networking/API**: Axios
- **Form Handling**: React Hook Form with Zod (Ready to use)
- **Storage**: AsyncStorage

## 📁 Project Structure

```
src/
├── api/             # API configuration and Axios clients (wooClient, apiClient)
├── components/      # Reusable UI components (Buttons, Inputs, Cards)
├── constants/       # Global constants (Colors, Fonts, API Configs, Spacing)
├── hooks/           # Custom React hooks to consume Zustand stores and API services
├── navigation/      # React Navigation setup (Tabs, Auth, Main Stacks)
├── screens/         # Screen components organized by domain feature
│   ├── account/
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── home/
│   └── shop/
├── services/        # Abstraction layer over Axios API calls (ProductService, AuthService, etc.)
├── store/           # Zustand state management stores
├── types/           # TypeScript interfaces and type definitions
└── utils/           # Helper utilities (storage, currency formatter, etc.)
```

## 🛠️ Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure API & Credentials (.env)**:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `EXPO_PUBLIC_WORDPRESS_URL` to your WordPress site URL.
   - Enter your WooCommerce REST API keys (`EXPO_PUBLIC_WOO_KEY` and `EXPO_PUBLIC_WOO_SECRET`).

3. **Run the App**:
   ```bash
   npx expo start
   ```
   - Press `i` to run on iOS simulator.
   - Press `a` to run on Android emulator.

## 🔐 WordPress Backend Requirements

To enable fully functioning Login and Registration in the mobile app, your WordPress backend must be configured with the following:

1. **WooCommerce Plugin**: Required for managing products, categories, and customer registration.
2. **JWT Authentication Plugin**:
   - Plugin Name: **JWT Authentication for WP-API**
   - Version: 1.5.0
   - Author: **Enrique Chavez**
   - Description: Extends the WP REST API using JSON Web Tokens Authentication.
   
### WordPress JWT Configuration (`wp-config.php`)
To enable the JWT plugin, add the following to your `wp-config.php`:
```php
define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);
```

*Note: If testing on a Local environment (like Local by Flywheel) over HTTP, WooCommerce may require Basic Auth query parameters which are blocked by default for security. Ensure your local environment passes the HTTP Authorization headers.*

## 💡 Notes on Implementation

- **Mock Data**: Currently, the system has fallbacks to mock data if the API is unreachable, so you can view the UI without immediately connecting to a real WordPress instance.
- **State Management**: Zustand is used due to its simplicity and small footprint. It abstracts logic away from the components via hooks like `useCart` and `useAuth`.
- **Styling**: Styles reflect a clean, minimalistic aesthetic and rely heavily on the global variables present in `src/constants/`.

## ⏭️ Next Steps

- Integrate live cart logic with WooCommerce cart API.
- Flesh out checkout integration with a payment provider like Stripe via `CheckoutScreen`.
