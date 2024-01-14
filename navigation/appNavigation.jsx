import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';

import SignInScreen from '../auth/SignInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import Index from '../app/index';
import Home from '../app/home';
import Exercises from '../app/exercises';
import ExerciseDetails from '../app/ExerciseDetails';

const Stack = createStackNavigator();

LogBox.ignoreLogs(['Warning: Failed prop type']);

const InsideStack = createStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name="Home" component={Home} />
      <InsideStack.Screen
        name="Exercises"
        component={Exercises}
        options={{
          presentation: 'fullScreenModal',
        }}
      />
      <InsideStack.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
        options={{
          presentation: 'modal',
        }}
      />
    </InsideStack.Navigator>
  );
}

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
