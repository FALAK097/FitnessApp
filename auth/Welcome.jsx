import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{ height: 800, width: width, position: 'absolute' }}
        source={require('../assets/images/onboarding/getstart1.png')}
      />

      <LinearGradient
        colors={['transparent', '#18181']}
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
            style={{ fontSize: hp(5), color: '#FFFFFF', fontWeight: 'bold' }}>
            For you
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).springify()} style={{ alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('SignInScreen')}
            style={{ marginTop: 40, marginBottom: 0, height: hp(7), width: wp(80), backgroundColor: '#F1BE48', borderRadius: hp(3.5), justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFFFFF' }}>
            <Text style={{ fontSize: hp(3), color: '#000', fontWeight: 'bold' }}>
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
      <StatusBar style="light" />
    </View>
  );
}
