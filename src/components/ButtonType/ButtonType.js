import React from 'react'
import { View, ViewStyle, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import style from './style'

const ButtonType = ({ title, handleClick, index, onClick}) => {
    return (
        <TouchableOpacity onPress={()=>{
            handleClick(),
            onClick()
        }}
            style={[style.buttongroup,
            index == 3 && { marginRight: 32 },
            index == 1 && { marginLeft: 32 }]}>
            <Text style={style.text}>{title}</Text>
        </TouchableOpacity>

    )
}
export default ButtonType