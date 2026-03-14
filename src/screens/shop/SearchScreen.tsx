import React from 'react';
import { Text } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppInput } from '../../components/common/AppInput';

export const SearchScreen: React.FC = () => {
    return (
        <ScreenContainer>
            <AppInput placeholder="Search products..." autoFocus />
            <Text style={{ marginTop: 20, textAlign: 'center', color: '#666' }}>
                Start typing to find products
            </Text>
        </ScreenContainer>
    );
};
