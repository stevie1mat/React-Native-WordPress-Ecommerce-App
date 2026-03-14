import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

export const CheckoutScreen: React.FC<any> = ({ navigation }) => {
    const { totalPrice, clearCart } = useCart();

    const handlePlaceOrder = () => {
        // Implement standard WooCommerce Checkout API call here
        console.log('Order Placed');
        clearCart();
        // Navigate home or to success screen
        navigation.popToTop();
    };

    return (
        <ScreenContainer scrollable>
            <Text style={styles.title}>Secure Checkout</Text>

            <Text style={styles.sectionTitle}>Shipping Details</Text>
            <AppInput placeholder="Full Name" />
            <AppInput placeholder="Address Line 1" />
            <AppInput placeholder="City" />
            <AppInput placeholder="Postal Code" />

            <Text style={styles.sectionTitle}>Payment Details</Text>
            {/* Real app would use Stripe or native payments */}
            <AppInput placeholder="Card Number" />
            <AppInput placeholder="MM/YY" />
            <AppInput placeholder="CVC" />

            <Text style={styles.totalRow}>
                Total: {formatCurrency(totalPrice.toString())}
            </Text>

            <AppButton title="Place Order" onPress={handlePlaceOrder} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    totalRow: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 24,
        textAlign: 'center',
    }
});
