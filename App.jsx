import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import SignInScreen from './auth/SignInScreen';
import SignUpScreen from './auth/SignUpScreen';
import Layout from './app/_layout';
import Index from './app/index';
import Home from './app/home';
import Exercises from './app/exercises';
import ExerciseDetails from './app/ExerciseDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Index"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="AppLayout" component={Layout} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Exercises" component={Exercises} />
          <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
