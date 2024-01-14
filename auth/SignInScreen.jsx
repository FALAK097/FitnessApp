import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_APP } from '../FirebaseConfig';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth(FIREBASE_APP);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
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

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: '#877dfa' }}>
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={navigation.goBack}
            className="bg-rose-500 mx-4 pr-1 rounded-full flex justify-center items-center absolute"
            style={{ width: hp(5.5), height: hp(5.5), marginTop: hp(2) }}>
            <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/login.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8">
        <KeyboardAvoidingView behavior="padding">
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry={true}
              placeholder="password"
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                onPress={signIn}>
                {/* onPress={() => navigation.navigate('Home')}> */}
                <Text className="text-xl font-bold text-center text-gray-600">
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require('../assets/images/google.png')}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require('../assets/images/apple.png')}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require('../assets/images/facebook.png')}
                className="w-10 h-10"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text className="font-semibold text-yellow-500"> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
