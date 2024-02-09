import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

export default function DietShow() {
  const route = useRoute();
  const { theme } = useTheme();
  const { selectedGender, age, height, weight, activityLvl, goal } =
    route.params;
  const [apiData, setApiData] = useState(null);
  const [isVeg, setIsVeg] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const apiUrl = process.env.EXPO_PUBLIC_DIET_API + '/generate_meals';

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            age: age,
            weight: weight,
            height: height,
            gender: selectedGender,
            activity_level: activityLvl,
            weight_goal: goal,
          }),
        };

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        setApiData(data);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchDataFromApi();
  }, [age, weight, height, selectedGender, activityLvl, goal]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        {
          backgroundColor: theme.mainBackgroundColor,
        },
      ]}>
      {/* Add Veg/Non-Veg Switch */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.textColor }]}>
          Non-Veg
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isVeg ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsVeg((prev) => !prev)}
          value={isVeg}
        />
        <Text style={[styles.switchLabel, { color: theme.textColor }]}>
          Veg
        </Text>
      </View>

      {/* Display API data */}
      {apiData && (
        <View>
          <Text style={[styles.sectionHeader, { color: theme.textColor }]}>
            Calories Information:
          </Text>
          <Text style={{ color: theme.textColor }}>
            Total Calories per Day: {apiData.calories['calories-per-day']}
          </Text>
          <Text style={{ color: theme.textColor }}>
            Breakfast Calories: {apiData.calories['breakfast-calories-per-day']}
          </Text>
          <Text style={{ color: theme.textColor }}>
            Lunch Calories: {apiData.calories['lunch-calories-per-day']}
          </Text>
          <Text style={{ color: theme.textColor }}>
            Dinner Calories: {apiData.calories['dinner-calories-per-day']}
          </Text>

          <Text style={[styles.sectionHeader, { color: theme.textColor }]}>
            {isVeg ? 'Veg Meal Options:' : 'Non-Veg Meal Options:'}
          </Text>
          <MealOptions
            options={isVeg ? apiData.veg : apiData.non_veg}
            theme={theme}
          />
        </View>
      )}
    </ScrollView>
  );
}

const MealOptions = ({ options, theme }) => (
  <View>
    <Text style={[styles.mealType, { color: theme.textColor }]}>
      Breakfast:
    </Text>
    <Text style={{ color: theme.textColor }}>Options to choose from:</Text>

    {renderOptions(options.breakfast)}

    <Text style={[styles.mealType, { color: theme.textColor }]}>Lunch:</Text>
    <Text style={{ color: theme.textColor }}>Options to choose from:</Text>

    {renderOptions(options.lunch)}

    <Text style={[styles.mealType, { color: theme.textColor }]}>Dinner:</Text>
    <Text style={{ color: theme.textColor }}>Options to choose from:</Text>

    {renderOptions(options.dinner)}
  </View>
);

const renderOptions = (options) => (
  <View>
    {options.map((option, index) => (
      <TouchableOpacity key={index} style={styles.card}>
        <Text>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  mealType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
});
