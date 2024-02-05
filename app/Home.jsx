import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';
import * as Permissions from 'expo-permissions';
import { Pedometer } from 'expo-sensors';

import Header from '../components/Header';
import StepCounterPage from '../app/StepCounterPage';
import FloatingButton from '../components/FloatingButton';

export default function Home() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const route = useRoute();
  // const [filteredExercises, setFilteredExercises] = useState([]);
  const { displayName } = route.params || { displayName: 'Guest' };

  const handleAvatarClick = () => {
    navigation.navigate('TabProfile', { screen: ' Profile' });
  };

  const handleCameraRedirect = () => {
    navigation.navigate('TabCamera', { screen: 'MachineDetection' });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const getStepCount = async () => {
      const { status } = await Permissions.askAsync(Permissions.PEDOMETER);
      if (status === 'granted') {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        const result = await Pedometer.getStepCountAsync(start, end);
        setStepCount(result.steps);
        // Watch for step count changes
        const subscription = Pedometer.watchStepCount((result) => {
          setStepCount(result.steps);
        });
        return () => subscription.remove(); // Cleanup subscription
      } else {
        console.log('Permission to access the step counter was denied');
        // Handle permission denied
      }
    };

    getStepCount();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleStepCounterPress = () => {
    toggleModal();
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

      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/camera/camera.gif')}
              style={styles.smallCardImage}
            />
          </TouchableOpacity>
          <Button
            title="Click camera"
            onPress={handleCameraRedirect}
            color={theme.logOutButton}
          />
        </View>

        <View style={styles.column}>
          <TouchableOpacity>
            <Image
              source={require('../assets/gif/steps.gif')}
              style={styles.smallCardImage}
            />
          </TouchableOpacity>
          <Button
            title="STEPS COUNTER"
            onPress={handleStepCounterPress}
            color={theme.logOutButton}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <StepCounterPage />
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>

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
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 0,
  },
  stepCountContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  stepCountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightButtonContainer: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 0, // Add margin-top to move the button down
  },
});
