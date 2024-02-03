import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '../components/ThemeContext';

import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider';
import SearchBar from '../components/SearchBar';
import { fetchExercisesByBodypart } from '../api/exerciseDB';

export default function Home() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const route = useRoute();
  const [filteredExercises, setFilteredExercises] = useState([]);

  const { name } = route.params || { name: 'Guest' };

  const handleAvatarClick = () => {
    navigation.navigate('Profile');
  };

  const detectMachine = () => {
    navigation.navigate('MachineDetection');
  };

  const handleSearch = async (query) => {
    try {
      const exercises = await fetchExercisesByBodypart(query);
      // Check if exercises array is defined and not empty
      if (exercises && exercises.length > 0) {
        // Filter exercises based on the search query
        const filteredExercises = exercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(query.toLowerCase())
        );
        console.log('Search results:', filteredExercises);
        // Update state to reflect the filtered exercises
        setFilteredExercises(filteredExercises);
      } else {
        // Handle case where no exercises were found
        console.log('No exercises found for the given body part');
        setFilteredExercises([]);
      }
    } catch (error) {
      console.error('Error searching exercises:', error);
      // Handle error condition
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 60,
        backgroundColor: theme.mainBackgroundColor,
      }}>
      <StatusBar style="dark" />

      <Header
        name={name}
        onPressAvatar={handleAvatarClick}
        onPressCamera={detectMachine}
      />

      <SearchBar onSearch={handleSearch} />

      <View>
        <ImageSlider />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('TabExercises', { screen: 'BodyParts' })
            }>
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
            onPress={() =>
              navigation.navigate('TabDiet', { screen: 'DietScreen' })
            }>
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
