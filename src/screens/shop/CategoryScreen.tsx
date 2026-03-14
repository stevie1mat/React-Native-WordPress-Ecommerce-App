import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { useProducts } from '../../hooks/useProducts';

export const CategoryScreen: React.FC<any> = ({ navigation }) => {
    const { categories } = useProducts();

    return (
        <ScreenContainer>
            <FlatList
                data={categories}
                keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.categoryItem}
                        onPress={() => navigation.navigate('ProductList', { categoryId: item.id })}
                    >
                        <Text style={styles.categoryName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '500',
    }
});
