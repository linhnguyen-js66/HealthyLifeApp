import React, { useEffect, useState } from 'react'
import { View, ViewStyle, Text, Image, ScrollView, TouchableOpacity, TextInput, ImageBackground, Alert } from "react-native"
import style from './style'
import InputFood from '../../components/Inputfood'
import { Icon } from 'react-native-elements'
import AddMeal from '../../components/AddMeal'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
const Calender = ({ date, month }) => {
    return (
        <View style={style.header}>
            <Image style={style.image} source={require('../../Image/calender.jpg')} />
            <Text style={style.time}>Thời gian</Text>
            <View style={style.timedate}>
                <Text style={style.date}>{date}</Text>
                <Text style={style.month}>tháng {month}</Text>
            </View>
        </View>
    )
}
const RadioInputCart = ({ title, selected, onClick }) => {
    return (
        <View style={style.container}>
            {/* Value */}
            <Text style={selected ? style.radioValueTextSelected : style.radioValueTextUnSelected}>
                {title}
            </Text>
            {/* Touch Circle */}
            <TouchableOpacity
                style={[
                    style.circle,
                    {
                        borderColor: selected ? "green" : "gray",
                        backgroundColor: selected ? "green" : "white",
                    },
                ]}
                onPress={() => {
                    onClick(title)
                }}
            >
                {selected ? (
                    <Icon name="check" type="font-awesome" color="white" size={12} />
                ) : null}
            </TouchableOpacity>
        </View>
    )
}
const RenderItem = ({ data, remove }) => {
    const { detailMeal } = data
    const { meal, kcal } = detailMeal
    return (
        <View>
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 17, color: '#999999' }}>{meal}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 17, color: '#999999' }}>{kcal} Kcal</Text>
                </View>
                <TouchableOpacity onPress={remove}>
                    <Icon name="closecircleo" type="antdesign" color="#a6a6a6" size={20} />
                </TouchableOpacity>
            </View>
            <View style={style.line}></View>

        </View>
    )
}
const YourDailyScreen = () => {
    const [isRentDelivery, setIsRentDelivery] = useState(false)
    const ClickDone = () => {
        setIsRentDelivery(true)
      
    }
    const ClickNotDone = () => {
        setIsRentDelivery(false)
     
    }
    const navigation = useNavigation()
    const [meal, setMeal] = useState('')
    const [kcal, setKcal] = useState('')
    const [newItemMeal, setNewItemMeal] = useState([])
    const [refresh, setRefresh] = useState([])
    const [currentDate, setCurrentDate] = useState('')
    const [currentMonth, setCurrentMonth] = useState('')
    const [currentYear, setCurrentYear] = useState('')
    const getInputMeal = (text) => {
        setMeal(text)
    }
    const getInputKcal = (text) => {
        setKcal(text)
    }
    const uid = auth().currentUser.uid

    const onClickNewItemMeal = () => {
        getInputMeal()
        getInputKcal()
        setRefresh([])
        let newMeal = newItemMeal

        const findItem = newMeal.findIndex(item => item.detailMeal.meal == meal)
        if (meal !== '' && kcal !== '') {
            if (findItem < 0) {
                newMeal.push({
                    detailMeal: { meal: meal, kcal: kcal },
                    quantity: 1
                })
            }
            else {
                newMeal[findItem].quantity++
                Alert.alert('Đã thêm số lượng vào món ăn có sẵn')
            }
        }

        console.log(newMeal)
        setNewItemMeal(newMeal)
    }

    console.log('newItemMeal:', newItemMeal)

    //remove item 

    const onClickRemoveItem = (mealName) => {
        setRefresh([])
        let resultItem = newItemMeal
        resultItem = resultItem.filter(value => value.detailMeal.meal !== mealName)

        setNewItemMeal(resultItem)
    }
   
    const totalKcal = () => {
        let temp = 0
        newItemMeal.map((item) => {
            temp  += item.quantity * Number(item.detailMeal.kcal)
        })
        isRentDelivery ? temp -= 100 : temp
        return temp   
    }
    let total = totalKcal()
    
    //getDate and Month
    useEffect(() => {
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()
        setCurrentDate(date)
        setCurrentMonth(month)
        setCurrentYear(year)
    }, [])
    console.log(currentDate)
    console.log(currentMonth)
    //Save data for FireBase
    const [isLoading,setIsLoading] = useState(false)
    const SaveDataForFireBase = async () => {
         if(meal == '' && kcal == ''){
             setIsLoading(false)
             Alert.alert('Chưa điền thông tin')
         }
         else{
            setIsLoading(true)
            await firestore().collection('HistoryAte').doc().set({
                FoodEaten:newItemMeal,
                id: uid,
                time: {
                    date: currentDate,
                    month: currentMonth,
                    year: currentYear
                },
                total:total
            })
            Alert.alert('Lưu thành công')
            setNewItemMeal([]) 
         }
       
       }
    return (
        <ScrollView>
            <View>
                {/* header */}
                <Calender date={currentDate} month={currentMonth} />
                {/* inputFood */}
                <View>
                    <Text style={style.question}>Hôm nay bạn đã ăn những gì ?</Text>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <InputFood title="Món ăn" value={meal} handleInput={getInputMeal} />
                        <InputFood title="Kcal" value={kcal} handleInput={getInputKcal} />
                        <AddMeal
                            startValue={0}
                            addMeal={onClickNewItemMeal}
                        />
                    </View>
                </View>

                {
                    newItemMeal.map((item, index) => <RenderItem data={item} key={index} remove={() => onClickRemoveItem(item.detailMeal.meal)} />)
                }



                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <RadioInputCart title="Không luyện tập"
                        selected={!isRentDelivery}
                        onClick={ClickNotDone} />
                    {/* Spacing:16 */}
                    <View style={{ width: 16 }}></View>
                    <RadioInputCart title="Đã luyện tập"
                        selected={isRentDelivery}
                        onClick={ClickDone} />
                </View>
                <View style={{ flex: 1, alignSelf: 'flex-end', marginRight: 16 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Tổng: {totalKcal()} kCal</Text>
                </View>
                <TouchableOpacity style={style.complete} onPress={SaveDataForFireBase}>
                    <Text style={style.textcom}>Hoàn thành</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default YourDailyScreen