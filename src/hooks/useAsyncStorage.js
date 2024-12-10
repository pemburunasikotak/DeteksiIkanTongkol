import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key, initialValue = null) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  // Ambil data dari AsyncStorage saat komponen mount
  useEffect(() => {
    const loadValue = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setStoredValue(JSON.parse(value));
        }
      } catch (error) {
        console.error(`Error loading key "${key}":`, error);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key]);

  // Simpan data ke AsyncStorage
  const saveValue = async (value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error(`Error saving key "${key}":`, error);
    }
  };

  // Hapus data dari AsyncStorage
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error(`Error removing key "${key}":`, error);
    }
  };

  return [storedValue, saveValue, removeValue, loading];
};

export default useAsyncStorage;
