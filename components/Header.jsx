import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Header({ title, onPress }) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", alignItems:"center"}}>
        <TouchableOpacity 
          onPress={()=>navigation.toggleDrawer()}
          style={styles.iconContainer}>
          <Image 
            resizeMode='contain'
            style={styles.icon}
            source={require("../assets/icons/menu.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 16
  },
  iconContainer: {
    height:45,
    width:45,
    borderRadius: 999,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: "#c0c0c0",
    elevation: 10
  },
  icon: {
    height: 24,
    width:24,
    tintColor:"#000"
  }
})