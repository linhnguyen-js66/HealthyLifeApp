import React from 'react'
import { View, ViewStyle, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native"
import style from './style'
import LinearGradient from 'react-native-linear-gradient';
import AuthInput from '../../components/AuthInput'
import ButtonForm from '../../components/Button'
import ButtonType from '../../components/ButtonType';
const ForgotPasswordScreen = () => {
    const [email, setEmail] = React.useState('')
    const getInputEmail = (text) => {
        setEmail(text)
    }
    return (
        <ScrollView>
            <View>
                <LinearGradient colors={['#A762FE', '#F558F8']} style={style.linearGradient}>
                    <View style={style.containerImage} >
                    <Text style={style.text}>Nhập vào email của bạn</Text>
                    <Text style={style.description}>Địa chỉ email sẽ giúp bạn lấy lại mật khẩu. 
                    Hãy vào đó để xác nhận thay đổi nhé</Text>
                    </View>
                    <AuthInput title='Email'value={email} handleClick={getInputEmail} />
                    <ButtonForm title="Gửi mã"/>
                    <View style={{marginBottom:32}}></View>
                </LinearGradient>

            </View>
        </ScrollView>
    )
}
export default ForgotPasswordScreen