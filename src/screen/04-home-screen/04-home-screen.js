import React, { useEffect, useState } from 'react'
import { View, ViewStyle, Text, Image, ScrollView, TouchableOpacity, TextInput, Button } from "react-native"
import style from './style'
import LinearGradient from 'react-native-linear-gradient';
import Avatar from '../../components/AvatarUser'
import { Icon } from 'react-native-elements'
import Chart from '../../components/Chart'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
const InformationRender = ({ type, measurements, index }) => {
    return (
        <View style={[{ flex: 1, marginLeft: 16}, index == 3 && { marginRight: 16 }]} index={index}>
            <LinearGradient colors={['#A762FE', '#F558F8']}
                style={style.linearGradient} >
                <Text style={style.measurements}>{measurements}</Text>
            </LinearGradient>
            <Text style={style.inforitem}>{type}</Text>
        </View>
    )
}

const EmailandNameUser = ({ name, email, onDisplay }) => {
    return (
        <View style={style.infogroup}>
            <TouchableOpacity onPress={onDisplay}>
                <Text style={style.name}>{name}</Text>
                <Text style={style.email}>{email}</Text>
            </TouchableOpacity>
        </View>
    )
}
const HomeScreen = () => {
    const navigation = useNavigation()
    const [userInformation, getUserInformation] = useState([])
    const [currentUserInfo, getCurrentUserInfo] = useState()
    const uid = auth().currentUser.uid
    console.log(uid)
    //userInformation
    const getUserInformationFromFirebase = async () => {
        const arrContainDataUserInfo = []
        const getDataInfoFromFirebase = await firestore().collection('UserInformation').get()
        for (let data of getDataInfoFromFirebase.docs) {
            arrContainDataUserInfo.push(data.data())
        }
        getUserInformation(arrContainDataUserInfo)
        const currentUserData = arrContainDataUserInfo.filter(userInfo => userInfo.idUser === uid)[0]
        getCurrentUserInfo(currentUserData)
    }

    useEffect(() => { getUserInformationFromFirebase() }, [])
    //History
    const [History, setHistory] = useState([])
    const getDataHistoryFromFirebase = async () => {
        const newListHistory = []
        const getDataHistory = await firestore().collection('HistoryAte').get()
        for (let item of getDataHistory.docs) {
            newListHistory.push(item.data())
        }
        setHistory(newListHistory)
    }
    useEffect(() => { getDataHistoryFromFirebase() }, [])
    const [date,setDate] = useState([])
    const [kcal,setKcal] = useState([])
    const pushKcalInArray = () => {
        const arrKcal = []
        const arrDate = []
        History.map((item)=>{
            if(currentUserInfo.idUser == item.id){
               arrKcal.push(item.total)
               arrDate.push(item.time.date.toString())
               arrDate.sort(function(a, b){return a - b})
            }
        })

        setDate(arrDate)
        setKcal(arrKcal)
    }

    useEffect(()=>{pushKcalInArray()},[History])
    console.log(date)
    console.log(kcal)
    //
    const [weightMode,setWeightMode] = useState([])
    const getWeightMode = async () => {
        const arrWeightMode = []
        const getWeightMode = await firestore().collection('WeightMode').get()
        for(let data of getWeightMode.docs){
            arrWeightMode.push(data.data())
        }
        setWeightMode(arrWeightMode)
    }
    console.log(weightMode)
    useEffect(()=>{getWeightMode()},[])
    return (
        <ScrollView>
            {/* emailname */}
            <LinearGradient colors={['#A762FE', '#F558F8']} style={style.headerGradient}>
                <View style={style.cover}>
                    <Avatar />
                    <View>
                        {userInformation.map((item) => {
                            const { name, email, idUser } = item
                            if (uid == idUser) {
                                return <EmailandNameUser key={idUser} name={name} email={email} onDisplay={() => navigation.navigate('account')} />
                            }
                        })}

                        <TouchableOpacity style={style.logout} onPress={() => navigation.navigate('Auth')}>
                            <Text style={style.textlogout}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            <View style={{ flex: 1 }}>
                {/* thongtin */}
                <View style={{ flexDirection: 'row' }}>
                    <Icon type="evilicon" name="user" size={30} marginTop={16} marginLeft={16} />
                    <Text style={style.texthead}>Thông tin</Text>
                </View>
                <View style={style.square}>
                    {userInformation.map((val)=>{
                        const {idUser,weight,height} = val
                        if(uid == idUser){
                           const heightMet = Number(height)/100
                           const caculateBMI = Number(weight)/(heightMet*heightMet)
                           const BMI = Math.round(caculateBMI * 100)/100
                           return <View style={{flex:1, flexDirection:'row'}}>
                               <InformationRender type="Cân" measurements={weight+'KG'}/>
                               <InformationRender type="Cao" measurements={height+'CM'}/>
                               <InformationRender type="BMI" measurements={BMI} index={3} />
                           </View>
                        }
                    })}
                </View>
                {/* chedo */}
                <View style={style.regime}>
                    <Icon type='antdesign' name="circledowno" size={25} marginTop={16} marginLeft={16} />
                    <Text style={style.texthead}>Chế độ</Text>
                    
                        {userInformation.map((item)=>{
                            const {idWeightMode,idUser,Kcal} = item
                            if(idUser == uid){
                                for(let x of weightMode){
                                    if(x.id == idWeightMode){
                                        return<View style={style.inforRegime}>
                                        <Text style={style.type}>{x.name} cân</Text>
                                        <Text style={style.kcal}>{Kcal} Kcal/ngày</Text>
                                       </View>
                                    }
                                }
                            }
                        })}
                        
                </View>
                {/* history */}
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon type="antdesign" name="clockcircleo" size={25} marginTop={16} marginLeft={16} />
                        <Text style={style.texthead}>Lịch sử</Text>
                        {/* reviewhistory */}
                        <TouchableOpacity style={style.watchmore} onPress={() => navigation.navigate('history')}>
                            <Text>Xem thêm</Text>
                            <Icon name="right" type="antdesign" size={15} marginTop={3} />
                        </TouchableOpacity>
                  
                    </View>
                    <View style={{ flex: 1 }}>
                        <Chart dataKcal={kcal} label={date}/>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
export default HomeScreen