import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../auth/SignInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import Home from '../app/home';
import Exercises from '../app/exercises';
import ExerciseDetails from '../app/exerciseDetails';
import Profile from '../app/profile';
import MachineDetection from '../app/machineDetection';

import Index from '../app/index';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
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