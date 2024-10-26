import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
// import { Camera } from 'react-native-camera-kit';
// import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
// import { fetch } from '@tensorflow/tfjs-react-native'; // Needed to load the model remotely

const App = () => {
  const [isTfReady, setTfReady] = useState(false);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const cameraRef = useRef(null);

  // Initialize TensorFlow and load the model
  useEffect(() => {
    const initializeTensorFlow = async () => {
      // Load the TensorFlow JS for React Native
      await tf.ready();
      setTfReady(true);
      console.log('TensorFlow.js is ready!');

      // Load the Teachable Machine model from a remote URL
      const modelJson = 'https://teachablemachine.withgoogle.com/models/UKLc8O-Fz/';
      const loadedModel = await tf.loadGraphModel(modelJson);
      setModel(loadedModel);
      console.log('Model loaded successfully!');
    };

    initializeTensorFlow();
  }, []);

  // Function to capture an image and run the prediction
  const handleCaptureImage = async () => {
    if (!cameraRef.current || !model) return;

    try {
      const imageData = await cameraRef.current.captureImage();
      const imageTensor = preprocessImage(imageData);
      const predictionResult = await model.predict(imageTensor).data();

      // Get the highest prediction result
      const predictedClassIndex = predictionResult.indexOf(Math.max(...predictionResult));
      setPrediction(predictedClassIndex);

      console.log('Prediction:', predictedClassIndex);
    } catch (error) {
      console.error('Error capturing image or running prediction:', error);
    }
  };

  // Preprocessing image to match the model input shape
  const preprocessImage = (imageData) => {
    const imageTensor = tf.browser.fromPixels(imageData).resizeBilinear([224, 224]).expandDims(0);
    return imageTensor;
  };

  if (!isTfReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading TensorFlow.js...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teachable Machine Image Recognition</Text>

      {/* <Camera
        ref={cameraRef}
        style={styles.camera}
        cameraType="back" // Use the back camera
        captureButtonVisible={false}
      /> */}

      <Button title="Capture Image" onPress={handleCaptureImage} />

      {prediction !== null && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionText}>Prediction: {prediction}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  predictionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  predictionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
