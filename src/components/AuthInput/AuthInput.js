import React from 'react'
import { ViewStyle, TextStyle, View,Text, TextInput } from "react-native"
import style from './style'
const AuthInput = ({ title, value, handleClick, isPassword }) => {
    const [inputValue, setInputValue] = React.useState("")
    const [IsFocusInput, SetIsFocusInPut] = React.useState(false)
    return (
        <View style={{marginTop:32}}>
            <Text style={style.text}>{title}</Text>
                <TextInput
                    value={value}
                    onChangeText={handleClick}
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
                    secureTextEntry={isPassword}
                />
        </View>
    )
}
export default AuthInput