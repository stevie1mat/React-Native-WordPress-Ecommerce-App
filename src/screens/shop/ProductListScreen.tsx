import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { ProductCard } from '../../components/common/ProductCard';
import { useProducts } from '../../hooks/useProducts';

export const ProductListScreen: React.FC<any> = ({ navigation, route }) => {
    const { products } = useProducts();

    return (
        <ScreenContainer>
            <FlatList
                data={products}
                keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={() => navigation.navigate('ProductDetails', { productId: item.id, title: item.name })}
                    />
                )}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
    }
});
