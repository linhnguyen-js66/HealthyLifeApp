import React, { useState } from 'react'
import { View, ViewStyle, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native"
import style from './style'
import AuthInput from '../../components/AuthInput'
import ButtonForm from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
export const LogInScreen = () => {
    const [email, setEmail] = React.useState('linhnguyenchi227@gmail.com')
    const [password, setPassword] = React.useState('123456')
    const [isLoaded,isLoading] = React.useState(false)
    //email
    const getInputEmail = (text) => {
        setEmail(text)
    }
    //password
    const getInputPwd = (text) => {
        setPassword(text)
    }
    const navigation = useNavigation()
    //Login
    const SignIn = async () => {
        if(email === '' && email === ''){
            Alert.alert('Bạn chưa điền thông tin đăng nhập')
        }
        else{
            isLoading(true)
            try{
               await auth().signInWithEmailAndPassword(email,password)
               await auth().onAuthStateChanged((user)=>{
                   console.log(user)
                   if(user !== null){
                       navigation.navigate('Home')
                   }
               })
            }catch(error){
              console.log(error)
            }
        }
    }
    return (
        <ScrollView>                
            <View>
                <View style={style.image}> 
                    <Image style={{position:'absolute'}} source={require('../../Image/Header2.png')}/>
                    <Image style={style.logoChild} source={require('../../Image/LOGO2.png')}/> 
                </View>
                <AuthInput title="Email" value={email} handleClick={getInputEmail}/>
                <AuthInput title="Mật khẩu" value={password} handleClick={getInputPwd} isPassword={true}/>
                <TouchableOpacity onPress={()=> navigation.navigate('Forgot')}>
                    <Text style={style.text}>Quên mật khẩu ?</Text>
                </TouchableOpacity>
                
                <ButtonForm title="Đăng nhập"  onPress={SignIn}/>
                <View style={style.linkSignup}>
                   <Text style={style.textgray}>Chưa có tài khoản ?</Text>
                   <TouchableOpacity>
                       <Text style={style.bold} onPress={()=>navigation.navigate('Signup')}> Hãy đăng ký</Text>
                   </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
