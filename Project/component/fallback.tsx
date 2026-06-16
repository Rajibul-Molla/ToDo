import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import Component from 'react-native-paper/lib/typescript/components/List/ListItem'

const Fallback: React.FC = () => {
  return (
    <View>
      <Image source={require('../assets/images/fallbackui.jpg')} 
      style={{

        height:300,
        width:300
      }}
      />
    <Text style={{marginTop:-60,marginLeft:70}}>Start adding your ToDo's</Text>

    </View>
  )
}

export default Fallback;

