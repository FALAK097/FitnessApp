import React from "react";
import { View, Text , StyleSheet,Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile() {
  return(
    <View style={styles.mainContainer}>
      <View style={styles.profileImage}>
        <TouchableOpacity>
          <Image style={styles.profileImageStyle} source={require('../assets/images/avatar.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
          <Text>Tap to change avatar</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.Container}>
        <TouchableOpacity>
          <Text style={styles.Text}>Profile 👤</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Container}>
        <TouchableOpacity>
          <Text style={styles.Text}>Settings ⚙️</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Container}>
          <TouchableOpacity>
          <Text style={styles.Text}>Help ❓</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Container}>
          <TouchableOpacity>
          <Text style={styles.Text}>Logout ❌</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    paddingTop:40
  },
  profileImage:{
    alignItems:'center',
    justifyContent:'center',
    marginBottom:10
  },
  profileImageStyle:{
    height:200,
    width:200,
    borderRadius:100
  },
  card:{
    flex:1,
    justifyContent:'space-between',
    paddingBottom:40
  },
  Text:{
    fontSize:20,
    fontWeight:'bold'
  },
  Container:{
    backgroundColor: 'white', 
        borderRadius: 15, 
        shadowColor: 'black', 
        padding:20,
        shadowOffset: { 
            width: 0, 
            height: 4, 
        }, 
        shadowOpacity: 0.3, 
        shadowRadius: 6, 
        elevation: 14, 
        height:120,
    justifyContent: 'center'
  }
});
