import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons or any other icon library you prefer

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const images = [
    require('../assets/icons/onboarding1.png'),
    require('../assets/icons/onboarding2.png'),
    require('../assets/icons/onboarding3.png'),
  ];

  const onNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Welcome');
    }
  };

  const onSkip = () => {
    navigation.navigate('Welcome');
  };

  const onPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={images[currentIndex]} style={styles.image} resizeMode="contain" />
        {(currentIndex === 0 || currentIndex === 1) && (
          <TouchableOpacity style={[styles.button, styles.skipButton]} onPress={onSkip}>
            <Text style={[styles.buttonText, styles.skipButtonText]}>Skip</Text>
          </TouchableOpacity>
        )}
        {currentIndex > 0 && (
          <TouchableOpacity style={[styles.button, styles.previousButton]} onPress={onPrevious}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}
        {currentIndex < images.length - 1 && (
          <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={onNext}>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
        )}
        {currentIndex === images.length - 1 && (
          <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={onNext}>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      position: 'relative',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    image: {
      flex: 1,
      width: null,
      height: null,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
    },
    skipButtonText: {
      fontWeight: 'bold',
      color: '#F1BE48',
    },
    button: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    skipButton: {
      top: 40,
      right: 20,
      backgroundColor: 'transparent',
      borderColor: '#28282d',
      borderWidth: 1,
      borderRadius: 10,
    },
    previousButton: {
      bottom: 190,
      left: 140,
      backgroundColor: '#F1BE48',
      borderRadius: 10,
    },
    nextButton: {
      bottom: 190,
      right: 140,
      backgroundColor: '#F1BE48',
      borderRadius: 10,
    },
  });  

export default Onboarding;
