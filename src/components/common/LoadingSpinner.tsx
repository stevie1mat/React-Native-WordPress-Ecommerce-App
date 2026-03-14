import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface LoadingSpinnerProps {
    fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen }) => {
    if (fullScreen) {
        return (
            <View style={[styles.container, styles.fullScreen]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
});
