import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppButton } from '../../components/common/AppButton';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

export const CartScreen: React.FC<any> = ({ navigation }) => {
    const { items, totalPrice, removeFromCart, updateQuantity } = useCart();

    if (items.length === 0) {
        return (
            <ScreenContainer contentContainerStyle={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your cart is empty.</Text>
                <AppButton
                    title="Start Shopping"
                    onPress={() => navigation.navigate('Home')}
                    style={{ marginTop: SPACING.md }}
                />
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer>
            <FlatList
                data={items}
                keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image
                            source={{ uri: item.product.images?.[0]?.src || 'https://via.placeholder.com/100' }}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
                            <Text style={styles.itemPrice}>{formatCurrency(item.product.price)}</Text>

                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.qtyButton}
                                    onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                >
                                    <Text style={styles.qtyText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.qtyValue}>{item.quantity}</Text>
                                <TouchableOpacity
                                    style={styles.qtyButton}
                                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Text style={styles.qtyText}>+</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => removeFromCart(item.id)}
                                >
                                    <Text style={styles.removeText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>{formatCurrency(totalPrice.toString())}</Text>
                </View>
                <AppButton
                    title="Proceed to Checkout"
                    onPress={() => navigation.navigate('Checkout')}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: FONTS.sizes.lg,
        color: COLORS.textSecondary,
    },
    cartItem: {
        flexDirection: 'row',
        padding: SPACING.sm,
        backgroundColor: COLORS.surface,
        borderRadius: 8,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 4,
        backgroundColor: COLORS.border,
    },
    itemDetails: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    itemName: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '500',
        color: COLORS.text,
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyButton: {
        width: 28,
        height: 28,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    qtyText: {
        fontSize: 16,
        color: COLORS.text,
    },
    qtyValue: {
        marginHorizontal: SPACING.md,
        fontSize: 16,
    },
    removeButton: {
        marginLeft: 'auto',
    },
    removeText: {
        color: COLORS.error,
        fontSize: 14,
    },
    footer: {
        paddingTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.md,
    },
    totalLabel: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '600',
    },
    totalValue: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '700',
        color: COLORS.primary,
    },
});
