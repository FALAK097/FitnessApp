import React, { useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../context/ThemeContext';
import { frequentlyAskedQuestions } from '../constants/faqData';
import CommonHeader from '../components/CommonHeader';

export default function Faq() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [openedIndices, setOpenedIndices] = useState([]);
  const [animations, setAnimations] = useState(
    frequentlyAskedQuestions.map(() => new Animated.Value(0))
  );

  function toggleAccordion(index) {
    const newOpenedIndices = [...openedIndices];
    const accordionIndex = newOpenedIndices.indexOf(index);

    if (accordionIndex === -1) {
      newOpenedIndices.push(index);
    } else {
      newOpenedIndices.splice(accordionIndex, 1);
    }

    setOpenedIndices(newOpenedIndices);

    const newAnimations = animations.map((anim, i) => {
      return Animated.timing(anim, {
        toValue: newOpenedIndices.includes(i) ? 1 : 0,
        duration: 100,
        useNativeDriver: false,
      });
    });

    Animated.parallel(newAnimations).start();
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.mainBackgroundColor },
      ]}>
      <CommonHeader
        title="FAQ's"
        navigation={navigation}
        style={{ marginBottom: 5, marginRight: 20, marginLeft: -5 }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}>
        {frequentlyAskedQuestions.map((faq, index) => (
          <View key={index} style={styles.card}>
            <TouchableWithoutFeedback onPress={() => toggleAccordion(index)}>
              <View style={styles.headerFaq}>
                <Text style={[styles.title, { color: theme.textColor }]}>
                  {faq.question}
                </Text>
                <AntDesign
                  name={openedIndices.includes(index) ? 'caretup' : 'caretdown'}
                  size={16}
                  color={theme.textColor}
                />
              </View>
            </TouchableWithoutFeedback>

            <Animated.View
              style={[
                styles.content,
                {
                  height: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                },
              ]}>
              <Text style={[styles.details, { color: theme.textColor }]}>
                {faq.answer}
              </Text>
            </Animated.View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerText: {
    fontSize: hp(3),
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 4,
  },
  headerFaq: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
    overflow: 'hidden',
  },
  details: {
    opacity: 0.65,
  },
});
