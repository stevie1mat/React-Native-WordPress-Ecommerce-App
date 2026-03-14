import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';

export const OrderDetailsScreen: React.FC<any> = ({ route }) => {
    const { orderId } = route.params;

    return (
        <ScreenContainer>
            <Text style={styles.text}>Details for Order #{orderId}</Text>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 16,
    }
});
