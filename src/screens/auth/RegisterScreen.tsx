import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppButton } from '../../components/common/AppButton';
import { AppInput } from '../../components/common/AppInput';
import { authService } from '../../services/authService';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import { SPACING } from '../../constants/spacing';
import { MaterialIcons } from '@expo/vector-icons';

export const RegisterScreen: React.FC<any> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        try {
            setLoading(true);
            await authService.register(email, password, name);
            Alert.alert(
                'Success',
                'Account created successfully! Please log in.',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        } catch (error: any) {
            Alert.alert('Registration Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenContainer scrollable contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={24} color={COLORS.slate900} />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join Clay & Co. today</Text>
            </View>

            <View style={styles.formContainer}>
                <AppInput
                    label="Username or Full Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
                <AppInput
                    label="Email Address"
                    placeholder="hello@clayandco.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <AppInput
                    label="Password"
                    placeholder="Create a password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <AppButton
                title="Sign Up"
                onPress={handleRegister}
                loading={loading}
                style={styles.registerBtn}
            />

            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.footerLink}>Log in</Text>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: SPACING.xl,
        paddingHorizontal: SPACING.lg,
    },
    backButton: {
        marginBottom: SPACING.xl,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: SPACING.xl,
    },
    title: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: 'bold',
        color: COLORS.slate900,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: FONTS.sizes.md,
        color: COLORS.slate500,
    },
    formContainer: {
        marginBottom: SPACING.xl,
    },
    registerBtn: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: SPACING.xl,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.md,
    },
    footerText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.slate600,
    },
    footerLink: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        color: COLORS.primary,
    },
});
