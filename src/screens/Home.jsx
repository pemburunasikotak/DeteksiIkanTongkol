// src/screens/Dashboard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon

const Dashboard = () => {
    const [history, setHistory] = useState([
        { id: 1, date: '2024-10-01', result: 'Ikan Segar' },
        { id: 2, date: '2024-10-02', result: 'Mengandung Formalin' },
        { id: 3, date: '2024-10-03', result: 'Ikan Segar' },
    ]);

    const report = () => {
        console.log('Menampilkan laporan...');
    };

    const totalDetection = history.length;
    const freshFishCount = history.filter(item => item.result === 'Ikan Segar').length;
    const formalinFishCount = totalDetection - freshFishCount;

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Dashboard Riwayat Deteksi</Text> */}

            {/* Summary Section */}
            <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryNumber}>{totalDetection}</Text>
                    <Text style={styles.summaryLabel}>Total Deteksi</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryNumber}>{freshFishCount}</Text>
                    <Text style={styles.summaryLabel}>Ikan Segar</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryNumber}>{formalinFishCount}</Text>
                    <Text style={styles.summaryLabel}>Mengandung Formalin</Text>
                </View>
            </View>

            <Text style={styles.subtitle}>Riwayat Deteksi Terbaru</Text>

            {/* History Section */}
            <ScrollView style={styles.historyContainer}>
                {history.length > 0 ? (
                    history.map((item) => (
                        <View key={item.id} style={styles.historyItem}>
                            <Icon name={item.result === 'Ikan Segar' ? 'check-circle' : 'error'}
                                  size={24}
                                  color={item.result === 'Ikan Segar' ? '#4CAF50' : '#F44336'}
                                  style={styles.historyIcon} />
                            <View>
                                <Text style={styles.historyText}>{`Tanggal: ${item.date}`}</Text>
                                <Text style={styles.historyText}>{`Hasil: ${item.result}`}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noHistoryText}>Tidak ada riwayat deteksi.</Text>
                )}
            </ScrollView>

            {/* Report Button */}
            <TouchableOpacity style={styles.reportButton} onPress={report}>
                <Icon name="bar-chart" size={24} color="#000" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Lihat Laporan</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    summaryCard: {
        backgroundColor: '#fff',
        flex: 1,
        marginHorizontal: 5,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    summaryNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    summaryLabel: {
        fontSize: 16,
        color: '#777',
    },
    historyContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    historyText: {
        fontSize: 16,
        color: '#333',
    },
    historyIcon: {
        marginRight: 10,
    },
    noHistoryText: {
        textAlign: 'center',
        color: '#888',
        marginVertical: 20,
    },
    reportButton: {
        flexDirection: 'row',
        backgroundColor: '#FFC107',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 10,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Dashboard;
