// src/screens/DeteksiCitra.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const DeteksiCitra = () => {
    const [imageUri, setImageUri] = useState(null);

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
                // Set the image URI to display it
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const extractInfo = () => {
        // Your logic for extracting information from the image
        console.log('Extracting information from:', imageUri);
        // Implement your extraction logic here
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
                <TouchableOpacity style={styles.button} onPress={openCamera}>
                    <Text style={styles.buttonText}>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={extractInfo}>
                    <Text style={styles.buttonText}>Extract Info</Text>
                </TouchableOpacity>
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
        backgroundColor: '#4CAF50', // Matching splash and login screen color
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        resizeMode: 'cover',
        borderRadius: 10, // Rounded corners for a modern look
        borderWidth: 2,
        borderColor: '#fff', // White border around the image
    },
    placeholder: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#f9f9f9', // Light background for placeholder
    },
    placeholderText: {
        marginTop: 10,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        elevation: 3, // Shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: '40%', // Set a fixed width for buttons
        alignItems: 'center',
    },
    buttonText: {
        color: '#4CAF50', // Button text color
        fontWeight: 'bold',
    },
});

export default DeteksiCitra;
