import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { theme, text } from '../../styles';
import { TabBar } from '../../components';

import Categories from './Categories';
import Users from './Users';
import Products from './Products/ListProducts';
import FormProduct from './Products/FormProduct';
import EditProduct from './Products/EditProduct';

const Dashboard: React.FC = () => {
    const [screen, setScreen] = useState("products");
    const [productId, setProductId] = useState(0);

    return (
        <View>
            <TabBar  screen={screen} setScreen={setScreen}/>
            { screen === 'products' && <Products setScreen={setScreen} setProductId={setProductId} /> }
            { screen === 'newProduct' && <FormProduct setScreen={setScreen} /> }
            { screen === 'editProduct' && <EditProduct setScreen={setScreen} productId={productId} /> }
            { screen === 'categories' && <Categories /> }
            { screen === 'users' && <Users /> }
        </View>
    );
};

export default Dashboard;