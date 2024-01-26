import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../auth/Welcome';
import SignInScreen from '../auth/SignInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import ForgotPassword from '../auth/ForgotPassword';

import Home from '../app/home';
import Exercises from '../app/exercises';
import ExerciseDetails from '../app/exerciseDetails';
import Profile from '../app/profile';
import MachineDetection from '../app/machineDetection';
import VerifyEmailScreen from '../auth/VerifyEmailScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="VerifyEmailScreen"
        component={VerifyEmailScreen}
        options={{ title: 'Verify Email' }}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
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
