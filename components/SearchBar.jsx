import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();

  const handleSearch = () => {
    // Perform search action with the search query
    onSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { color: theme.textColor }]}
        placeholder="Search any exercise, machine or diet"
        placeholderTextColor={theme.textColor}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#f1be48' }]}
        onPress={handleSearch}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  button: {
    borderRadius: 8,
    padding: 10,
  },
});

export default SearchBar;
