import {StyleSheet} from 'react-native'
import { Dimensions } from 'react-native'
export default StyleSheet.create({
    headerGradient:{
        height:160
    },
    imageLogo:{
        width:150,
        height:undefined,
        resizeMode: 'cover',
        flex:1
    },
    containListFood:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#FEBE28',
        marginHorizontal:16,
        borderRadius:5,
        height:50,
        elevation:10,
        justifyContent:'center',
        marginVertical:16
    }
})