import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { ProductCard } from '../../components/common/ProductCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useProducts } from '../../hooks/useProducts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../types/navigation';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../types/navigation';

type HomeNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Home'>,
    NativeStackNavigationProp<AppStackParamList>
>;

interface Props {
    navigation: HomeNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const { products, loading, fetchProducts, fetchCategories } = useProducts();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleProductPress = (product: any) => {
        // Navigation to product details
        // Since Shop stack is nested in Main tabs, it requires properly structured navigation types
        // Using a simpler approach for the base scaffold
        // @ts-ignore - for scaffold
        navigation.navigate('Shop', { screen: 'ProductDetails', params: { productId: product.id, title: product.name } });
    };

    if (loading && products.length === 0) {
        return <LoadingSpinner fullScreen />;
    }

    return (
        <ScreenContainer>
            <FlatList
                data={products}
                keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Text style={styles.headerTitle}>Featured Products</Text>}
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={handleProductPress} />
                )}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 8,
    },
    row: {
        justifyContent: 'space-between',
    }
});
