import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from "react-native"
import style from './style'
import { Icon } from 'react-native-elements'
import LinearGradient from "react-native-linear-gradient"
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const RenderMyItem = ({ data, navigation }) => {
    const { time, total } = data
    const { date, month, year } = time
    return (
        <View style={style.container}>
            <View style={style.item}>
                <Text style={style.time}>Ngày {date}/{month}/{year}</Text>
                <Text style={style.kcal}>Bạn đã ăn: {total} Kcal</Text>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-end', marginRight: 16 }}
                     onPress={navigation}
                >
                    <Text style={style.detail}>Chi tiết</Text>
                    <Icon name="right" type="antdesign" size={17} marginTop={16} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export const HistoryScreen = () => {
    const navigation = useNavigation()
    const [History, setHistory] = useState([])
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
    console.log(userInformation)
    useEffect(() => { getUserInformationFromFirebase() }, [])
    //HistoryAte
    const getDataHistoryFromFirebase = async () => {
        const newListHistory = []
        const getDataHistory = await firestore().collection('HistoryAte').get()
        for (let item of getDataHistory.docs) {
            newListHistory.push(item.data())
        }
        setHistory(newListHistory)
    }

    useEffect(() => { getDataHistoryFromFirebase() }, [])
    console.log(History)
    return (
        <ScrollView>
            <View>

                <View style={{ flex: 1, height: 250 }}>
                    <LinearGradient
                        colors={["rgba(100,100,100,0.3)", "rgba(50,50,50,0.5)", "rgba(0,0,0,0.90)"]}
                        style={style.background}
                    />
                    <Image source={require('../../Image/meal.jpg')} style={{
                        flex: 1,
                        opacity: 0.6,
                        width: undefined,
                        height: undefined,
                        resizeMode: 'cover'
                    }} />
                    <View style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: 100
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>LỊCH SỬ ĂN UỐNG CỦA BẠN</Text>
                        <Icon name="book" type="antdesign" color="white" size={30} />
                    </View>
                </View>
                <View>
                    {History.map((item) => {
                        if (currentUserInfo.idUser == item.id) {
                            return <RenderMyItem key={item.time.date} data={item} navigation={() => navigation.navigate('detail',{
                                item
                            })} />
                        }
                    }
                    )}
                </View>

            </View>
        </ScrollView>
    )
}
