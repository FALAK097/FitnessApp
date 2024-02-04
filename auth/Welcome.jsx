import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

export default function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{ height: '100%', width: '100%', position: 'absolute' }}
        source={require('../assets/gif/welcome.gif')}
      />
      
      <Animated.View style={{ alignItems: 'center', marginBottom: 40, marginTop: 450 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: '900', textAlign: 'center', marginLeft: 15, marginRight: 15 }}>
              Unlock Your Ultimate Fitness Potential: Where <Text style={{ color: '#F1BE48' }}>SMART</Text> Meets Sweat
          </Text>
      </View>
      </Animated.View>

      <Animated.View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('SignInScreen')}
          style={{ height: 50, width: 150, backgroundColor: '#F1BE48', borderRadius: 25, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold', marginRight: 10 }}>
            →
          </Text>
          <Text style={{ fontSize: 20, color: '#000', fontWeight: '900' }}>
            Start
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
