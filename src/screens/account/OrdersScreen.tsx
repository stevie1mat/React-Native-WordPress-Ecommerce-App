import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';

export const OrdersScreen: React.FC = () => {
    return (
        <ScreenContainer>
            <Text style={styles.text}>No orders found.</Text>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginTop: 40,
    }
});
