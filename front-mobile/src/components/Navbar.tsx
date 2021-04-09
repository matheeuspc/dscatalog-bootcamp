import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { nav } from '../styles';
import menu from '../assets/menu.png';

const Navbar: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [show, setShow] = useState(false);

    function navigate(path: string) {
        if (path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }

    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={nav.drawer}
            onPress={() => setShow(!show)}
        >
            <Image source={menu} />
            {
                show ? (
                    <View style={nav.options}>
                        <TouchableNativeFeedback
                            style={nav.option}
                            onPress={() => navigate("Home")}
                        >
                            <Text
                                style={[
                                    nav.textOption, 
                                    route.name === 'Home' ? nav.textActive : null
                                ]}
                            >
                                Home
                            </Text>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            style={nav.option}
                            onPress={() => navigate('Catalog')}
                        >
                            <Text
                                style={[nav.textOption, route.name === 'Catalog' ? nav.textActive : null]}
                            >
                                Catálogo
                            </Text>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            style={nav.option}
                            onPress={() => navigate('ADM')}
                        >
                            <Text
                                style={[nav.textOption, route.name === 'ADM' ? nav.textActive : null]}
                            >
                                ADM
                        </Text>
                        </TouchableNativeFeedback>
                    </View>
                ) : null
            }
        </TouchableOpacity>
    );
};

export default Navbar;