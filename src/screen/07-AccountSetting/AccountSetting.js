import React,{useState,useEffect} from 'react'
import { View, Text,ScrollView, TouchableOpacity,Alert} from "react-native"
import style from './style'
import InforInput from '../../components/InforInput'
import ButtonType from '../../components/ButtonType'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Calender from '../../components/Calender'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
const CheckGender = ({ title, onclick, selected,caculate}) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
                style={[
                    style.circle,
                    {
                        borderColor: selected ? "#9E9CFF" : "white",
                        backgroundColor: selected ? "#9E9CFF" : "white",
                        marginTop: 4
                    },
                ]}
                onPress={() => {
                    onclick(title),
                    caculate
                }}
            >
                {selected ? (
                    <Icon name="check" type="font-awesome" color="white" size={12} />
                ) : null}
            </TouchableOpacity>
            <Text style={{ fontSize: 17, color: 'black', marginHorizontal: 16 }}>{title}</Text>
        </View>
    )
}
//CheckMode
const CheckBoxMode = ({ title, checked, onclick }) => {
    return (
        <View >
            <TouchableOpacity onPress={onclick} style={{ flexDirection: 'row' }}>
                <Icon reverse name='check' type='fontisto'
                    color={(checked) ? '#9E9CFF' : 'white'}
                    reverseColor={(checked) ? 'white' : 'white'}
                    size={7}
                />
                <Text style={{ fontSize: 17, color: 'black', marginTop: 4 }}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const AccountSettingScreen = () => {
    const navigation = useNavigation()
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [age, setAge] = useState('')
    const [time, setTime] = useState('')
    const [weigthWant,setWeightWant]= useState('')
    const [selectGender, setGender] = useState(true)
 
    //Render Select Mode from firebase
    const [dataMode, addFromDataMode] = useState([])
    const SelectMode = async () => {
        const arrContainDataMode = []
        const getDataModeFromSelectMode = await firestore().collection('SelectMode').get()
        for (let data of getDataModeFromSelectMode.docs) {
            arrContainDataMode.push(data.data())
        }
        addFromDataMode(arrContainDataMode)
    }

    console.log(dataMode)
    const [selectMode, setSelectMode] = useState(dataMode)
    console.log(selectMode)
    //Render WeightMode from firebase
    const [weightMode, addFromWeightMode] = useState([])
    const WeightMode = async () => {
        const arrContainWeightModeData = []
        const getWeightModeFromFirebase = await firestore().collection('WeightMode').get()
        for (let item of getWeightModeFromFirebase.docs) {
            arrContainWeightModeData.push(item.data())
        }
        addFromWeightMode(arrContainWeightModeData)
    }
    console.log(weightMode)
    useEffect(() => { SelectMode() }, [])
    useEffect(() => { WeightMode() }, [])
    const [selectWeightMode, setSelectWeightMode] = useState(weightMode)
    console.log(selectWeightMode)
    //add Information of user
    const getInputWeight = (text) => {
        setWeight(text)
    }
    const getInputHeight = (text) => {
        setHeight(text)
    }
    const getInputAge = (text) => {
        setAge(text)
    }
    const getInputTime = (text) => {
        setTime(text)
    }
    const getInputWeightWant = (text) => {
        setWeightWant(text)
    }
    const clickSelectedFeMale = () => {
        setGender(true)
    }
    const clickSelectedMale = () => {
        setGender(false)
    }
    //route informationUser from SignUp Screen
 
    //caculate
    const [caculateofKcal,setCaculateofKcal] = useState(0)
    const caculateKcal = () => {
        if(selectGender == false){
          const KcalForMale = (13.397*Number(weight))+(4.799*Number(height))-(5.677*Number(age))+88.362
          const ceilKcalForMale = Math.ceil(KcalForMale)
          setCaculateofKcal(ceilKcalForMale)
        }
        else if(selectGender == true){
          const KcalForFemale = (9.247*Number(weight))+(3.098*Number(height))-(4.330*Number(age))+447.593
          const ceilKcalForFemale = Math.ceil(KcalForFemale)
          setCaculateofKcal(ceilKcalForFemale)
        }
    }
    console.log(caculateofKcal)
    //caculate KcalEveryDay 
    const [Kcal,setKcal] = useState(0)
    const caculateEvery = () => {
        const baseTimeandKg = 7000*Number(weigthWant)/(Number(time)*30)
        if(selectWeightMode == 1){
           switch(selectMode){
               case 1:
               const Kcal1 = caculateofKcal*1.2 - baseTimeandKg
               return setKcal(Math.ceil(Kcal1))
               break;
               case 2:
                const Kcal2 = caculateofKcal*1.375 - baseTimeandKg
                return setKcal(Math.ceil(Kcal2))
                break;
               case 3:
                const Kcal3 = caculateofKcal*1.55 - baseTimeandKg
               return setKcal(Math.ceil(Kcal3))
               break;
               case 4:
                const Kcal4 = caculateofKcal*1.725 - baseTimeandKg
               return setKcal(Math.ceil(Kcal4))
               break;
               case 5:
                const Kcal5 = caculateofKcal*1.9 - baseTimeandKg
               return setKcal(Math.ceil(Kcal5))
               break;
               default:
                   console.log("error")
           }
        }
        else if(selectWeightMode == 2){
            switch(selectMode){
                case 1:
                const Kcal1 = caculateofKcal*1.2 + baseTimeandKg
                return setKcal(Math.ceil(Kcal1))
                break;
                case 2:
                 const Kcal2 = caculateofKcal*1.375 + baseTimeandKg
                 return setKcal(Math.ceil(Kcal2))
                 break;
                case 3:
                 const Kcal3 = caculateofKcal*1.55 + baseTimeandKg
                return setKcal(Math.ceil(Kcal3))
                break;
                case 4:
                 const Kcal4 = caculateofKcal*1.725 + baseTimeandKg
                return setKcal(Math.ceil(Kcal4))
                break;
                case 5:
                 const Kcal5 = caculateofKcal*1.9 + baseTimeandKg
                return setKcal(Math.ceil(Kcal5))
                break;
                default:
                    console.log("error")
            }
        }
        else if(selectWeightMode == 3){
            switch(selectMode){
                case 1:
                const Kcal1 = caculateofKcal*1.2 
                return setKcal(Math.ceil(Kcal1))
                break;
                case 2:
                 const Kcal2 = caculateofKcal*1.375
                 return setKcal(Math.ceil(Kcal2))
                 break;
                case 3:
                 const Kcal3 = caculateofKcal*1.55
                return setKcal(Math.ceil(Kcal3))
                break;
                case 4:
                 const Kcal4 = caculateofKcal*1.725
                return setKcal(Math.ceil(Kcal4))
                break;
                case 5:
                 const Kcal5 = caculateofKcal*1.9
                return setKcal(Math.ceil(Kcal5))
                break;
                default:
                    console.log("error")
            }
        }
    }
   //update
   const SaveDataWithFireBase = async () => {
    try {
        const uid = await auth().currentUser.uid
        
        await firestore().collection('UserInformation').doc(uid).update({
            age: age,
            gender: selectGender,
            idSelectMode: selectMode,
            idWeightMode: selectWeightMode,
            time: time,
            weight:weight,
            height:height,
            Kcal:Kcal,
            weightWant:weigthWant
        })
        Alert.alert('Đăng kí thành công')
      
    } catch (error) {
        console.log(error)
    }
}
    console.log(Kcal)
    return(
        <ScrollView>
        <View>
            <Text style={{marginLeft:32,fontSize:24,fontWeight:'bold',marginTop:32}}>Cập nhật tài khoản</Text>
            <InforInput title='Cân nặng' changeText={getInputWeight} value={weight} />
            <InforInput title='Chiều cao' changeText={getInputHeight} value={height} />
            <InforInput title='Tuổi' changeText={getInputAge} value={age} />
            {/* gender */}
            <View style={{ flexDirection: 'row', marginHorizontal: 32, marginTop: 32 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Giới tính:</Text>
                <View style={{ flexDirection: 'row', marginLeft: 32 }}>
                    <CheckGender title="Nữ" selected={selectGender} onclick={()=>{clickSelectedFeMale(),caculateKcal()}} />
                    <CheckGender title="Nam" selected={!selectGender} onclick={()=>{clickSelectedMale(),caculateKcal()}} />
                </View>
            </View>
            {/* BRM */}
            <View style={{ marginTop:32, alignSelf: 'center' }}>
                {dataMode.map(({ id, name }) => {
                    return <CheckBoxMode key={id} title={name} checked={id == selectMode} onclick={() => setSelectMode(id)} />
                })}
            </View>
            {/* Calender */}
            <InforInput title="Số Kg cần giảm/tăng" changeText={getInputWeightWant} value={weigthWant}/>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "center",marginVertical:16}}>
                <Text style={{ marginTop:32, marginLeft:32, fontSize: 17,fontWeight:'bold'}}>Thời gian</Text>
                <Calender title="Tháng" value={time} changeText={getInputTime} />
            </View>
            <View style={style.buttoncontainer}>
                {weightMode.map((item) => {
                    const { id, name } = item
                    return <ButtonType key={id} title={name} index={item.id} handleClick={() => setSelectWeightMode(id)} onClick={caculateEvery} />
                })}

            </View>
            <TouchableOpacity style={style.complete} onPress={SaveDataWithFireBase} >
                <Icon name="check-circle" type="feather" size={17} />
                <Text style={style.textcom}>Xác nhận</Text>
                
            </TouchableOpacity>
        </View>
    </ScrollView>
    )
}
export default AccountSettingScreen