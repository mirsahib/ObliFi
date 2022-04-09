
import React, { Component, useEffect, useState } from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import WifiManager from 'react-native-wifi-reborn';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Home({navigation}) {
    const [wifiList, setWifiList] = useState([])

    const initWifi = async () => {
        try {
            const ssid = await WifiManager.getCurrentWifiSSID();
            console.log('Your current connected wifi SSID is ' + ssid);
        } catch (error) {
            console.log('Cannot get current SSID!', { error });
        }
    }

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "React Native Wifi Reborn App Permission",
                    message:
                        "Location permission is required to connect with or scan for Wifi networks. ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                initWifi();
            } else {
                console.log("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        async function call() {
            await requestLocationPermission()
        }
        call()
    }, [])

    const loadList = async ()=>{
        try {
            console.log('load')
            const newWifilist = await WifiManager.loadWifiList()
            // if(newWifilist.length!=wifiList.length){
                
            // }
            setWifiList(newWifilist)
            console.log(newWifilist)
        } catch (error) {
            console.warn('loadlist', error)
        }
    }
    useEffect(() => {
        loadList()
    }, [])

    

    

    return (
        <SafeAreaView style={styles.container} >
            <ScrollView style={styles.wrapper}>
                {wifiList.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={styles.item} onPress={()=>navigation.navigate("Reminder",{
                            wifiItem:item
                        })} >
                            <View>
                                <Icon name="wifi" size={30} color="#252954" />
                            </View>
                            <View>
                                <Text style={styles.itemText}>SSID: {item.SSID}</Text>
                                <Text style={styles.itemText}>Status:  Connected</Text>
                                <Text style={styles.itemText}>Reminder: 4</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <View style={styles.tabContainer}>
                <Icon.Button name="home" size={30} backgroundColor="#252954" color="#E64F59" ></Icon.Button>
                <Icon.Button name="search" size={30} backgroundColor="#252954" color="#E64F59" onPress={()=>loadList()} ></Icon.Button>
                <Icon.Button name='align-justify' size={30} backgroundColor="#252954" color="#E64F59"></Icon.Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#010233'
    },
    wrapper: {
        marginTop:StatusBar.currentHeight||0
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#252954',
        width: windowWidth - 50,
        height: 100,
        margin: 10,
        borderRadius: 20
    },
    itemText: {
        fontWeight: 'bold', color: "white"
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


export default Home