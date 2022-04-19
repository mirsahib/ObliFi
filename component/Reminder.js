import React, { useEffect, useState, useCallback } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign'
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';



const windowWidth = Dimensions.get('window').width;



function Reminder({ route, navigation }) {
  const { apName } = route.params
  const [APname,setAPName] = useState(apName)
  const [reminderList, setReminderList] = useState([])

  const loadReminderList = useCallback(async () => {
    try {
      console.log('app mount load list')
      console.log('aPname ',APname.SSID)
      const apName = APname.SSID
      const data = await AsyncStorage.getItem(apName)
      console.log(data)
       if (data !== null) {
        const reminderList = JSON.parse(data)
        setReminderList(reminderList)
      } else {
        console.log('data is null')
      }
    } catch (e) {
      console.log('error', e)
    }
  },[])
  const saveReminderList = async () => {
    try {
      const apName = APname.SSID
      console.log('reminder list before save',reminderList)
      await AsyncStorage.setItem(apName,JSON.stringify(reminderList))
    } catch (e) {
      console.log('error', e)
    }
  }

  useEffect(() => {
    loadReminderList()
  }, [loadReminderList])

  useEffect(()=>{
    saveReminderList()
  },[reminderList,APname])


  const toggleEditBtn = (id) => {
    console.log('edit', id)
    const newReminderList = reminderList.map(item => {
      if (item.id === id) {
        item.editable = !item.editable
      } else {
        item.editable = false
      }
      return item
    })
    setReminderList(newReminderList)
  }
  const deleteFunction = (id) => {
    console.log('delete', id)
    const newReminderList = reminderList.filter(item => {
      return item.id != id
    })
    setReminderList(newReminderList)
  }
  const addReminder = () => {
    const newReminder = {
      id: uuid.v4(),
      text: 'Add item',
      editable: false
    }
    reminderList.push(newReminder)
    console.log('from add reminder',reminderList)
    setReminderList([...reminderList])
    
  }
  const editText = (text, id) => {
    const newReminderList = reminderList.map(item => {
      if (item.id === id) {
        item.text = text
      }
      return item
    })
    setReminderList(newReminderList)
  }

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text style={{ color: 'white' }}>Access point: {apName.SSID}</Text>
          <Text style={{ color: 'white' }}>Reminder: {reminderList.length}</Text>
        </View>{/**box header container */}
        <ScrollView style={styles.reminderContainer}>
          {reminderList.map((item) => {
            return (<View key={item.id} style={styles.reminderItem}>
              {item.editable ? <TextInput style={styles.textInput} value={item.text} onChangeText={(text) => editText(text, item.id)} /> : <Text>{item.text}</Text>}
              <View style={styles.reminderBtnContainer}>
                <Icon.Button backgroundColor={'#252954'} color={'#9294A7'} name='edit' onPress={() => toggleEditBtn(item.id)}></Icon.Button>
                <AntIcon.Button backgroundColor={'#252954'} color={'#9294A7'} name='delete' onPress={() => deleteFunction(item.id)}></AntIcon.Button>
              </View>
            </View>)
          })}
        </ScrollView>{ /**reminder container */}
      </View>
      <View style={styles.tabContainer}>
        <Icon.Button name="home" size={30} backgroundColor="#252954" color="#E64F59" onPress={() => navigation.navigate('Home')} ></Icon.Button>
        <Icon.Button name="plus" size={30} backgroundColor="#252954" color="#E64F59" onPress={addReminder}></Icon.Button>
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
  reminderBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  tabContainer: {
    backgroundColor: "#252954",
    width: windowWidth,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  textInput: {
    backgroundColor: "black",
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 15
  }

});

export default Reminder