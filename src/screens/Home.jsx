// screens/Home.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper'; // Menggunakan button dari react-native-paper

const Home = () => {
    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: 'https://example.com/your-image-url.jpg' }} // Ganti dengan URL gambar yang sesuai
                style={styles.headerImage}
            />
            <Text style={styles.title}>Deteksi Ikan</Text>
            <Text style={styles.subtitle}>Mendeteksi ikan dengan akurat.</Text>
            <Text style={styles.welcomeText}>Selamat Datang di Aplikasi Deteksi Ikan</Text>
            <Text style={styles.description}>
                Aplikasi ini dirancang untuk membantu Anda mendeteksi berbagai jenis ikan dengan menggunakan teknologi kecerdasan buatan...
            </Text>

            <View style={styles.gridContainer}>
                <TouchableOpacity style={styles.card}>
                    <Image
                        source={{ uri: 'https://example.com/koi-image.jpg' }} // Ganti dengan URL gambar Ikan Koi
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardText}>Ikan Koi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <Image
                        source={{ uri: 'https://example.com/cupang-image.jpg' }} // Ganti dengan URL gambar Ikan Cupang
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardText}>Ikan Cupang</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <Image
                        source={{ uri: 'https://example.com/mas-image.jpg' }} // Ganti dengan URL gambar Ikan Mas
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardText}>Ikan Mas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <Image
                        source={{ uri: 'https://example.com/lele-image.jpg' }} // Ganti dengan URL gambar Ikan Lele
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardText}>Ikan Lele</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Button mode="contained" style={styles.button}>
                    Mulai Deteksi
                </Button>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
    },
    headerImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
    },
    welcomeText: {
        fontSize: 20,
        marginVertical: 10,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '48%', // Mengatur lebar kartu
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    cardImage: {
        width: '100%',
        height: 100,
    },
    cardText: {
        textAlign: 'center',
        paddingVertical: 5,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 20,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#007BFF',
    },
});

export default Home;
