import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import Exercises from './exercises';
import ExerciseDetails from './ExerciseDetails';

const Stack = createNativeStackNavigator();

export default function _layout() {
  LogBox.ignoreLogs(['Warning: Failed prop type']);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="exercises"
          component={Exercises}
          options={{
            presentation: 'fullScreenModal',
          }}
        />
        <Stack.Screen
          name="exerciseDetails"
          component={ExerciseDetails}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
