import { useEffect, useState } from 'react';
import { AppNavigation } from './navigation/appNavigation';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth';
import { FIREBASE_APP } from './FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInScreen from './auth/SignInScreen';
import { ActivityIndicator, View } from 'react-native';

const auth = getAuth(FIREBASE_APP);

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  const checkLocalUser = async () => {
    try {
      setLoading(true);
      const userJson = await AsyncStorage.getItem('@user');
      const userData = userJson ? JSON.parse(userJson) : null;
      console.log('local storage: ', userData);
      setUserInfo(userData);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type == 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    checkLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        // encrypt the token for security
        await AsyncStorage.setItem('@user', JSON.stringify(user));
      } else {
        console.log('User is not authenticated');
      }
    });

    return () => unsub();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#877dfa" size="large" />
        {/* <ActivityIndicator size="large" color="#0000ff" /> */}
      </View>
    );
  return userInfo ? (
    <AppNavigation />
  ) : (
    <SignInScreen promptAsync={promptAsync} />
    // <SignInScreen promptAsync={promptAsync} navigation={AppNavigation} />
  );
}

// Signout code:
// import { getAuth, signOut } from 'firebase/auth';
// const auth = getAuth(FIREBASE_APP);

// <Button title="Sign Out" onPress={async () => await signOut(auth)} />
