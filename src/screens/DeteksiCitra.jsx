// src/screens/DeteksiCitra.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const DeteksiCitra = () => {
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasil, setHasil] = useState(null);
    const [timer, setTimer] = useState(0); // Timer state for countdown
    const { getItem, setItem } = useAsyncStorage("extract_info")
    const [storedValue, setStoredValue] = useState([])
    
    const readItemFromStorage = async () => {
      const item = await getItem();
      setStoredValue(item ? JSON.parse(item) : []);
    };

    const writeItemToStorage = async (newValue) => {
      await setItem(JSON.stringify(newValue));
      setStoredValue(newValue);
    };

    useFocusEffect(
      useCallback(() => {
        readItemFromStorage()
      }, [])
    );

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval); // Clear interval when component unmounts
        }
    }, [timer]);

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

    const openGallery = () => {
      const options = {
          mediaType: 'photo',
          quality: 1,
      };

      launchImageLibrary(options, (response) => {
          if (response.didCancel) {
              console.log('User cancelled gallery selection');
          } else if (response.error) {
              console.error('Gallery Error: ', response.error);
          } else if (response.assets) {
              setImageUri(response.assets[0].uri);
          }
      });
    };

    const extractInfo = async () => {
        console.log('Extracting information from:', imageUri);

        if (imageUri) {
            setLoading(true);
            try {
                const resizedImage = await ImageResizer.createResizedImage(
                    imageUri,
                    800,
                    600,
                    'JPEG',
                    80
                );
                const base64String = await RNFS.readFile(resizedImage.uri, 'base64');
                const response = await fetch('https://7gq9rf-4000.csb.app/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image: base64String }),
                });
                const result = await response.json();
                setHasil(result);
                writeItemToStorage([...storedValue, {
                  ...result,
                    imageUri: base64String,
                    date: new Date().toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    }),
                    timestamp: Date.now(),
                }])
                setTimer(60); // Start 1-minute countdown
            } catch (error) {
                setHasil({ error: error.message });
            } finally {
                setLoading(false);
            }
        }
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

            <View style={hasil && styles.resultContainer}>
                {hasil && (
                    hasil.error ? (
                        <Text style={styles.errorText}>Error: {hasil.error}</Text>
                    ) : (
                        <>
                            <Text style={styles.text20}>Prediction: {hasil.prediction}</Text>
                            <Text>Formalin: {hasil.detail_prediction?.formalin ?? 'N/A'}</Text>
                            <Text>Non-Formalin: {hasil.detail_prediction?.non_formalin ?? 'N/A'}</Text>
                        </>
                    )
                )}
            </View>

            <View style={styles.buttonContainer}>
                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#ffffff" />
                        <Text style={styles.loaderText}>Processing...</Text>
                    </View>
                ) : timer > 0 ?
                    <View style={styles.loaderContainer}>
                        <Text style={styles.countdownText}>Wait for {timer} seconds</Text>
                    </View>
                    : (
                        <View style={styles.contenButton}>
                            <TouchableOpacity style={styles.button} onPress={openCamera} disabled={timer > 0}>
                                <Text style={[styles.buttonText, timer > 0 && styles.disabledText]}>Open Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={openGallery} disabled={timer > 0}>
                                <Text style={[styles.buttonText, timer > 0 && styles.disabledText]}>Open Gallery</Text>
                            </TouchableOpacity>
                            {imageUri && (
                              <TouchableOpacity style={styles.button} onPress={extractInfo} disabled={timer > 0}>
                                  <Text style={[styles.buttonText, timer > 0 && styles.disabledText]}>Extract Info</Text>
                              </TouchableOpacity>
                            )}
                        </View>
                    )}
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
    text20: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 200,
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
    resultContainer: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: 'center',
        width: '100%',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    contenButton: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        padding: 8
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
    disabledText: {
        color: '#aaa', // Change text color when disabled
    },
    loaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loaderText: {
        color: '#ffffff',
        marginLeft: 10,
    },
    countdownText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
});

export default DeteksiCitra;
