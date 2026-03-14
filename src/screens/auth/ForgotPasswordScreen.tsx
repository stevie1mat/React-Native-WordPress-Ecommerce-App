import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppButton } from '../../components/common/AppButton';
import { AppInput } from '../../components/common/AppInput';

export const ForgotPasswordScreen: React.FC<any> = ({ navigation }) => {
    return (
        <ScreenContainer scrollable>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your email to receive a password reset link.</Text>
            <AppInput label="Email" placeholder="Email Address" keyboardType="email-address" />
            <AppButton title="Send Reset Link" onPress={() => console.log('Reset Password')} />
            <AppButton title="Back to Login" variant="secondary" onPress={() => navigation.goBack()} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    }
});
