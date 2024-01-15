import React, { useState } from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MachineDetection() {
  const [image, setImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setClassificationResult(null); // Clear previous classification result
    }
  };

  const detectMachine = async () => {
    if (image) {
      // Send the image to the Flask API for detection
      uploadImage(image);
    } else {
      setClassificationResult('No image selected.');
    }
  };

  const uploadImage = async (imageUri) => {
    try {
      let formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg', // adjust the type based on the actual image type
        name: 'image.jpg',
      });

      let response = await fetch('http://192.168.0.102:5000/classify', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        let result = await response.json();
        setClassificationResult(result.class_name);
      } else {
        console.log('Image upload failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.buttonContainer}>
        <Button title="Detect Machine" onPress={detectMachine} />
      </View>
      {classificationResult !== null && (
        <Text style={styles.result}>{classificationResult}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});
