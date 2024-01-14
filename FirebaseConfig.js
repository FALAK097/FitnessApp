import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAZKnaTK3lxgWEY6Jfc44xOj3BjNC2Hlh4',
  authDomain: 'fitnessapp-9b860.firebaseapp.com',
  projectId: 'fitnessapp-9b860',
  storageBucket: 'fitnessapp-9b860.appspot.com',
  messagingSenderId: '1003419012793',
  appId: '1:1003419012793:web:793e4762806725df709568',
  measurementId: 'G-L6L6TMWBTK',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(app);
