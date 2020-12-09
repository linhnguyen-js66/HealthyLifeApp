import React from 'react'
import { View, ViewStyle, Text, Image, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
import style from './style'
import AuthInput from '../../components/AuthInput'
import ButtonForm from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
const SignUpScreen = () => {
    const [email, setEmail] = React.useState('linhnguyenchi227@gmail.com')
    const [password, setPassword] = React.useState('123456')
    const [name, setName] = React.useState('Nguyễn Hà Linh')
    const [isLoaded,isLoading] = React.useState(false)

    //Name
    const getInputName = (text) => {
        setName(text)
    }
    // Email
    const getInputEmail = (text) => {
        setEmail(text)
    }
    //Password
    const getInputPwd = (text) => {
        setPassword(text)
    }
    //Register
    const registerUser = async () =>{
        if(name === '' && password === '' && email === ''){
            Alert.alert('Bạn chưa điền thông tin đăng ký')
        }
        else{
           isLoading(true)
           try{
               await auth().createUserWithEmailAndPassword(email,password)
               await auth().currentUser.updateProfile({
                   displayName: name
               })
               const uid = await auth().currentUser.uid;
               navigation.navigate('Infor',{
                   idUser:uid,
                   userName:name,
                   emailUser:email
               })
           }catch(error){
               console.log(error)
           }
        }
    } 
    const navigation = useNavigation()
    return (
        <ScrollView>
            <View style={{marginTop:64}}>
                <View style={style.head}>
                <Text style={style.header}>Xin chào!</Text>
                <View style={style.imageHeader}>
                    <Image source={require('../../Image/headerlogo2.png')}/> 
                </View>              
                </View>
                <Text style={style.textgray}>Đăng ký để tham gia</Text>
                <AuthInput title="Tên" value={name} handleClick={getInputName} />
                <AuthInput title="Email" value={email} handleClick={getInputEmail} />
                <AuthInput title="Mật khẩu" value={password} handleClick={getInputPwd} isPassword={true} />
                <ButtonForm title="Đăng ký" onPress={registerUser}/>
                <View style={style.linkSignup}>
                    <Text style={style.textthin}>Đã có tài khoản ?</Text>
                    <TouchableOpacity>
                        <Text style={style.bold}> Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
export default SignUpScreen