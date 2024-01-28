import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from '../auth/Onboarding';
import Welcome from '../auth/Welcome';
import SignInScreen from '../auth/SignInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import ForgotPassword from '../auth/ForgotPassword';

import Home from '../app/Home';
import Exercises from '../app/Exercises';
import ExerciseDetails from '../app/ExerciseDetails';
import Profile from '../app/Profile';
import MachineDetection from '../app/MachineDetection';
import HelpScreen from '../app/HelpScreen';
import BodyParts from '../app/BodyParts';
import DietScreen from '../app/DietScreen';
// import VerifyEmailScreen from '../auth/VerifyEmailScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
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
      <Stack.Screen name="BodyParts" component={BodyParts} />
      <Stack.Screen name="DietScreen" component={DietScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
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
