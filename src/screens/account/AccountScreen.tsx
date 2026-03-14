import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppButton } from '../../components/common/AppButton';
import { useAuth } from '../../hooks/useAuth';

export const AccountScreen: React.FC<any> = ({ navigation }) => {
    const { user, logout } = useAuth();

    return (
        <ScreenContainer scrollable>
            <View style={styles.header}>
                <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
                <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
            </View>

            <View style={styles.menu}>
                <AppButton
                    title="My Orders"
                    variant="secondary"
                    onPress={() => navigation.navigate('Orders')}
                />
                <AppButton
                    title="Address Book"
                    variant="secondary"
                    onPress={() => navigation.navigate('AddressBook')}
                />
                <AppButton
                    title="Logout"
                    variant="outline"
                    onPress={logout}
                    style={styles.logoutBtn}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 24,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    menu: {
        flex: 1,
    },
    logoutBtn: {
        marginTop: 32,
        borderColor: '#ff3b30',
    }
});
