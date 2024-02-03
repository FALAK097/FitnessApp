import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../context/ThemeContext';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { FIREBASE_APP } from '../FirebaseConfig';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const auth = getAuth(FIREBASE_APP);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Password Reset Email Sent',
        'Please check your email to reset your password.',
        [{ text: 'OK', onPress: () => navigation.navigate('SignInScreen') }]
      );
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      Alert.alert(
        'Error',
        'Failed to send password reset email. Please try again.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{ backgroundColor: theme.mainBackgroundColor, flex: 1 }}>
      <SafeAreaView className="flex" style={{ backgroundColor: '#F1BE48' }}>
        <View className="flex-row justify-start">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
            style={{
              width: hp(5.5),
              height: hp(5.5),
              marginTop: hp(2),
              marginLeft: 16,
            }}>
            <Ionicons name="arrow-back" size={hp(4)} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          className="flex-row justify-center"
          style={{ backgroundColor: '#F1BE48' }}>
          <Image
            source={require('../assets/images/auth/forget1.png')}
            style={{ width: 300, height: 250, marginTop: 10 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          position: 'relative',
          bottom: 30,
          top: 50,
        }}>
        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={{ color: theme.textColor, fontSize: 30, top: 20 }}>
              Forgot Password?
            </Text>
          </View>
          <View style={styles.forgotDes}>
            <Text style={{ color: theme.textColor, bottom: 35, top: 5 }}>
              Don't worry! It happens, please enter the address associated with
              your account
            </Text>
          </View>
          <View style={styles.formCon}>
            <View style={styles.textBoxCon}>
              <View style={styles.at}>
                <Ionicons name="at" size={24} color={theme.textColor} />
              </View>
              <View style={styles.textCon}>
                <TextInput
                  style={[styles.textInput, { color: theme.textColor }]}
                  placeholder={'Email ID'}
                  placeholderTextColor={'#aaa'}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            className="py-3 bg-yellow-400 rounded-xl mt-5 top-20"
            onPress={handleResetPassword}>
            <Text
              style={{ color: theme.textColor }}
              className="text-xl font-bold text-center text-gray-700">
              Submit
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 100,
            }}>
            <Text style={{ color: theme.textColor, marginRight: 5 }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text className="font-semibold text-yellow-500">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },

  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },

  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 50,
  },
  textCon: {
    width: '90%',
  },
  at: {
    alignSelf: 'center',
    width: 30,
  },

  textInput: {
    borderBottomColor: '#aaa',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontSize: 16,
    height: 40,
  },
});
