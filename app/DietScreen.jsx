import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../components/ThemeContext';
import { dietCardContent } from '../constants/dietCard';
import FilterDiet from '../components/FilterDiet';

const DietScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('Balanced Diet');
  const filteredContent = dietCardContent.filter(
    (item) => item.goal === selectedFilter
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      contentContainerStyle={[
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
            style={{
              color: theme.textColor,
              marginLeft: wp(4),
              marginTop: hp(3),
            }}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.textColor }]}>
          Diet
        </Text>
      </View>

      <FilterDiet
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />
      {filteredContent.map((item, index) => (
        <View key={index} style={[styles.card]}>
          <Image source={item.image} style={styles.image} />
          <Text style={[styles.title, { color: theme.textColor }]}>
            {item.title}
          </Text>
          <Text style={[styles.goal, { color: theme.textColor }]}>
            Goal: {item.goal}
          </Text>
          <Text style={[styles.description, { color: theme.textColor }]}>
            {item.description}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: wp(5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  headerText: {
    fontSize: hp(3.5),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginTop: hp(3),
    marginRight: hp(5),
  },
  card: {
    borderRadius: wp(2),
    elevation: 3,
    marginBottom: hp(2),
    width: '100%',
    padding: wp(2),
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: hp(30),
    borderRadius: wp(2),
    marginBottom: hp(1),
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  goal: {
    fontSize: hp(2),
    marginBottom: hp(1),
  },
  description: {
    fontSize: hp(2),
    textAlign: 'center',
  },
});

export default DietScreen;
