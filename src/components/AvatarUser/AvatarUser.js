import React from 'react'
import { View, ViewStyle, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native"
import style from './style'

const Avatar = ({uri}) => {
    return(
        
           <Image style={style.Avatar} source={require('../../Image/linh2.jpg')}/>
        
    )
}
export default Avatar