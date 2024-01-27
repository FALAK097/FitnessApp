import React, { useEffect } from 'react';
import { Text, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import {
  onAuthStateChanged,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth';
import { FIREBASE_APP } from '../FirebaseConfig';
import { useTheme } from '../components/ThemeContext';

export default function VerifyEmailScreen() {
  const navigation = useNavigation();
  const auth = getAuth(FIREBASE_APP);
  const { theme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        navigation.navigate('SignInScreen');
      }
    });

    return () => unsubscribe();
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
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: theme.textColor,
            textAlign: 'center',
          }}>
          Please verify your email...
        </Text>
        <ActivityIndicator size="large" color="#877dfa" />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{ width: '100%', marginTop: 10 }}
        className="py-5 bg-green-300 rounded-xl"
        onPress={() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              alert('Verification email sent.');
            })
            .catch((error) => {
              alert(error.message);
            });
        }}>
        <Text
          style={{ color: theme.textColor, textAlign: 'center' }}
          className="text-xl font-bold text-gray-700">
          Resend Verification Email
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{ width: '100%', marginTop: 40, marginBottom: 50 }}
        className="py-5 bg-red-300 rounded-xl"
        onPress={() => {
          auth.signOut();
          navigation.navigate('SignInScreen');
        }}>
        <Text
          style={{ color: theme.textColor, textAlign: 'center' }}
          className="text-xl font-bold text-gray-700">
          Sign Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
