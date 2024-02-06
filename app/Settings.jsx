import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { getAuth } from 'firebase/auth';
import { FIREBASE_APP } from '../FirebaseConfig';
import { useTheme } from '../context/ThemeContext';
import CommonHeader from '../components/CommonHeader';

export default Settings = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const auth = getAuth(FIREBASE_APP);

  const handleForgotPassword = () => {
    Alert.alert(
      'Reset',
      'Are you sure you want to reset password?',
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
                navigation.navigate('ForgotPassword');
                Alert.alert('Success', 'Enter your email to reset password');
              })
              .catch((error) => {
                console.error('Failed to reset error:', error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteAccount();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAccount = () => {
    auth.currentUser
      .delete()
      .then(() => {
        navigation.navigate('SignInScreen');
        Alert.alert('Success', 'Account deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
      });
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
        title="Settings"
        navigation={navigation}
        style={{ marginRight: 20 }}
      />

      <View style={styles.centeredContent}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleForgotPassword}
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Reset Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}
          onPress={handleDeleteAccount}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Delete Account?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: theme.textColor }]}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(4),
    paddingHorizontal: wp(4),
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonText: {
    fontSize: 16,
    marginLeft: hp(12),
    fontWeight: 'bold',
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: hp(4),
  },
  versionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
