import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth } from 'firebase/auth';
import { FIREBASE_APP } from '../FirebaseConfig';
import { useTheme } from '../context/ThemeContext';
import CommonHeader from '../components/CommonHeader';
import DarkModeSwitch from '../components/DarkModeSwitch';
import { useAvatar } from '../context/AvatarContext';

export default function Profile() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const auth = getAuth(FIREBASE_APP);
  const { avatar, updateAvatar } = useAvatar();
  // const [avatar, setAvatar] = useState(require('../assets/icons/avatar.png'));

  useEffect(() => {
    fetchAvatar();
  }, []);

  const fetchAvatar = async () => {
    try {
      const uri = await getAvatarFromStorage();
      if (uri) {
        updateAvatar({ uri });
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  };

  const getAvatarFromStorage = async () => {
    try {
      const userId = auth.currentUser.uid;
      const avatarStorageKey = `avatarURI_${userId}`;
      const uri = await AsyncStorage.getItem(avatarStorageKey);
      return uri || null;
    } catch (error) {
      console.error('Error getting avatar URI:', error);
      return null;
    }
  };

  const saveAvatarToStorage = async (uri) => {
    try {
      const userId = auth.currentUser.uid;
      const avatarStorageKey = `avatarURI_${userId}`;
      await AsyncStorage.setItem(avatarStorageKey, uri);

      // Emit a navigation event to notify DrawerNavigation about the avatar change
      if (navigation && navigation.emit) {
        navigation.emit('avatarChanged', uri);
      }
    } catch (error) {
      console.error('Error saving avatar URI:', error);
    }
  };

  const pickAvatarFromGallery = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.canceled) {
      updateAvatar({ uri: pickerResult.uri });
      saveAvatarToStorage(pickerResult.uri);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('avatarChanged', (uri) => {
      updateAvatar({ uri });
    });

    return unsubscribe;
  }, [navigation]);

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
    navigation.navigate('AboutUsScreen');
  };

  const navigateToFAQ = () => {
    navigation.navigate('Faq');
  };

  const navigateToChatBot = () => {
    navigation.navigate('ChatBot');
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      style={[styles.container, { backgroundColor: theme.mainBackgroundColor }]}
      contentContainerStyle={{ flexGrow: 1 }}>
      <CommonHeader
        title="Profile"
        navigation={navigation}
        style={{ marginRight: 20 }}
      />

      <View style={styles.profileContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.avatarContainer}
          onPress={pickAvatarFromGallery}>
          <Image style={styles.profileImage} source={avatar} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickAvatarFromGallery}>
          <Text
            style={[styles.changeAvatarText, { color: theme.logOutButton }]}>
            Tap to change avatar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={navigateToChatBot}
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            AI ChatBot
          </Text>
          <FontAwesome5
            name="rocketchat"
            size={hp(4)}
            color={theme.textColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Switch Theme
          </Text>
          <DarkModeSwitch />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={navigateToFAQ}
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            FAQs
          </Text>
          <MaterialCommunityIcons
            name="comment-text-multiple"
            size={hp(4)}
            color={theme.textColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={navigateToHelp}
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            About us
          </Text>
          <Ionicons
            name="information-circle-outline"
            size={hp(5)}
            color={theme.textColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}
          onPress={navigateToSettings}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Settings
          </Text>
          <Ionicons
            name="settings-outline"
            size={hp(4)}
            color={theme.textColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.logoutButton, { backgroundColor: theme.logOutButton }]}
          onPress={handleLogout}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color={theme.buttonText}
            style={styles.icon}
          />
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    paddingHorizontal: wp(4),
  },
  profileContainer: {
    marginTop: hp(1),
    alignItems: 'center',
  },
  avatarContainer: {
    borderRadius: wp(10),
    overflow: 'hidden',
    marginBottom: hp(1),
  },
  profileImage: {
    height: hp(20),
    width: hp(20),
  },
  changeAvatarText: {
    fontSize: hp(1.5),
    color: '#F1BE48',
  },
  card: {
    width: '100%',
    alignItems: 'center',
    marginTop: hp(2),
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});
