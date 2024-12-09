import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Profile = ({ navigation }) => {
    const user = {
        name: 'Polikant Tual MRPHP',
        email: 'humas@polikant.ac.id',
        profileImage: 'https://via.placeholder.com/150', // Dummy image URL
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo_final_refined.png')} style={styles.profileImage} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => alert('Edit Profile')}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => alert('Settings')}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.replace('SplashScreen')}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#40E0D0', // Matching background color
    },
    header: {
        alignItems: 'center',
        marginVertical: 40,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#fff', // White border around the profile image
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Text color matching the splash screen
    },
    email: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '90%',
        padding: 20,
    },
    button: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2, // Shadow effect for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#4CAF50', // Button text color matching the theme
        fontWeight: 'bold',
    },
});

export default Profile;
