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

\`\`\`
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
\`\`\`

## 🛠️ Setup Instructions

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure API**:
   - Open \`src/constants/config.ts\`.
   - Update \`WORDPRESS_BASE_URL\` to your WordPress site URL.
   - Enter your WooCommerce REST API keys (\`WOOCOMMERCE_CONSUMER_KEY\` and \`WOOCOMMERCE_CONSUMER_SECRET\`).

3. **Run the App**:
   \`\`\`bash
   npx expo start
   \`\`\`
   - Press \`i\` to run on iOS simulator.
   - Press \`a\` to run on Android emulator.

## 💡 Notes on Implementation

- **Mock Data**: Currently, the system uses fallback mock data so you can view the UI without immediately connecting to a real WordPress instance. Once connected, update the services to push/pull actual data.
- **State Management**: Zustand is used due to its simplicity and small footprint. It abstracts logic away from the components via hooks like \`useCart\` and \`useAuth\`.
- **Styling**: Styles reflect a clean, minimalistic aesthetic and rely heavily on the global variables present in \`src/constants/\`.

## ⏭️ Next Steps

- Integrate JWT Authentication endpoints for WordPress login/signup.
- Connect WooCommerce live REST API endpoints in \`productService\` and \`categoryService\`.
- Flesh out checkout integration with a payment provider like Stripe via \`CheckoutScreen\`.
