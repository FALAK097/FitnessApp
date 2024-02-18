import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAvatar } from '../context/AvatarContext';
import { useTheme } from '../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from '@expo/vector-icons'

export default function Header({ displayName, onPressAvatar }) {
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
    <View style={[styles.container, { backgroundColor: '#F1BE48' }]}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={[styles.icon, { backgroundColor: 'white', marginRight: 5 }]}>
        {/* Use MaterialIcons and set color to theme.textColor */}
        <MaterialIcons name="menu" size={24} />
      </TouchableOpacity>
      <Text style={[styles.usernameText, { color: theme.textColor }]}>
        Welcome Freaks <Text style={styles.highlightedText}>{displayName}</Text>
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
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    backgroundColor: '#F1BE48', // Set background color to #F1BE48
  },
  icon: {
    marginTop: 30,
    marginLeft: 10,
    height: 45,
    width: 45,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  avatar: {
    marginTop: 30,
    marginRight: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  usernameText: {
    marginTop: 30,
    fontSize: 22,
    flex: 1,
    marginRight: 0,
    marginLeft: -40,
    textAlign: 'center',
    fontWeight: '900',
  },
  highlightedText: {
    color: '#F1BE48',
  },
});
