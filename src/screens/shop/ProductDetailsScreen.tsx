import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppButton } from '../../components/common/AppButton';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useCart } from '../../hooks/useCart';
import { productService } from '../../services/productService';
import { formatCurrency } from '../../utils/formatCurrency';
import { Product } from '../../types/product';

export const ProductDetailsScreen: React.FC<any> = ({ route, navigation }) => {
    const { productId, title } = route.params;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { width } = useWindowDimensions();

    useEffect(() => {
        navigation.setOptions({ title: title || 'Product Details' });
        loadProduct();
    }, [productId]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            // In a real app we'd fetch this from the API or store
            // const data = await productService.getProductDetails(productId);
            // setProduct(data);

            // Mock data for placeholder
            setProduct({
                id: productId,
                name: title || 'Sample Product',
                price: '29.99',
                description: '<p>This is a great product that you will absolutely love. Made with premium materials.</p>',
                images: [{ src: 'https://via.placeholder.com/400' }]
            } as any);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, 1);
            // Optional: show a toast or alert
        }
    };

    if (loading || !product) {
        return <LoadingSpinner fullScreen />;
    }

    const imageUrl = product.images?.[0]?.src || 'https://via.placeholder.com/400';

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
            <View style={styles.content}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>{formatCurrency(product.price)}</Text>

                <AppButton
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    style={styles.addButton}
                />

                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        {product.description?.replace(/<[^>]*>?/gm, '') || 'No description available.'}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginBottom: 24,
    },
    addButton: {
        marginBottom: 24,
    },
    descriptionContainer: {
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 16,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    }
});
