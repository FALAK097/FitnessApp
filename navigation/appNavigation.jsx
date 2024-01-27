import { LogBox, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack, AuthStack } from './stackNavigation';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP } from '../FirebaseConfig';
import { TabNavigation } from './tabNavigation';

LogBox.ignoreLogs(['Warning: Failed prop type']);

const AppNavigation = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const auth = getAuth(FIREBASE_APP);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log('User:', user);
        setUser(user);
        setLoading(false); // Set loading to false when authentication state is determined
      },
      (error) => {
        console.error('AuthStateChanged Error:', error);
        setLoading(false); // Ensure loading state is updated even in case of error
      }
    );

    return () => unsubscribe();
  }, []);

  // While loading, display an activity indicator
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Once loading is complete, determine which stack to render based on the authentication state
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export { AppNavigation };
