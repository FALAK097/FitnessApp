import { ThemeProvider } from './components/ThemeContext';
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
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}

// Signout code:
// import { getAuth, signOut } from 'firebase/auth';
// const auth = getAuth(FIREBASE_APP);

// <Button title="Sign Out" onPress={async () => await signOut(auth)} />
