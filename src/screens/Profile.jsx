// src/screens/Profile.js
import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Profile = () => {
    const handleEditProfile = () => {
        // Logic untuk mengedit profil
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profil Saya</Text>
            </View>
            <View style={styles.profileInfo}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }} // Ganti dengan URL gambar profil
                    style={styles.profileImage}
                />
                <Text style={styles.name}>Nama Pengguna</Text>
                <Text style={styles.email}>email@example.com</Text>
                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Text style={styles.editButtonText}>Edit Profil</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Pengaturan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Keluar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: 40,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
    },
    email: {
        fontSize: 16,
        color: '#888',
    },
    editButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    menu: {
        marginTop: 20,
    },
    menuItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        elevation: 1,
    },
    menuItemText: {
        fontSize: 18,
    },
});

export default Profile;
