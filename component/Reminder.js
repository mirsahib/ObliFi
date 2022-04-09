import React,{useEffect, useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign'

const windowWidth = Dimensions.get('window').width;

const reminderItem = [{
  text: "Laptop charger"
}, {
  text: "Mobile charger"
}, {
  text: "Car key"
}, {
  text: "Pen"
},
{
  text: "Laptop charger"
}, {
  text: "Mobile charger"
}, {
  text: "Car key"
}, {
  text: "Pen"
}]

function Reminder({ route, navigation }) {
  const { wifiItem } = route.params
  console.log(wifiItem)
  useEffect(()=>{
    if(!wifiItem){
      wifiItem = {"BSSID": "50:d2:f5:b8:b5:01", "SSID": "Miraj", "capabilities": "[WPA-PSK-TKIP+CCMP][WPA2-PSK-TKIP+CCMP][RSN-PSK-TKIP+CCMP][ESS][WPS][WFA-HT]", "frequency": 2462, "level": -50, "timestamp": 263177937827, "wifiItem": {"BSSID": "70:4f:57:a5:3a:60", "SSID": "Akkhor", "capabilities": "[WPA2-PSK-CCMP][RSN-PSK-CCMP][ESS][WPS][WFA-HT]", "frequency": 2417, "level": -53, "timestamp": 264057362487}}
    }
  },[])


  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text style={{ color: 'white' }}>Access point: {wifiItem.SSID}</Text>
          <Text style={{ color: 'white' }}>Reminder: 4</Text>
        </View>{/**box header container */}
        <ScrollView style={styles.reminderContainer}>
          {reminderItem.map((item, index) => {
            return (<View key={index} style={styles.reminderItem}>
              <Text >{item.text}</Text>
              <View style={styles.reminderBtnContainer}>
                <Icon.Button backgroundColor={'#252954'} color={'#9294A7'} name='edit'></Icon.Button>
                <AntIcon.Button backgroundColor={'#252954'} color={'#9294A7'} name='delete'></AntIcon.Button>
              </View>
            </View>)
          })}
        </ScrollView>{ /**reminder container */}
      </View>
      <View style={styles.tabContainer}>
                <Icon.Button name="home" size={30} backgroundColor="#252954" color="#E64F59" ></Icon.Button>
                <Icon.Button name="plus" size={30} backgroundColor="#252954" color="#E64F59" ></Icon.Button>
                <Icon.Button name='align-justify' size={30} backgroundColor="#252954" color="#E64F59"></Icon.Button>
            </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#010233'
  },
  wrapper: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  headerContainer: {
    backgroundColor: '#252954',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth - 50,
    height: 190,
    borderRadius: 25
  },
  reminderContainer: {
    marginTop: 20
  },
  reminderItem: {
    backgroundColor: "#252954",
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 15,
    height: 50,
    borderRadius: 25,
  },
  reminderBtnContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  tabContainer:{
    backgroundColor:"#252954",
    width:windowWidth,
    height:60,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    borderTopLeftRadius:20,
    borderTopRightRadius:20
}

});

export default Reminder