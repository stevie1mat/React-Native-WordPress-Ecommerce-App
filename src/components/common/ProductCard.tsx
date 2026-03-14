import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { FONTS } from '../../constants/fonts';

interface ProductCardProps {
    product: Product;
    onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    const imageUrl = product.images?.[0]?.src || 'https://via.placeholder.com/150';

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(product)}
            activeOpacity={0.8}
        >
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
            <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '48%',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        marginBottom: SPACING.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: COLORS.border,
    },
    infoContainer: {
        padding: SPACING.sm,
    },
    title: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '500',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    price: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.primary,
    },
});
