import React from 'react'
import { View, Text, Image, ScrollView } from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import style from './style'
const ListFood = ({ data }) => {
    const { FoodEaten } = data
    return (

        FoodEaten.map((val) => {
            const { detailMeal } = val
            const { meal, kcal } = detailMeal
            return <View style={style.containListFood}>

                <Text style={{ fontSize: 17, padding: 8, fontWeight: 'bold', alignSelf: 'center' }}>{meal}</Text>
                <Text style={{ fontSize: 17, padding: 8, color: 'white', alignSelf: 'center' }}>{kcal} kCal</Text>
                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 16, justifyContent: 'center' }}>
                    <Icon reverse name="check" type="font-awesome" color="white" size={10} reverseColor="green" />

                </View>

            </View>
        })


    )
}
const DetailHistoryScreen = ({ route }) => {
    const { item } = route.params
    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <LinearGradient colors={['#A762FE', '#F558F8']} style={style.headerGradient}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../Image/daubep.png')} style={style.imageLogo} />
                        <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold', padding: 16 }}>{item.total} kCal</Text>
                    </View>
                </LinearGradient>
                <ListFood data={item} />
            </View>
        </ScrollView>

    )
}
export default DetailHistoryScreen