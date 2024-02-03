import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack, AuthStack } from './stackNavigation';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP } from '../FirebaseConfig';
import { AvatarProvider } from '../context/AvatarContext';

const AppNavigation = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(FIREBASE_APP);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        // console.log('User:', user);
        setUser(user);
        setTimeout(() => {
          setLoading(false);
        }, 4200);
      },
      (error) => {
        console.error('AuthStateChanged Error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/images/onboarding/onboarding.gif')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <AvatarProvider>
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AvatarProvider>
  );
};

export { AppNavigation };
