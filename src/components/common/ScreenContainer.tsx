import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, ViewProps, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

interface ScreenContainerProps extends ViewProps {
    children: React.ReactNode;
    scrollable?: boolean;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
    children,
    scrollable = false,
    style,
    contentContainerStyle,
    ...props
}) => {
    if (scrollable) {
        return (
            <SafeAreaView style={[styles.safeArea, style]}>
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
                    showsVerticalScrollIndicator={false}
                    {...props}
                >
                    {children}
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.safeArea, style]}>
            <View style={[styles.container, contentContainerStyle]} {...props}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING.md,
    },
    container: {
        flex: 1,
        padding: SPACING.md,
    },
});
