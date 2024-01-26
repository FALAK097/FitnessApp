import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack, AuthStack } from './stackNavigation';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP } from '../FirebaseConfig';
import { TabNavigation } from './tabNavigation';

LogBox.ignoreLogs(['Warning: Failed prop type']);

const AppNavigation = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(FIREBASE_APP);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        // console.log('User:', user);
        setUser(user);
      },
      (error) => {
        console.error('AuthStateChanged Error:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <AuthStack />
      {/* {user ? <AppStack /> : <AuthStack />} */}
      {/* <TabNavigation/> */}
    </NavigationContainer>
  );
};

export { AppNavigation };
