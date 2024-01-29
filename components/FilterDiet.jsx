import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dietOptions = ['Balanced Diet', 'Muscle Gain', 'Fat Loss'];
const vegNonVegOptions = ['Veg', 'Non-Veg', 'Both'];
const otherOptions = ['isVegan', 'isGlutenFree', 'isBudgetFriendly'];

const FilterDiet = ({ onSelectFilters, onClearFilters }) => {
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [selectedVegNonVeg, setSelectedVegNonVeg] = useState(null);
  const [selectedOther, setSelectedOther] = useState([]);
  const [showDietOptions, setShowDietOptions] = useState(false);
  const [showVegNonVegOptions, setShowVegNonVegOptions] = useState(false);
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  const clearFilters = () => {
    setSelectedDiet(null);
    setSelectedVegNonVeg(null);
    setSelectedOther([]);
    onClearFilters();
  };

  const applyFilters = () => {
    const selectedFilters = {
      diet: selectedDiet ? [selectedDiet] : [],
      vegNonVeg: selectedVegNonVeg ? [selectedVegNonVeg] : [],
      other: selectedOther,
    };
    onSelectFilters(selectedFilters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Select Diet:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDietOptions(!showDietOptions)}>
          <Text>{selectedDiet || 'Select Diet'}</Text>
          <Ionicons
            name={showDietOptions ? 'caret-up' : 'caret-down'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {showDietOptions && (
        <View style={styles.dropdownContent}>
          {dietOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setSelectedDiet(option);
                setShowDietOptions(false);
              }}>
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Veg/Non-Veg:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowVegNonVegOptions(!showVegNonVegOptions)}>
          <Text>{selectedVegNonVeg || 'Select Veg/Non-Veg'}</Text>
          <Ionicons
            name={showVegNonVegOptions ? 'caret-up' : 'caret-down'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {showVegNonVegOptions && (
        <View style={styles.dropdownContent}>
          {vegNonVegOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setSelectedVegNonVeg(option);
                setShowVegNonVegOptions(false);
              }}>
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Other Filters:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowOtherOptions(!showOtherOptions)}>
          <Text>
            {selectedOther.length > 0
              ? selectedOther.join(', ')
              : 'Select Other Options'}
          </Text>
          <Ionicons
            name={showOtherOptions ? 'caret-up' : 'caret-down'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {showOtherOptions && (
        <View style={styles.dropdownContent}>
          {otherOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                if (selectedOther.includes(option)) {
                  setSelectedOther((prev) =>
                    prev.filter((item) => item !== option)
                  );
                } else {
                  setSelectedOther((prev) => [...prev, option]);
                }
              }}>
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.clearFiltersButton}
        onPress={clearFilters}>
        <Text>Clear Filters</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    marginRight: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContent: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    padding: 5,
  },
  clearButton: {
    marginLeft: 'auto',
  },
  selectedOption: {
    backgroundColor: '#ccc',
  },
  clearFiltersButton: {
    backgroundColor: '#F1BE48',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: '#37367a',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FilterDiet;
