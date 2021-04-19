import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Modal, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';

import { updateProduct, getProduct, getCategories, uploadImage } from '../../../services'
import { text, theme } from '../../../styles';

import * as ImagePicker from 'expo-image-picker';

import Toast from 'react-native-tiny-toast';
import { TextInputMask } from 'react-native-masked-text';

import arrow from '../../../assets/leftArrow.png';

interface EditProductProps {
    setScreen: Function;
    productId: number;
}

const EditProduct: React.FC<EditProductProps> = (props) => {
    const { setScreen, productId } = props;

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        imgUrl: " ",
        price: "",
        categories: [],
    });

    const [image, setImage] = useState("");

    useEffect(() => {
        async () => {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status != 'granted') {
                Alert.alert("Precisamos de acesso a biblioteca de imagens!");
            }
        };
    }, []);

    async function selectImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        !result.cancelled && setImage(result.uri);

    }

    async function handleUpload() {
        uploadImage(image).then(res => {
            const { uri } = res?.data;
            setProduct({ ...product, imgUrl: uri });
        });
    };

    useEffect(() => {
        image ? handleUpload() : null;
    }, [image]);

    async function handleSave() {
        setLoading(true);
        const data = {
            ...product,
        };
        try {
            await updateProduct(data);
            setScreen("products");
            Toast.showSuccess("Produto atualizado com sucesso!");
        } catch (res) {
            Toast.show("Erro ao salvar...");
        }
        setLoading(false);
    };

    function getRaw(e) {
        const str = e;
        const res = str.slice(2).replace(/\./g, "").replace(/,/g, ".");
        return res;
    }

    async function loadCategories() {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.data.content);
        setLoading(false);
    };

    async function loadProduct() {
        setLoading(true);
        const res = await getProduct(productId);
        setProduct(res.data);
        setLoading(false);
    }


    useEffect(() => {
        loadCategories();
        loadProduct();
    }, []);

    return (
        <View style={theme.formContainer}>
            {
                loading ? <ActivityIndicator size="large" /> : (
                    <View style={theme.formCard}>
                        <ScrollView>
                            <Modal
                                visible={showCategories}
                                animationType="fade"
                                transparent={true}
                                presentationStyle="overFullScreen"
                            >
                                <View style={theme.modalContainer}>
                                    <ScrollView contentContainerStyle={theme.modalContent}>
                                        {
                                            categories.map(
                                                cat => {
                                                    const { id, name } = cat;
                                                    return (
                                                        <TouchableOpacity
                                                            style={theme.modalItem}
                                                            key={id}
                                                            onPress={() => {
                                                                setProduct({ ...product, categories: [{ id, name }] });
                                                                setShowCategories(!showCategories);
                                                            }}
                                                        >
                                                            <Text>{name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            )
                                        }
                                    </ScrollView>
                                </View>
                            </Modal>
                            <TouchableOpacity
                                style={theme.goBackContainer}
                                onPress={() => setScreen("products")}
                            >
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Nome do produto"
                                style={theme.formInput}
                                value={product.name}
                                onChangeText={(e) => setProduct({ ...product, name: e })}
                            />
                            <TouchableOpacity
                                onPress={() => setShowCategories(!showCategories)}
                                style={theme.selectInput}
                            >
                                <Text>
                                    {
                                    product.categories.length > 0 && product.categories[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <TextInputMask
                                type={"money"}
                                placeholder="Preço"
                                style={theme.formInput}
                                value={product.price}
                                onChangeText={(e) => setProduct({ ...product, price: getRaw(e) })}
                            />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={theme.uploadBtn}
                                onPress={selectImage}
                            >
                                <Text style={text.uploadText}>Carregar imagem</Text>
                            </TouchableOpacity>
                            <Text style={text.fileSize}>As imagens devem ser JPG ou PNGe não devem ultrapassar 5 mb.</Text>
                            
                            <TouchableOpacity
                                onPress={selectImage}
                                activeOpacity={0.9}
                                style={{ width: "100%", height: 150, borderRadius: 10, marginVertical: 10 }}
                            >
                            <Image source={image == "" ? {uri: product.imgUrl} : { uri: image }} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                            </TouchableOpacity>
                                
                            
                            <TextInput
                                multiline placeholder="Descrição"
                                style={theme.textArea}
                                value={product.description}
                                onChangeText={(e) => setProduct({ ...product, description: e })}
                            />
                            <View style={theme.buttonContainer}>
                                <TouchableOpacity
                                    style={theme.deleteBtn}
                                    onPress={() =>
                                        Alert.alert(
                                            "Deseja cancelar?",
                                            "Os dados inseridos não serão salvos",
                                            [{
                                                text: "Voltar",
                                                style: "cancel"
                                            },
                                            {
                                                text: "Confirmar",
                                                onPress: () => setScreen("products"),
                                                style: "default"
                                            }
                                            ]
                                        )
                                    }
                                >
                                    <Text style={text.deleteBtnText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={theme.saveBtn}
                                    onPress={() => handleSave()}
                                >
                                    <Text style={text.saveBtnText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                )}
        </View>
    );
};

export default EditProduct;