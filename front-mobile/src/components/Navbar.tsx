import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { nav, text } from '../styles';
import menu from '../assets/menu.png';
import { doLogout, isAuthenticated } from '../services/auth';

const Navbar: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [show, setShow] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        logged();
    }, [])

    function navigate(path: string) {
        if (path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }

    async function logged() {
        const result = await isAuthenticated();
        result ? setAuthenticated(true) : setAuthenticated(false);
    }

    function logout() {
        doLogout();
        navigation.navigate('Login');
    }

    return (
        <>
            {
                authenticated ? (
                    <TouchableOpacity
                    style={nav.logoutBtn}
                        onPress={() => logout()}
                    >
                        <Text style={text.logoutText}>Sair</Text>
                    </TouchableOpacity>
                ) : (
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
                                        onPress={() => navigate('Login')}
                                    >
                                        <Text
                                            style={[nav.textOption, route.name === 'Login' ? nav.textActive : null]}
                                        >
                                            ADM
                        </Text>
                                    </TouchableNativeFeedback>
                                </View>
                            ) : null
                        }
                    </TouchableOpacity>
                )
            }
        </>

    );
};

export default Navbar;