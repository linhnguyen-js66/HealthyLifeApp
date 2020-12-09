import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    image: {
        flex: 1,
        opacity: 0.7,
        borderRadius: 20,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },
    header: {
        flex: 1,
        height: 300,
        marginHorizontal: 16,
        borderRadius: 20,
        marginTop:64,
       
    },
    time:{
        position:'absolute',
        fontSize:17,
        marginLeft:16,
        marginTop:16,
        fontWeight:'bold'
    },
    timedate:{
        position:'absolute',
        alignSelf:'center',
        alignItems:'center',
        marginTop:60,
        marginBottom:100,
    },
    date:{
        fontSize:100,
        fontWeight:'bold',
        color:'white'
    },
    month:{
        fontWeight:'bold',
        fontSize:17
    },
    question:{
      marginLeft:16,
      marginTop:16,
      fontSize:20,
      fontWeight:'bold'
    },
    button:{
        backgroundColor:'#9E9CFF',
        marginRight:16,
        borderRadius:10,
        width:70
    },
    add:{
        flex:1,
        alignSelf:'center',
        marginTop:5,
        fontSize:17,
        color:'white'
    },
    line:{
        flex:1,
        borderBottomWidth:0.5,
        marginLeft:16,
        marginTop:16
    },
    //ratio
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal:12,
        flex: 1,
        borderColor:"gray",
        marginHorizontal:16,
        marginTop:32,
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
      radioValueTextSelected: {
        fontSize: 15,
        color: "rgb(100,100,100)",
        fontWeight: "normal",
      },
      radioValueTextUnSelected: {
        fontSize: 15,
        color: "rgb(100,100,100)",
        fontWeight: "normal",
      },
      complete:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#9E9CFF',
        height:50,
        borderRadius:20,
        marginHorizontal:16,
        marginTop:16
      },
      //buttoncomplete
      textcom:{
          fontSize:17,
          color:'white'
      }
})