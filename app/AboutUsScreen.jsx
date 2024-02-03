import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../context/ThemeContext';
import CommonHeader from '../components/CommonHeader';

const AboutUsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const openGitHubProfile = (profileUrl) => {
    Linking.openURL(profileUrl);
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
        title="About Us"
        navigation={navigation}
        style={{
          marginTop: 35,
          marginRight: 20,
          marginLeft: -15,
          marginBottom: 20,
        }}
      />
      <Text style={[styles.description, { color: theme.textColor }]}>
        Welcome to our fitness app! We are dedicated to helping you achieve your
        fitness goals through innovative features and personalized
        recommendations.
      </Text>
      <Text style={[styles.head, { color: theme.textColor }]}>
        Our app features include:
      </Text>
      <Text style={[styles.feature, { color: theme.textColor }]}>
        1. Smart Camera Feature:
      </Text>
      <Text style={[styles.featureDescription, { color: theme.textColor }]}>
        Our smart camera feature allows you to click or upload a photo of any
        gym machine, and it will provide information on how to use the machine,
        its benefits, and recommend exercises you can perform using it.
      </Text>
      <Text style={[styles.feature, { color: theme.textColor }]}>
        2. Diet Recommendation:
      </Text>
      <Text style={[styles.featureDescription, { color: theme.textColor }]}>
        Receive personalized diet recommendations tailored to your fitness goals
        and dietary preferences. Whether you're looking to lose weight, build
        muscle, or maintain a healthy lifestyle, our app provides nutrition
        guidance to support your journey.
      </Text>
      <Text style={[styles.feature, { color: theme.textColor }]}>
        3. Exercise Recommendation:
      </Text>
      <Text style={[styles.featureDescription, { color: theme.textColor }]}>
        Get customized exercise recommendations based on your fitness level,
        preferences, and goals. Whether you're a beginner or an experienced
        athlete, our app offers a variety of workout routines to help you stay
        motivated and achieve results.
      </Text>
      <Text
        style={{
          color: theme.textColor,
          fontSize: 17,
          textAlign: 'center',
          marginBottom: 3,
        }}>
        Built by
      </Text>
      <View style={styles.credits}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => openGitHubProfile('https://github.com/shubham4112')}>
            <Image
              source={require('../assets/icons/avatar1.png')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={{ color: theme.textColor, textAlign: 'center' }}>
              Shubham
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openGitHubProfile('https://github.com/aniketsh22')}>
            <Image
              source={require('../assets/icons/avatar2.png')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={{ color: theme.textColor, textAlign: 'center' }}>
              Aniket
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openGitHubProfile('https://github.com/FALAK097/')}>
            <Image
              source={require('../assets/icons/avatar3.png')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={{ color: theme.textColor, textAlign: 'center' }}>
              Falak
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openGitHubProfile('https://github.com/Faisal2506')}>
            <Image
              source={require('../assets/icons/avatar4.png')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={{ color: theme.textColor, textAlign: 'center' }}>
              Faisal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.contact, { color: theme.textColor, fontSize: 17 }]}>
        For any questions or feedback, please contact us at{' '}
        <Text
          style={{ color: '#dc9e11', fontWeight: '900' }}
          onPress={() => Linking.openURL('mailto:support@fithub.com')}>
          support@fithub.com
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  feature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: hp(2.5),
  },
  featureDescription: {
    fontSize: wp(4.5),
    marginLeft: wp(7),
    marginBottom: wp(4),
  },
  credits: {
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
    marginRight: 5,
  },
  contact: {
    fontSize: wp(3.8),
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default AboutUsScreen;
