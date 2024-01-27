import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DarkModeSwitch from '../components/DarkModeSwitch';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FIREBASE_APP } from '../FirebaseConfig';
import { getAuth } from 'firebase/auth';

export default function Profile() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const auth = getAuth(FIREBASE_APP);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            auth
              .signOut()
              .then(() => {
                // Add logic to clear user cache here if needed
                // Example: AsyncStorage.clear();
                // Redirect to login screen
                navigation.navigate('SignInScreen');
              })
              .catch((error) => {
                console.error('Sign out error:', error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.mainBackgroundColor },
      ]}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={navigation.goBack}
        className="bg-rose-500 mx-0 pr-1 rounded-full flex justify-center items-center absolute"
        style={{ width: hp(5.5), height: hp(5.5), marginTop: hp(1) }}>
        <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <TouchableOpacity activeOpacity={0.6} style={styles.avatarContainer}>
          <Image
            style={styles.profileImage}
            source={require('../assets/images/avatar.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.changeAvatarText}>Tap to change avatar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            View Profile 👤
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Switch Theme 🌓
          </Text>
          <DarkModeSwitch />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Help ❓
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          className="bg-rose-400"
          style={styles.logoutButton}
          onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout ❌</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(10), // Adjusted for better visibility
    paddingHorizontal: wp(4), // Added horizontal padding
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: hp(3), // Increased margin
  },
  avatarContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: hp(2), // Increased margin
  },
  profileImage: {
    height: hp(20), // Responsive height
    width: hp(20), // Responsive width
  },
  changeAvatarText: {
    fontSize: hp(1.5), // Responsive font size
    color: '#777',
  },
  card: {
    width: '100%',
    alignItems: 'center',
    marginTop: hp(3), // Increased top margin
  },
  button: {
    borderRadius: hp(2), // Responsive border radius
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp(0.4), // Responsive shadow offset
    },
    shadowOpacity: 0.3,
    shadowRadius: hp(0.6), // Responsive shadow radius
    elevation: 5,
    paddingVertical: hp(2), // Responsive padding
    paddingHorizontal: wp(3), // Responsive padding
    marginBottom: hp(2), // Increased margin
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: hp(2.5), // Responsive font size
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 'auto', // Pushes the button to the bottom
    marginBottom: hp(2), // Increased margin
    borderRadius: hp(2), // Responsive border radius
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp(0.4), // Responsive shadow offset
    },
    shadowOpacity: 0.3,
    shadowRadius: hp(0.6), // Responsive shadow radius
    elevation: 5,
    paddingVertical: hp(2), // Responsive padding
    paddingHorizontal: wp(3), // Responsive padding
    width: '100%',
    alignItems: 'center',
  },
});
