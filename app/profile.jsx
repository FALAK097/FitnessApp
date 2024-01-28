import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DarkModeSwitch from '../components/DarkModeSwitch';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/ThemeContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FIREBASE_APP } from '../FirebaseConfig';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const auth = getAuth(FIREBASE_APP);
  const [avatar, setAvatar] = useState(require('../assets/images/avatar.png')); // Default avatar

  useEffect(() => {
    const fetchAvatar = async () => {
      const uri = await getAvatarFromStorage();
      if (uri) {
        setAvatar({ uri });
      }
    };

    fetchAvatar();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            auth
              .signOut()
              .then(() => {
                // Add logic to clear user cache here if needed
                // Example: AsyncStorage.clear();
                // Redirect to login screen
                navigation.navigate('SignInScreen');
              })
              .catch((error) => {
                console.error('Sign out error:', error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const navigateToHelp = () => {
    navigation.navigate('HelpScreen');
  };

  const saveAvatarToStorage = async (uri) => {
    try {
      await AsyncStorage.setItem('avatarURI', uri);
    } catch (error) {
      console.error('Error saving avatar URI:', error);
    }
  };

  const getAvatarFromStorage = async () => {
    try {
      const uri = await AsyncStorage.getItem('avatarURI');
      return uri !== null ? uri : null;
    } catch (error) {
      console.error('Error getting avatar URI:', error);
      return null;
    }
  };

  const pickAvatarFromGallery = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
      setAvatar({ uri: pickerResult.uri });
      saveAvatarToStorage(pickerResult.uri);
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.mainBackgroundColor },
      ]}
      contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.goBack()}
        style={{ width: hp(5.5), height: hp(5.5), marginTop: hp(2), marginLeft: 16 }}>
        <Ionicons name="arrow-back" size={hp(4)} color={theme === 'dark' ? '#fff' : '#000'} />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <TouchableOpacity activeOpacity={0.6} style={styles.avatarContainer} onPress={pickAvatarFromGallery}>
          <Image style={styles.profileImage} source={avatar} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.changeAvatarText}>Tap to change avatar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            View Profile 👤
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Switch Theme 🌓
          </Text>
          <DarkModeSwitch />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={navigateToHelp}
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Help ❓
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.logoutButton}
          onPress={handleLogout}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(10),
    paddingHorizontal: wp(4),
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: hp(3),
  },
  avatarContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: hp(2),
  },
  profileImage: {
    height: hp(20),
    width: hp(20),
  },
  changeAvatarText: {
    fontSize: hp(1.5),
    color: '#777',
  },
  card: {
    width: '100%',
    alignItems: 'center',
    marginTop: hp(3),
  },
  button: {
    borderRadius: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp(0.4),
    },
    shadowOpacity: 0.3,
    shadowRadius: hp(0.6),
    elevation: 5,
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#F1BE48',
    marginTop: 'auto',
    marginBottom: hp(2),
    borderRadius: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp(0.4),
    },
    shadowOpacity: 0.3,
    shadowRadius: hp(0.6),
    elevation: 5,
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    width: '100%',
    alignItems: 'center',
  },
});
