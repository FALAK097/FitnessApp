import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function FAQComponent({title, details}) {
  const { theme } = useTheme();
  const [opened, setOpenend] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const numberOfWords = details.split(" ").length

  function toggleAccordion() {
      if(!opened){
        Animated.timing(animation,{
          toValue:1,
          duration:100,
          useNativeDriver:false
        }).start()
      }else{
        Animated.timing(animation,{
          toValue:0,
          duration:100,
          useNativeDriver:false
        }).start()
      }
      setOpenend(!opened);
    }

    // This is where we use the toValues

    const heightAnimationInterpolation = animation.interpolate({
      inputRange:[0,1],
      outputRange:[0,(numberOfWords / 4.6) * 10], // animate from
    });

  return (
    <ScrollView>
      <View style={styles.card}>
        <TouchableWithoutFeedback onPress={toggleAccordion}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <AntDesign name={opened ? 'caretup' : 'caretdown'} size={16} />
          </View>
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.content, { height: heightAnimationInterpolation }]}>
          <Text style={styles.details}>
            {details}
          </Text>
        </Animated.View>
      </View>
    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
  card:{
    margin:10,
    padding:15,
    backgroundColor:'white',
    borderRadius:6,
  },
    header: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    title: {
        textTransform:'capitalize',
        fontWeight:'bold'
    },
   content: {
    marginTop:8
   },
   details:{
    opacity:0.65
   }
})