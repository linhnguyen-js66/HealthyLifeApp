import React, { useState } from 'react'
import { View, ViewStyle, Text, TouchableOpacity } from "react-native"
import style from './style'

const AddMeal = ({ item, startValue, addMeal }) => {
    let startValueTemp = startValue ? startValue : 0


    return (
        <TouchableOpacity style={style.button} onPress={() => {
            addMeal()
        }}>
            <Text style={style.add}>Thêm</Text>
        </TouchableOpacity>
    )
}
export default AddMeal