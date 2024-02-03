import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAvatar } from '../context/AvatarContext';
import { useTheme } from './ThemeContext';

export default function Header({ name, onPressAvatar }) {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { avatar, updateAvatar } = useAvatar();

  useEffect(() => {
    fetchAvatar();
  }, []);

  const fetchAvatar = async () => {
    try {
      const storedUri = await AsyncStorage.getItem('avatarURI');
      if (storedUri) {
        const uri = JSON.parse(storedUri); // Parse the stored URI
        updateAvatar(uri);
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={[styles.icon, { backgroundColor: '#f1be48', marginRight: 5 }]}>
        <Octicons name="three-bars" size={24} color={theme.textColor} />
      </TouchableOpacity>
      <Text style={[styles.usernameText, { color: theme.textColor }]}>
        Welcome, <Text style={styles.highlightedText}>{name}</Text>
      </Text>
      <TouchableOpacity activeOpacity={0.6} onPress={onPressAvatar}>
        <Image source={avatar} style={styles.avatar} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 16,
  },
  icon: {
    height: 45,
    width: 45,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25, // Make the avatar circular
    borderWidth: 2, // Add a border
    borderColor: '#fff', // Border color
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  usernameText: {
    fontSize: 22,
    flex: 1,
    marginRight: 80,
    textAlign: 'center',
  },
  highlightedText: {
    color: '#F1BE48',
  },
});
