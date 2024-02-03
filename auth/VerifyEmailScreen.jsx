import React, { useEffect, useState } from 'react';
import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import {
  onAuthStateChanged,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth';
import { FIREBASE_APP } from '../FirebaseConfig';
import { useTheme } from '../context/ThemeContext';

export default function VerifyEmailScreen() {
  const navigation = useNavigation();
  const auth = getAuth(FIREBASE_APP);
  const { theme } = useTheme();
  const [showLoginButton, setShowLoginButton] = useState(false);

  const handleSendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        Alert.alert(
          'Verification Email Sent',
          'Please check your email for verification.'
        );
        setShowLoginButton(true);
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginButton(true);
    }, 30000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          navigation.navigate('SignInScreen');
        } else {
          Alert.alert(
            'Email Not Verified',
            'Please verify your email to continue.'
          );
        }
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          color: theme.textColor,
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: 40,
        }}>
        Check Your Email
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{ width: '100%', marginTop: 10 }}
        className="py-5 bg-green-300 rounded-xl"
        onPress={handleSendVerificationEmail}>
        <Text
          style={{ color: theme.textColor, textAlign: 'center' }}
          className="text-xl font-bold text-gray-700">
          Send Verification Email
        </Text>
      </TouchableOpacity>
      {showLoginButton && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ width: '100%', marginTop: 40, marginBottom: 50 }}
          className="py-5 bg-red-300 rounded-xl"
          onPress={() => {
            navigation.navigate('SignInScreen');
          }}>
          <Text
            style={{ color: theme.textColor, textAlign: 'center' }}
            className="text-xl font-bold text-gray-700">
            Log In Now!
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
