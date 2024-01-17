import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack, AuthStack } from './stackNavigation';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP } from '../FirebaseConfig';

LogBox.ignoreLogs(['Warning: Failed prop type']);

const AppNavigation = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(FIREBASE_APP);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <NavigationContainer>

      {user ? <AppStack /> : <AuthStack />}

    </NavigationContainer>
  );
};

export { AppNavigation };
