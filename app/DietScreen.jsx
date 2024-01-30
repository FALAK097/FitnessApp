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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { dietCardContent } from '../constants/dietCard';
import FilterDiet from '../components/FilterDiet';
import { useTheme } from '../components/ThemeContext';
import CommonHeader from '../components/CommonHeader';

const DietScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [filteredData, setFilteredData] = useState(dietCardContent);

  const applyFilters = (filters) => {
    let newData = [...dietCardContent];

    // Apply diet filter
    if (filters.diet.length > 0) {
      newData = newData.filter((item) => filters.diet.includes(item.goal));
    }

    // Apply veg/non-veg filter
    if (filters.vegNonVeg.length > 0) {
      if (filters.vegNonVeg.includes('Both')) {
        // Include both Veg and Non-Veg items
        newData = newData.filter(
          (item) => item.category === 'Veg' || item.category === 'Non-Veg'
        );
      } else {
        newData = newData.filter((item) =>
          filters.vegNonVeg.includes(item.category)
        );
      }
    }

    // Apply other filters
    if (filters.other.length > 0) {
      newData = newData.filter((item) =>
        filters.other.every((opt) => item[opt])
      );
    }

    setFilteredData(newData);
  };

  const handleClearFilters = () => {
    setFilteredData(dietCardContent); // Reset filteredData to the original data
  };

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
      <CommonHeader
        title="Diet"
        navigation={navigation}
        style={{ marginTop: 30, marginRight: 25, marginLeft: -10 }}
      />

      <FilterDiet
        onSelectFilters={applyFilters}
        onClearFilters={handleClearFilters}
      />

      {filteredData.map((item, index) => (
        <View
          key={index}
          style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
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
          {item.category && (
            <Text style={[styles.goal, { color: theme.textColor }]}>
              Category: {item.category}
            </Text>
          )}
          {item.isVegan && (
            <Text style={[styles.goal, { color: theme.textColor }]}>Vegan</Text>
          )}
          {item.isGlutenFree && (
            <Text style={[styles.goal, { color: theme.textColor }]}>
              Gluten-Free
            </Text>
          )}
          {item.isBudgetFriendly && (
            <Text style={[styles.goal, { color: theme.textColor }]}>
              Budget-Friendly
            </Text>
          )}
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
