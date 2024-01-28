import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth';
import { FIREBASE_APP } from '../FirebaseConfig';
import { useTheme } from '../components/ThemeContext';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth(FIREBASE_APP);
  const { theme } = useTheme();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateName = (name) => {
    return name.length >= 3;
  };

  const signUp = async () => {
    if (name.trim() === '' || !validateName(name)) {
      alert('Please enter a valid name (minimum 3 letters).');
      return;
    }

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      Alert.alert(
        'Success',
        'Account created successfully. Please check your email for verification.'
      );
      // navigation.navigate('SignInScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
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
            source={require('../assets/images/auth/signup.png')}
            style={{ width: 390, height: 200, marginTop: 15 }}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView behavior="position">
            <View className="form space-y-2">
              <Text
                style={{ color: theme.textColor }}
                className="text-gray-700 ml-4">
                Full Name
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
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => setName(text)}
                autoCapitalize="none"
              />
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
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
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
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                secureTextEntry={true}
                placeholder="john123"
                autoCapitalize="none"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              {loading ? (
                <ActivityIndicator size="large" color="#877dfa" />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.6}
                  className="py-3 bg-yellow-400 rounded-xl mt-3"
                  onPress={signUp}>
                  {/* onPress={() => navigation.navigate('Home')}> */}
                  <Text
                    style={{ color: theme.textColor }}
                    className="text-xl font-bold text-center text-gray-600">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
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
                Already have an account?
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('SignInScreen')}>
                <Text className="font-semibold text-yellow-500"> Log In</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
}
