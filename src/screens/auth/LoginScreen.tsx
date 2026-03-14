import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { useAuth } from '../../hooks/useAuth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import { SPACING } from '../../constants/spacing';
import { MaterialIcons } from '@expo/vector-icons';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { login, loading, error } = useAuth();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        await login(username, password);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="eco" size={40} color={COLORS.primary} />
                    </View>
                    <Text style={styles.brandTitle}>Clay & Co.</Text>
                    <Text style={styles.brandSubtitle}>The handmade ceramics marketplace</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Welcome Back</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <View style={styles.formContainer}>
                        <AppInput
                            label="Email Address"
                            placeholder="hello@clayandco.com"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <View style={styles.passwordHeader}>
                            <Text style={styles.label}>Password</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <AppInput
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <AppButton
                        title="Login"
                        onPress={handleLogin}
                        loading={loading}
                        style={styles.loginButton}
                    />


                </View>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.footerLink}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.decorationContainer}>
                    <View style={styles.decorationLine} />
                    <View style={styles.decorationDot} />
                    <View style={styles.decorationLine} />
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: SPACING.lg,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(236, 109, 19, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    brandTitle: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: 'bold',
        color: COLORS.slate900,
        marginBottom: 4,
    },
    brandSubtitle: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.slate500,
    },
    card: {
        backgroundColor: COLORS.surface,
        padding: SPACING.xl,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.slate200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '600',
        color: COLORS.slate900,
        marginBottom: SPACING.lg,
    },
    errorText: {
        color: COLORS.error,
        marginBottom: SPACING.md,
        fontSize: FONTS.sizes.sm,
    },
    formContainer: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '500',
        color: COLORS.slate700,
        marginBottom: SPACING.xs,
    },
    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    forgotPassword: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.primary,
    },
    loginButton: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },

    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.xl,
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
    decorationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.xl * 1.5,
        opacity: 0.4,
    },
    decorationLine: {
        width: 80,
        height: 1,
        backgroundColor: COLORS.slate400,
    },
    decorationDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.slate400,
        marginHorizontal: SPACING.lg,
    },
});
