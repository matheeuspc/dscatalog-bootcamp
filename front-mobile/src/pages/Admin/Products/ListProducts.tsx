import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, ActivityIndicator, ActivityIndicatorComponent } from 'react-native';

import { SearchInput, ProductCard } from '../../../components';
import { getProducts, deleteProduct } from '../../../services'
import { admin, text, theme } from '../../../styles';

interface ProductProps {
    setScreen: Function;
    setProductId: Function;
}

const Products: React.FC<ProductProps> = (props) => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { setScreen, setProductId } = props;

    async function handleDelete(id: number) {
        setLoading(true);
        const res = await deleteProduct(id);
        fillProducts();
        setLoading(false);
    }

    function handleEdit(id: number) {
        setProductId(id);
        setScreen("editProduct");
    }

    async function fillProducts() {
        setLoading(true);
        const res = await getProducts();
        setProducts(res.data.content);
        setLoading(false);
    };

    useEffect(() => {
        fillProducts();
    }, []);

    const data =
        search.length > 0 ? products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()))
            : products;

    return (
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity
                style={admin.addButton}
                onPress={() => setScreen("newProduct")}
            >
                <Text style={text.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <SearchInput search={search} setSearch={setSearch} placeholder="Nomem do produto" />
            {
                loading ? (<ActivityIndicator size="large" />) :
                    (data.map(product => {
                        const { id } = product;

                        return (
                            <ProductCard
                                {...product}
                                key={id}
                                role="admin"
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />
                        )
                    }))
            }
        </ScrollView>
    );
};

export default Products;