import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
    title, onPress, variant = 'primary', loading, disabled, style, textStyle
}) => {
    const getBackgroundColor = () => {
        if (disabled) return COLORS.border;
        if (variant === 'primary') return COLORS.primary;
        if (variant === 'secondary') return COLORS.surface;
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return COLORS.textSecondary;
        if (variant === 'primary') return '#ffffff'; // White text on orange bg
        if (variant === 'secondary') return COLORS.textInverse;
        return COLORS.primary;
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                variant === 'outline' && { borderWidth: 1, borderColor: COLORS.primary },
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        marginVertical: SPACING.sm,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
