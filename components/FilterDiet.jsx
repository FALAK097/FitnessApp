import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';

const FilterDiet = ({ selectedFilter, onSelectFilter }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.mainBackgroundColor },
      ]}>
      <TouchableOpacity onPress={() => onSelectFilter('Fat Loss')}>
        <Text style={[styles.filterText, { color: theme.textColor }]}>
          Fat Loss
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectFilter('Muscle Gain')}>
        <Text style={[styles.filterText, { color: theme.textColor }]}>
          Muscle Gain
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectFilter('Balanced Diet')}>
        <Text style={[styles.filterText, { color: theme.textColor }]}>
          Balanced Diet
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterDiet;
