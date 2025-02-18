// src/screens/Dashboard.js
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon

const Dashboard = () => {
    const { getItem, removeItem } = useAsyncStorage("extract_info")
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [storedValue, setStoredValue] = useState([])
    const [showConfirm, setShowConfirm] = useState(false)

    const confirmDelete = () => {
        setShowConfirm(true)
    }

    const handleRemoveItem = () => {
        removeItem(); // Fungsi ini akan menghapus item dengan key 'extract_info'
        setShowConfirm(false)
      };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    // Fungsi untuk membuka modal dengan item yang dipilih
    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const totalDetection = storedValue?.length;
    const freshFishCount = storedValue?.filter(item => item.prediction === 'non formalin').length;
    const formalinFishCount = totalDetection - freshFishCount;

    const readItemFromStorage = async () => {
        const item = await getItem();
        setStoredValue(item ? JSON.parse(item) : []);
    };

    useFocusEffect(
        useCallback(() => {
            readItemFromStorage();
        }, [])
    );


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
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
            }}>
                <Text style={styles.subtitle}>Riwayat Deteksi Terbaru</Text>
                <Button title="Delete" onPress={confirmDelete} />
            </View>

            {/* History Section */}
            <ScrollView style={styles.historyContainer}>
                {storedValue?.length > 0 ? (
                    storedValue?.sort((a, b) => b?.timestamp - a?.timestamp)?.map((item, key) => (
                        <React.Fragment key={key}>
                            <TouchableOpacity onPress={() => openModal(item)} style={styles.historyItem}>
                                <Icon
                                    name={item.prediction === 'non formalin' ? 'check-circle' : 'error'}
                                    size={24}
                                    color={item.prediction === 'non formalin' ? '#4CAF50' : '#F44336'}
                                    style={styles.historyIcon}
                                />
                                <View>
                                    <Text style={styles.historyText}>{`Tanggal: ${item.date}`}</Text>
                                    <Text style={styles.historyText}>{`Hasil: ${item.prediction}`}</Text>
                                </View>
                            </TouchableOpacity>
                            {/* {item.imageUri && (
                                <View>
                                    <Image
                                        source={{ uri: `data:image/jpeg;base64,${item.imageUri}` }}
                                        style={styles.image}
                                    />
                                </View>
                            )} */}
                        </React.Fragment>
                    ))
                ) : (
                    <Text style={styles.noHistoryText}>Tidak ada riwayat deteksi.</Text>
                )}
            </ScrollView>

            {/* Modal untuk menampilkan detail */}
            {selectedItem && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>{`Tanggal: ${selectedItem?.date}`}</Text>
                            <Text style={styles.modalText}>{`Hasil: ${selectedItem?.prediction}`}</Text>
                            {selectedItem.imageUri && (
                                <View>
                                    <Image
                                        source={{ uri: `data:image/jpeg;base64,${selectedItem.imageUri}` }}
                                        style={styles.imageModal}
                                    />
                                </View>
                            )}
                            <Button title="Close" onPress={closeModal} />
                        </View>
                    </View>
                </Modal>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showConfirm}
                onRequestClose={()=> setShowConfirm(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Yakin Menghapus ?</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            gap:20
                        }}>
                            <Button title="Close" onPress={()=> setShowConfirm(false)} />
                            <Button title="Delete" onPress={handleRemoveItem} />
                        </View>
                        
                    </View>
                </View>
            </Modal>
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
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    imageModal: {
        width: 200,
        height: 200,
        marginBottom: 10,
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default Dashboard;
