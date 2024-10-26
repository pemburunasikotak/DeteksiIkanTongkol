// src/screens/DeteksiCitra.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';

const DeteksiCitra = () => {
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false); // State untuk loader

    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            cameraType: 'back',
            quality: 1,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.error('Camera Error: ', response.error);
            } else if (response.assets) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const extractInfo = async () => {
        console.log('Extracting information from:', imageUri);

        if (imageUri) {
            setLoading(true);
            // Mengonversi imageUri menjadi Base64
            const base64String = await RNFS.readFile(imageUri, 'base64');
            const response = await fetch('https://formalin-fish-tensorflowjs-production.up.railway.app/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: base64String }),
            });
            console.log("🚀 ~ extractInfo ~ response:", response)
            console.log('🚀 ~ extractInfo ~ response:', JSON.stringify({ image: base64String }));
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <View style={styles.placeholder}>
                    <Icon name="camera-outline" size={100} color="#ccc" />
                    <Text style={styles.placeholderText}>No Image Captured</Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <View>
                    {loading && (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#ffffff" />
                            <Text style={styles.loaderText}>Processing...</Text>
                        </View>
                    )}
                </View>
                <View style={styles.contenButton}>
                    <TouchableOpacity style={styles.button} onPress={openCamera}>
                        <Text style={styles.buttonText}>Open Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={extractInfo}>
                        <Text style={styles.buttonText}>Extract Info</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#4CAF50',
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    placeholder: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    placeholderText: {
        marginTop: 10,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    contenButton:{
        flexDirection:'row',
        gap:10,
    },
    button: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default DeteksiCitra;
