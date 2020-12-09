import React, { useEffect, useState } from 'react'
import { View, ViewStyle, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native"
import style from './style'
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { FlatList } from 'react-native-gesture-handler';

const FoodItem = ({data}) => {
    const{name,description,image} = data
    const {fat,protein,chatxo,kcal} = description 
    return (
        <View style={style.foodInfo}>
            <Image style={style.imagefood} source={{uri:image}} />
            <View style={style.detail}>
            <Text style={style.name}>{name}</Text>
                <Text style={style.nutrition}>Chất béo: {fat} g</Text>
                <Text style={style.nutrition}>Protein: {protein} g</Text>
                {(chatxo == null) ? null : <Text style={style.nutrition}>Chất xơ: {chatxo} g</Text>}
                <Text style={style.nutrition}>kCal: {kcal}</Text>
            </View>
        </View>
    )
}

const Gymnastics = () => {
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['rgb(216,216,216)', 'rgb(216,216,216)', '#1d1d1d']}
                style={{
                    flex: 1,
                    height: 200,
                    marginHorizontal: 16,
                    borderRadius: 20
                }}
            >

                <Image style={style.imagegym} source={require('../../Image/run.jpg')} />

                <View style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: 64
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>TẬP THỂ DỤC</Text>
                    <Text style={{
                        fontSize: 17,
                        color: 'white'
                    }}>CHẠY BỘ</Text>
                </View>
            </LinearGradient>
        </View>
    )
}
const SuggestDailyScreen = () => {
    const [meal, setMeal] = useState([])
    const [timeEatMode, setTimeEatMode] = useState([])
    const [weightMode, setWeightMode] = useState([])
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
    //Data timeeatmode
    const getTimeEatMode = async () => {
        const arrTimeEatMode = []
        const getTimeEatMode = await firestore().collection('TimeEatMode').get()
        for (let item of getTimeEatMode.docs) {
            arrTimeEatMode.push(item.data())
        }
        setTimeEatMode(arrTimeEatMode)
    }
    console.log(timeEatMode)
    //Data WeightMode
    const getWeightMode = async () => {
        const arrWeightMode = []
        const getWeightMode = await firestore().collection('WeightMode').get()
        for (let data of getWeightMode.docs) {
            arrWeightMode.push(data.data())
        }
        setWeightMode(arrWeightMode)
    }
    console.log(weightMode)
    useEffect(() => { getTimeEatMode() }, [])

    useEffect(() => { getWeightMode() }, [])
    // 
    const getDataMeal = async () => {
        const listMeal = []
        const getDataMeal = await firestore().collection('Meal').get()
        for (let item of getDataMeal.docs) {
            listMeal.push(item.data())
        }
        setMeal(listMeal)
    }
    // console.log(meal)

    useEffect(() => { getDataMeal() }, [])
    return (
        <ScrollView>
            {/* header */}
            <View style={{ marginTop: 32 }}>
                <LinearGradient colors={['#A762FE', '#F558F8']} style={style.headerGradient}>
                    <View style={style.container}>
                        <Text style={style.title}>HÔM NAY BẠN ĂN GÌ ?</Text>
                        {/* description */}
                        <View style={style.flexrow}>
                            <View>
                                <Text style={style.textnote}>Nhớ kỹ bạn chỉ được nạp:</Text>
                                {userInformation.map((item) => {
                                    const { idUser, Kcal } = item
                                    if (uid == idUser) {
                                        return <Text style={style.kcal}>{Kcal} Kcal/ngày</Text>
                                    }
                                })}
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 32 }}>
                                <Image style={style.imagerun} source={require('../../Image/running.png')} />
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            {/* SectionSuggest */}
            <View>
                {
                    timeEatMode.map((item) => {
                        let filterMeals = meal.filter(mealDetail => mealDetail.idTimeEatMode === item.id && mealDetail.idWeightMode === currentUserInfo.idSelectMode)
                        // return user.idSelectMode == x.id && y.idTimeEatMode == item.id && user.idSelectMode == y.idWeightMode
                        let randomIndex = Math.floor(Math.random() * (filterMeals.length-3))
                        console.log(randomIndex)
                        let sliceFilterMeal = filterMeals.slice(randomIndex,randomIndex+3)
                        console.log("slice",sliceFilterMeal)
                        return <View  key={item.id} style={{flex:1}}>
                            <Text style={style.section}>{item.name}</Text>
                            {/* <FoodItem name={y.name} fat={y.description.fat}
                                protein={y.description.protein}
                                chatxo={y.description.chatxo}
                                kcal={y.description.kcal}
                            /> */}
                            <FlatList
                            data={sliceFilterMeal}
                            keyExtractor={meal=>item.id.toString()+"."+ meal.id.toString()}
                            renderItem={({item})=><FoodItem data={item}/>}
                            />
                        </View>
                    })
                }

                {/* <Text style={style.section}>Bữa sáng</Text> */}
                {/* {
                    userInformation.map((item) => {
                        if (uid == item.idUser) {
                            for (let x of weightMode) {
                                for (let y of meal) {
                                    if (item.idSelectMode == x.id && y.idTimeEatMode == 1) {
                                      return <View> 
                                      <FoodItem name={y.name} fat={y.description.fat} 
                                      protein={y.description.protein}
                                      chatxo={y.description.chatxo} 
                                      kcal={y.description.kcal}
                                      /> 
                                      </View>
                                    
                                    }
                                }
                            }
                        }
                    })
                }
                <FoodItem /> */}
                {/* <Text style={style.section}>Bữa trưa</Text>
                <FoodItem />
                <FoodItem />
                <Text style={style.section}>Bữa tối</Text>
                <FoodItem /> */}
                <Text style={[style.section, { marginBottom: 16 }]}>Các bài tập</Text>
                <Gymnastics />
            </View>
        </ScrollView>
    )
}
export default SuggestDailyScreen