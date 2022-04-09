import React from 'react'
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
import { useEffect } from 'react/cjs/react.production.min';
const windowWidth = Dimensions.get('window').width;

const reminderItem = [{
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
  // useEffect(()=>{
  //   if(!wifiItem){
  //     wifiItem = {"BSSID": "50:d2:f5:b8:b5:01", "SSID": "Miraj", "capabilities": "[WPA-PSK-TKIP+CCMP][WPA2-PSK-TKIP+CCMP][RSN-PSK-TKIP+CCMP][ESS][WPS][WFA-HT]", "frequency": 2462, "level": -50, "timestamp": 263177937827, "wifiItem": {"BSSID": "70:4f:57:a5:3a:60", "SSID": "Akkhor", "capabilities": "[WPA2-PSK-CCMP][RSN-PSK-CCMP][ESS][WPS][WFA-HT]", "frequency": 2417, "level": -53, "timestamp": 264057362487}}
  //   }
  // },[])


  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text style={{ color: 'white' }}>Access point: {wifiItem.SSID}</Text>
          <Text style={{ color: 'white' }}>Reminder: 4</Text>
        </View>{/**box header container */}
        <ScrollView style={styles.reminderContainer}>
          {reminderItem.map((item, index) => {
            return (<View style={styles.reminderItem}>
              <Text key={index}>{item.text}</Text>
              <View style={styles.reminderBtnContainer}>
                <Button title='Edit'></Button>
                <Button title='Delete'></Button>
              </View>
            </View>)
          })}
        </ScrollView>{ /**reminder container */}
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
  }

});

export default Reminder