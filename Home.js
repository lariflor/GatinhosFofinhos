import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Image } from 'react-native';

const Home = () => {
    const [catImage, setCatImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCatImage();
    }, []);

    const fetchCatImage = async () => {
        setLoading(true); // Ativa o estado de carregamento
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const result = await response.json();
            setCatImage(result[0].url); // Define a URL da imagem do gato
        } catch (error) {
            console.error("Erro ao buscar imagem:", error);
        } finally {
            setLoading(false); // Desativa o estado de carregamento
        }
    };

    if (loading) {
        return <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gatinho Fofinho</Text>
            {catImage && (
                <Image source={{ uri: catImage }} style={styles.image} />
            )}
            <Button title="Carregar Novo Gatinho" onPress={fetchCatImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 20,
    },
});

export default Home;
