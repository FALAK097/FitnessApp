import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { bodyParts } from '../constants';

export default function BodyParts() {
  const navigation = useNavigation();
  return (
    <View className="mx-4">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-700">
        Exercises
      </Text>

      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item, index }) => (
          <BodyPartCard navigation={navigation} index={index} item={item} />
        )}
      />
    </View>
  );
}

const BodyPartCard = ({ navigation, item, index }) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)
        .delay(index * 200)
        .springify()}>
      <TouchableOpacity
        onPress={() => {
          // console.log('Navigating to Exercises with item:', item);
          // router.push({ pathname: 'Exercises', params: item });
          navigation.navigate('Exercises', { params: item });
        }}
        style={{ width: wp(44), height: wp(52) }}
        className="flex justify-end p-4 mb-4">
        <Image
          source={item.image}
          resizeMode="cover"
          style={{ width: wp(44), height: wp(52) }}
          className="rounded-[35px] absolute"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={{
            width: wp(44),
            height: hp(15),
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="rounded-[35px] absolute bottom-0"
        />

        <Text
          style={{ fontSize: hp(2.3) }}
          className="text-white font-semibold tracking-wide text-center">
          {item?.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
