import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FIREBASE_APP } from '../FirebaseConfig';
import { useTheme } from '../components/ThemeContext';
import {
  signInWithEmailAndPassword,
  getAuth,
  // GoogleAuthProvider,
  // signInWithCredential,
} from 'firebase/auth';
// import * as Google from 'expo-auth-session/providers/google';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth(FIREBASE_APP);
  const { theme } = useTheme();

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  // });

  const validateEmail = (email) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    // Example: Password must be at least 6 characters
    return password.length >= 6;
  };

  const signIn = async () => {
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log(response);
      if (response.user) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
      alert('SignIn failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const forgotScreen = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleGoogleSignIn = async () => {
    promptAsync();
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: '#F1BE48' }}>
      <SafeAreaView className="flex ">
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
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/auth/login.png')}
            style={{ width: 390, height: 250 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: theme.mainBackgroundColor,
        }}
        className="flex-1 bg-white px-8 pt-8">
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}>
          <KeyboardAvoidingView behavior="position">
            <View className="form space-y-2">
              <Text
                style={{ color: theme.textColor }}
                className="text-gray-700 ml-4">
                Email Address
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 8,
                  padding: 16,
                  backgroundColor: '#FFFFFF',
                  color: 'black',
                  marginBottom: 12,
                }}
                placeholderTextColor="#A1A1AA"
                placeholder="john@gmail.com"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <Text
                style={{ color: theme.textColor }}
                className="text-gray-700 ml-4">
                Password
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 8,
                  padding: 16,
                  backgroundColor: '#FFFFFF',
                  color: 'black',
                  marginBottom: 12,
                }}
                placeholderTextColor="#A1A1AA"
                secureTextEntry={true}
                placeholder="john123"
                autoCapitalize="none"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                className="flex items-end"
                onPress={forgotScreen}>
                <Text
                  style={{ color: theme.textColor }}
                  className="text-gray-700 mb-5">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              {loading ? (
                <ActivityIndicator size="large" color="#877dfa" />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.6}
                  className="py-3 bg-yellow-400 rounded-xl"
                  onPress={signIn}>
                  <Text
                    style={{ color: theme.textColor }}
                    className="text-xl font-bold text-center text-gray-700">
                    Login
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity
              className="p-2 bg-gray-100 rounded-2xl"
              onPress={handleGoogleSignIn}>
              <Image
                source={require('../assets/icons/google.png')}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require('../assets/icons/apple.png')}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require('../assets/icons/facebook.png')}
                className="w-10 h-10"
              />
            </TouchableOpacity>
          </View> */}
            <View className="flex-row justify-center mt-7">
              <Text
                style={{ color: theme.textColor }}
                className="text-gray-500 font-semibold">
                Don't have an account?
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('SignUpScreen')}>
                <Text className="font-semibold text-yellow-500"> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
}
