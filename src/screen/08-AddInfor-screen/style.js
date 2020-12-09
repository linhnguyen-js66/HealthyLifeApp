import {StyleSheet} from 'react-native'
import SignUpScreen from '../02-signup-screen'
export default StyleSheet.create({
    image:{
        flex:1,
        alignItems:'center',
    },
    logoChild:{
        marginTop:32
    },
    index:{
     marginTop:32,
     fontWeight:'bold',
     fontSize:17,
     marginLeft:32
    },
    buttoncontainer:{
    flex:1,
    flexDirection:"row",
    justifyContent:'center',
    marginBottom:32
    },
    circle: {
        width: 19,
        height: 19,
        borderRadius: 19,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
      },
      complete:{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          marginBottom:32,
          flexDirection:'row'
      },
      textcom:{
          fontSize:17,
          alignSelf:'center',
          marginLeft:4,
          fontWeight:'bold'
      }
})