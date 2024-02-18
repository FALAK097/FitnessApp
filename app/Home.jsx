import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import StepCounterPage from '../app/StepCounterPage';
import FloatingButton from '../components/FloatingButton';

export default function Home() {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const { displayName } = route.params || { displayName: 'Guest' };

  const [modalVisible, setModalVisible] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
        );

        if (!granted) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
            {
              title: 'Pedometer Permission',
              message: 'This app requires permission to count your steps.',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );

          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            setIsPermissionGranted(true);
          } else {
            // Handle the case where the user cancels the permission request
            console.log('Permission request cancelled');
          }
        } else {
          setIsPermissionGranted(true);
        }
      } catch (error) {
        console.error('Error checking or requesting permission:', error);
      }
    };

    checkPermission();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleStepCounterPress = () => {
    toggleModal();
  };

  const handleAvatarClick = () => {
    navigation.navigate('TabProfile', { screen: ' Profile' });
  };

  const handleCameraRedirect = () => {
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

      <View style={styles.upperContainer}>
        <View style={styles.rowContainer}>
          <View style={[styles.column, styles.buttonContainer]}>
            <TouchableOpacity>
              <Image
                source={require('../assets/images/camera/camera.gif')}
                style={styles.smallCardImage}
              />
            </TouchableOpacity>
            <Button
              title="Click camera"
              onPress={handleCameraRedirect}
              color="black" // Set color to black
            />
          </View>

          <View style={[styles.column, styles.buttonContainer]}>
            <TouchableOpacity>
              <Image
                source={require('../assets/gif/steps2.gif')}
                style={styles.smallCardImage}
              />
            </TouchableOpacity>
            <Button
              title="STEPS COUNTER"
              onPress={handleStepCounterPress}
              color="black" // Set color to black
            />
          </View>
        </View>
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
      <FloatingButton />

      {/* Modal Section */}
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
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  card: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    marginBottom: 100,
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
    marginTop: 0,
  },
  upperContainer: {
    backgroundColor: '#F1BE48',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: 10,
  },
  buttonContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
});
