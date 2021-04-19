import React from 'react';
import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { text, theme } from '../styles';

interface ProductProps {
    id: Number;
    name: String;
    imgUrl: string;
    price: string;
    role?: string;
    handleDelete: Function;
    handleEdit: Function;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, imgUrl, price, role, handleDelete, handleEdit}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={theme.productCard}
            onPress={() => role ? " " : navigation.navigate("ProductDetails", { id })}
        >
            <Image source={{ uri : imgUrl }} style={theme.productImage} />
            <View style={theme.productDescription}>
                <Text style={text.productName}>{name}</Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <TextInputMask 
                        type={"money"}
                        options={{
                            precision: 2,
                            separator: ",",
                            delimiter: ".",
                            unit: "",
                            suffixUnit: "",
                        }}
                        value={price}
                        editable={false}
                        style={text.productPrice}
                    />
                </View>
                {
                    role === 'admin' && (
                        <View style={theme.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => handleDelete(id)}
                                style={theme.deleteBtn}
                            >
                                <Text style={text.deleteBtnText}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleEdit(id)}
                                style={theme.editBtn}
                            >
                                <Text style={text.editBtnText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;