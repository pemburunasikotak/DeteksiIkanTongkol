// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Mengganti layar SplashScreen dengan layar Login setelah 3 detik
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);

  return (
    <FastImage
      source={require('../assets/underwater.gif')}
      style={styles.container}
    >
      <Image source={require('../assets/logo_final_refined.png')} style={styles.logo} />
      <Text style={styles.text}>Polikant Tual MRPHP</Text>
    </FastImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100, // Membuat gambar berbentuk lingkaran
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20, // Memberikan jarak di atas teks
  },
});

export default SplashScreen;
