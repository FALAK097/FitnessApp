import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { bodyParts } from '../constants';
import { useTheme } from '../components/ThemeContext';

export default function BodyParts() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.mainBackgroundColor },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={hp(4)}
            style={{ color: theme.textColor, marginLeft: 5 }}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.textColor }]}>
          Exercises
        </Text>
      </View>

      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <BodyPartCard navigation={navigation} index={index} item={item} />
        )}
      />
    </SafeAreaView>
  );
}

const BodyPartCard = ({ navigation, item, index }) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)
        .delay(index * 200)
        .springify()}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('Exercises', { params: item });
        }}
        style={styles.card}>
        <Image
          source={item.image}
          resizeMode="cover"
          style={styles.cardImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Text style={styles.cardText}>
          {item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerText: {
    fontSize: hp(3),
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: wp(44),
    height: wp(52),
    justifyContent: 'flex-end',
    position: 'relative',
    marginBottom: 10,
    borderRadius: 35,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    width: '100%',
    height: hp(15),
    position: 'absolute',
    bottom: 0,
    borderRadius: 35,
  },
  cardText: {
    fontSize: hp(2.3),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});
