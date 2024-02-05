import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';

import Header from '../components/Header';
import FloatingButton from '../components/FloatingButton';
// import ImageSlider from '../components/ImageSlider';
// import SearchBar from '../components/SearchBar';
// import { fetchExercisesByBodypart } from '../api/exerciseDB';

export default function Home() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const route = useRoute();
  // const [filteredExercises, setFilteredExercises] = useState([]);

  const { displayName } = route.params || { displayName: 'Guest' };

  const handleAvatarClick = () => {
    navigation.navigate('TabProfile', { screen: ' Profile' });
  };

  // const handleSearch = async (query) => {
  //   try {
  //     const exercises = await fetchExercisesByBodypart(query);
  //     // Check if exercises array is defined and not empty
  //     if (exercises && exercises.length > 0) {
  //       // Filter exercises based on the search query
  //       const filteredExercises = exercises.filter((exercise) =>
  //         exercise.name.toLowerCase().includes(query.toLowerCase())
  //       );
  //       console.log('Search results:', filteredExercises);
  //       // Update state to reflect the filtered exercises
  //       setFilteredExercises(filteredExercises);
  //     } else {
  //       // Handle case where no exercises were found
  //       console.log('No exercises found for the given body part');
  //       setFilteredExercises([]);
  //     }
  //   } catch (error) {
  //     console.error('Error searching exercises:', error);
  //     // Handle error condition
  //   }
  // };

  const handleRedirect = () => {
    navigation.navigate('TabCamera', { screen: 'MachineDetection' });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 60,
        backgroundColor: theme.mainBackgroundColor,
      }}>
      <StatusBar style="dark" />

      <Header displayName={displayName} onPressAvatar={handleAvatarClick} />

      {/* <SearchBar onSearch={handleSearch} /> */}

      <TouchableOpacity onPress={handleRedirect}>
        <Image
          source={require('../assets/images/camera/camera.gif')}
          style={styles.smallCardImage}
        />
      </TouchableOpacity>
      <Text style={[styles.clickText, { color: theme.textColor }]}>
        Click camera to begin detection
      </Text>

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
      <FloatingButton />
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
  smallCardImage: {
    width: wp(50),
    height: wp(50),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 2,
  },
  clickText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
  },
});
