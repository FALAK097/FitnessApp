import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from '../auth/Onboarding';
import Welcome from '../auth/Welcome';
import SignInScreen from '../auth/SignInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import ForgotPassword from '../auth/ForgotPassword';

import Home from '../app/home';
import Exercises from '../app/exercises';
import ExerciseDetails from '../app/exerciseDetails';
import Profile from '../app/profile';
import MachineDetection from '../app/machineDetection';
import HelpSection from '../app/HelpScreen';
// import VerifyEmailScreen from '../auth/VerifyEmailScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding" // Set initialRouteName to "Onboarding"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      {/* <Stack.Screen
        name="VerifyEmailScreen"
        component={VerifyEmailScreen}
        options={{ title: 'Verify Email' }}
      /> */}
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Exercises" component={Exercises} />
      <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="HelpScreen" component={HelpSection} />
      <Stack.Screen
        name="MachineDetection"
        component={MachineDetection}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  ); 
};
