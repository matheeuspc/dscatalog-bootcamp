import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { theme, text } from '../../styles';
import { TabBar } from '../../components';

import Categories from './Categories';
import Users from './Users';
import Products from './Products';

const Dashboard: React.FC = () => {
    const [screen, setScreen] = useState("categories");

    return (
        <View>
            <TabBar  screen={screen} setScreen={setScreen}/>
            { screen === 'products' && <Products /> }
            { screen === 'categories' && <Categories /> }
            { screen === 'users' && <Users /> }
        </View>
    );
};

export default Dashboard;