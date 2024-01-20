import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack, AuthStack } from './stackNavigation';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP } from '../FirebaseConfig';

import SignInScreen from '../auth/SignInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import Index from '../app/index';
import Home from '../app/home';
import Exercises from '../app/exercises';
import ExerciseDetails from '../app/exerciseDetails';
import MachineDetection from '../app/machineDetection';
import Profile from '../app/profile'

const Stack = createStackNavigator();

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
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Exercises"
          component={Exercises}
          options={{
            presentation: 'fullScreenModal',
          }}
        />
        <Stack.Screen
          name="ExerciseDetails"
          component={ExerciseDetails}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="MachineDetection"
          component={MachineDetection}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            presentation: 'modal',
          }}
        />
        {user ? (
          <Stack.Screen name="InsideLayout" component={InsideLayout} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { AppNavigation };
