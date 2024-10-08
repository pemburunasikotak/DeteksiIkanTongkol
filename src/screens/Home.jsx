// src/screens/Dashboard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Dashboard = () => {
    const [history, setHistory] = useState([
        { id: 1, date: '2024-10-01', result: 'Ikan Segar' },
        { id: 2, date: '2024-10-02', result: 'Mengandung Formalin' },
        { id: 3, date: '2024-10-03', result: 'Ikan Segar' },
    ]); // Contoh data riwayat deteksi

    const report = () => {
        // Logika untuk menampilkan laporan (bisa diisi dengan fungsi atau navigasi)
        console.log('Menampilkan laporan...');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard Riwayat Deteksi</Text>
            <Text style={styles.subtitle}>Riwayat Deteksi Ikan Tongkol</Text>
            
            <ScrollView style={styles.historyContainer}>
                {history.length > 0 ? (
                    history.map((item) => (
                        <View key={item.id} style={styles.historyItem}>
                            <Text style={styles.historyText}>{`Tanggal: ${item.date}`}</Text>
                            <Text style={styles.historyText}>{`Hasil: ${item.result}`}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noHistoryText}>Tidak ada riwayat deteksi.</Text>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.reportButton} onPress={report}>
                <Text style={styles.buttonText}>Lihat Laporan</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#4CAF50', // Warna latar belakang
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    historyContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    historyItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    historyText: {
        fontSize: 16,
        color: '#333',
    },
    noHistoryText: {
        textAlign: 'center',
        color: '#888',
        marginVertical: 20,
    },
    reportButton: {
        backgroundColor: '#FFC107', // Warna tombol laporan
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000', // Warna teks tombol
        fontWeight: 'bold',
    },
});

export default Dashboard;
