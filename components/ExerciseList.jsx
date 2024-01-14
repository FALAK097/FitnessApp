import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ExerciseList({ data }) {
  const router = useNavigation();
  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item, index }) => (
          <ExerciseCard router={router} index={index} item={item} />
        )}
      />
    </View>
  );
}

const ExerciseCard = ({ item, router, index }) => {
  const animatedStyle = FadeInDown.duration(400)
    .delay(index * 200)
    .springify();

  const navigateToExerciseDetails = () => {
    console.log('Before navigation');
    if (item && router && router.push) {
      console.log('Navigating to ExerciseDetails');
      router.push('ExerciseDetails', { item });
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={navigateToExerciseDetails}
        style={{ flex: 1, paddingVertical: hp(3), marginBottom: hp(2) }}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            shadowColor: 'black',
            borderRadius: 25,
            overflow: 'hidden',
            elevation: 5,
          }}>
          {item?.gifUrl && (
            <Image
              source={{ uri: item.gifUrl }}
              contentFit="cover"
              style={{ width: wp(44), height: wp(52), borderRadius: 25 }}
            />
          )}
        </View>
        <Text
          style={{
            fontSize: hp(1.7),
            fontWeight: 'bold',
            color: 'black',
            marginLeft: wp(2),
            marginTop: hp(1),
          }}>
          {item?.name?.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
