import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from '../auth/Onboarding';
import Welcome from '../auth/Welcome';
import SignInScreen from '../auth/SignInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import ForgotPassword from '../auth/ForgotPassword';
import VerifyEmailScreen from '../auth/VerifyEmailScreen';

import DrawerNavigation from './drawerNavigation';
import BodyParts from '../app/BodyParts';
import Exercises from '../app/Exercises';
import ExerciseDetails from '../app/ExerciseDetails';
import MachineDetection from '../app/MachineDetection';
import StepCounterPage from '../app/StepCounterPage';
import DietScreen from '../app/DietScreen';
import UserInfoPage from '../components/Diet/UserInfoPage';
import ActivityLevel from '../components/Diet/ActivityLevel';
import GoalSelection from '../components/Diet/GoalSelection';
import DietShow from '../components/Diet/DietShow';
import Profile from '../app/Profile';
import AboutUsScreen from '../app/AboutUsScreen';
import Faq from '../app/Faq';
import ChatBot from '../app/ChatBot';
import Settings from '../app/Settings';

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
      <Stack.Screen
        name="VerifyEmailScreen"
        component={VerifyEmailScreen}
        options={{ title: 'Verify Email' }}
      />
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerNavigation} />

      <Stack.Screen name="BodyParts" component={BodyParts} />
      <Stack.Screen name="Exercises" component={Exercises} />
      <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />

      <Stack.Screen
        name="MachineDetection"
        component={MachineDetection}
        options={{
          presentation: 'modal',
        }}
      />

      <Stack.Screen name="StepCounterPage" component={StepCounterPage} />

      <Stack.Screen name="DietScreen" component={DietScreen} />
      <Stack.Screen name="ActivityLevel" component={ActivityLevel} />
      <Stack.Screen name="UserInfoPage" component={UserInfoPage} />
      <Stack.Screen name="GoalSelection" component={GoalSelection} />
      <Stack.Screen name="DietShow" component={DietShow} />

      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="ChatBot" component={ChatBot} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};
