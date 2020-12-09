import React from 'react'
import { View, ViewStyle, Text, TextInput, TouchableOpacity } from "react-native"
import style from './style'

const InforInput = ({ title, value, changeText }) => {
    const [inputValue, setInputValue] = React.useState("")
    const [IsFocusInput, SetIsFocusInPut] = React.useState(false)
    return (
        <View style={style.container}>
            <Text style={style.title}>{title}</Text>
            <View style={{flex:1}}>
                <TextInput
                    value={value}
                    onChangeText={changeText}
                    onFocus={() => SetIsFocusInPut(true)}
                    onEndEditing={() => SetIsFocusInPut(false)}
                    style={{
                        color: "black",
                        fontSize: 17,
                        borderBottomWidth: 1,
                        paddingBottom: 0,
                        paddingTop: 4,
                        borderColor: IsFocusInput || inputValue !== "" ? "gray" : "#cccccc",
                        flex:1,
                        marginHorizontal:32
                    }}
                />
            </View>
        </View>
    )
}
export default InforInput