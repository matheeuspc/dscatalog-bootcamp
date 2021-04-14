import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { tabbar } from '../styles';
import menu from '../assets/menu.png';
import { doLogout, isAuthenticated } from '../services/auth';

interface TabBarProps {
    screen: string;
    setScreen: Function;
}
const TabBar: React.FC<TabBarProps> = (props) => {
    const {screen, setScreen} = props;

    function changeScreen(page: string) {
        setScreen(page);
    }

    return (
        <View style={tabbar.container}>
            <TouchableOpacity 
                onPress={() => changeScreen('products')}
                style={[tabbar.pill, screen === 'products' && tabbar.pillActive]} 
                activeOpacity={0.7}
            >
                <Text style={[tabbar.pillText, screen === 'products' && tabbar.pillTextActive]}> Produtos </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => changeScreen('categories')} 
                style={[tabbar.pill, screen === 'categories' && tabbar.pillActive]} 
                activeOpacity={0.7}
            >
                <Text style={[tabbar.pillText, screen === 'categories' && tabbar.pillTextActive]}> Categorias </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => changeScreen('users')} 
                style={[tabbar.pill, screen === 'users' && tabbar.pillActive]} 
                activeOpacity={0.7}
            >
                <Text style={[tabbar.pillText, screen === 'users' && tabbar.pillTextActive]}> Usuários </Text>
            </TouchableOpacity>
        </View>
    );
}

export default TabBar;