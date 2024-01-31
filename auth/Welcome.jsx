import { View, Text, Image } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Welcome({ navigation }) {
  return (
    <View className="flex-1 flex justify-end">
      <Image
        className="h-full w-full absolute"
        source={require('../assets/images/onboarding/welcome.png')}
      />

      <LinearGradient
        colors={['transparent', '#181818']}
        style={{ width: wp(100), height: hp(70) }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        className="flex justify-end pb-12 space-y-8">
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="flex items-center">
          <Text
            style={{ fontSize: hp(5), color: '#FFFFFF' }}
            className="text-white font-bold tracking-wide">
            Best <Text style={{ color: '#F1BE48' }}>Workouts</Text>
          </Text>
          <Text
            style={{ fontSize: hp(5) }}
            className="text-white font-bold tracking-wide">
            For you
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('SignInScreen')}
            style={{ height: hp(7), width: wp(80), backgroundColor: '#F1BE48' }}
            className="button-86 rounded-full flex items-center justify-center mx-auto border-[2px] border-neutral-200">
            <Text
              style={{ fontSize: hp(3), color: '#000' }}
              className="text-white font-bold tracking-wide">
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
      <StatusBar style="light" />
    </View>
  );
}
