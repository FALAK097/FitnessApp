import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation, useRoute } from '@react-navigation/native';

import ImageSlider from '../components/ImageSlider';
import { useTheme } from '../components/ThemeContext';

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  const username = route.params?.username || 'Guestugbefu';

  const handleAvatarClick = () => {
    navigation.navigate('Profile');
  };

  const detectMachine = () => {
    navigation.navigate('MachineDetection');
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white flex space-y-5"
      edges={['top']}
      style={{ backgroundColor: theme.mainBackgroundColor }}>
      <StatusBar style="dark" />
      <View className="flex-row justify-between items-center mx-5 mt-0">
        <Text
          style={{
            fontSize: hp(3.5),
            color: theme.textColor,
            flex: 1,
            marginRight: wp(2),
          }}
          className="font-bold tracking-wide">
          Welcome, <Text style={{ color: '#F1BE48' }}>{username}</Text>
        </Text>

        <TouchableOpacity activeOpacity={0.6} onPress={handleAvatarClick}>
          <Image
            source={require('../assets/icons/avatar.png')}
            style={{ height: hp(7), width: wp(15), marginRight: wp(2) }}
            className="rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-neutral-200 rounded-full flex justify-center items-center border-[3px] border-neutral-300"
          style={{ height: hp(5.5), width: hp(6) }}>
          <Octicons
            name="device-camera"
            size={hp(4)}
            color="gray"
            onPress={detectMachine}
          />
        </TouchableOpacity>
      </View>

      {/* Image Slider */}
      <View>
        <ImageSlider />
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('BodyParts')}>
          <Image
            source={require('../assets/images/gym/gym1.jpg')}
            style={styles.cardImage}
          />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>Exercise</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('DietScreen')}>
          <Image
            source={require('../assets/images/diet/diet2.jpg')}
            style={styles.cardImage}
          />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>Diet</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  card: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 20,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardTextContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
