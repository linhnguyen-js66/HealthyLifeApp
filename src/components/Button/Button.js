import React from 'react'
import { View, ViewStyle, Text, Button, TouchableOpacity } from "react-native"
import style from './style'
const ButtonForm= ({ title, onPress }) => {
    return (
  
          <TouchableOpacity style={style.ROOT} onPress={onPress}>
                   <Text style={style.text}>{title}</Text>
          </TouchableOpacity>


    )
}
export default ButtonForm