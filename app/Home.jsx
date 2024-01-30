import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider';

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();

  const { username } = route.params || { username: "Let's Workout" };

  const handleAvatarClick = () => {
    navigation.navigate('Profile');
  };

  const detectMachine = () => {
    navigation.navigate('MachineDetection');
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
      <StatusBar style="dark" />

      <Header
        username={username}
        onPressAvatar={handleAvatarClick}
        onPressCamera={detectMachine}
      />

      <View>
        <ImageSlider />
      </View>

      <ScrollView>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BodyParts')}>
            <Image
              source={require('../assets/images/gym/home1.jpg')}
              style={styles.cardImage}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>Exercise</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DietScreen')}>
            <Image
              source={require('../assets/images/gym/home2.jpg')}
              style={styles.cardImage}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>Diet</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  card: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 20,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardTextContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFF',
    marginTop: 50,
  },
});
