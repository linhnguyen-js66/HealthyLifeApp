import {StyleSheet} from 'react-native'
export default StyleSheet.create({
    ROOT:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
    },
    image:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginTop:84
    },
    text:{
      marginTop:32,
      marginLeft:32,
      fontSize:17
    },
    textgray:{
        fontSize:17,
        color:'#666666',
        marginLeft:32,
    },
    linkSignup:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:64,
        flexDirection:'row',
        marginBottom:64
      },
      bold:{
        fontWeight:'bold',
        fontSize:17
      },
      textthin:{
          fontSize:17,
          color:'#666666'
      },

      header: {
        fontSize: 40,
        paddingVertical: 16,
        fontWeight: "bold",
        color:'black',
        marginLeft:32
      },
      head:{
          flexDirection:'row',
          flex:1,
      },
      imageHeader:{
          flex:1,
          justifyContent:'flex-end',
          alignItems:'flex-end',
          marginHorizontal:32,
          marginTop:30
      },
})