import { getMaxListeners } from 'process';
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

    useEffect(() => {
        async function loadList() {
            try {
                const newWifilist = await WifiManager.loadWifiList()
                console.log('newlist', newWifilist.length)
                if(newWifilist.length!=wifiList.length){
                    setWifiList(newWifilist)
                }
            } catch (error) {
                //console.warn('loadlist', error)
            }
        }
        const interval = setInterval(loadList, 5000)
        return () => {
            console.log('unmount',interval)
            return clearInterval(interval)
        }
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
                                <Image style={{ width: 40, height: 40 }} />
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
    }
});


export default Home