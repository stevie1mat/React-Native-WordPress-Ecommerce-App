import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppButton } from '../../components/common/AppButton';
import { AppInput } from '../../components/common/AppInput';

export const RegisterScreen: React.FC<any> = ({ navigation }) => {
    return (
        <ScreenContainer scrollable>
            <Text style={styles.title}>Create Account</Text>
            <AppInput label="Name" placeholder="Full Name" />
            <AppInput label="Email" placeholder="Email Address" keyboardType="email-address" />
            <AppInput label="Password" placeholder="Password" secureTextEntry />
            <AppButton title="Sign Up" onPress={() => console.log('Register')} />
            <AppButton title="Back to Login" variant="secondary" onPress={() => navigation.goBack()} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    }
});
