import {StyleSheet} from 'react-native'
export default StyleSheet.create({
  container:{
      marginHorizontal:16,
      marginTop:16
  },
  headerGradient:{
      marginHorizontal:16,
      height:146,
      borderRadius:20
  },
  title:{
      fontSize:24,
      fontWeight:'bold',
      color:'white'
  },
  textnote:{
      marginTop:16,
      fontSize:17,
      color:'white'
  },
  kcal:{
      fontSize:17,
      color:'white'
  },
  flexrow:{
      flexDirection:'row'
  },
  imagerun:{
      height:46,
      width:46,
      marginTop:16,
      flex:1
  },
  foodInfo:{
      height:116,
      borderRadius:20,
      backgroundColor:'#F0F0F0',
      marginHorizontal:16,
      marginTop:16,
      flexDirection:'row',
      elevation:4
  },
  imagefood:{
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    height:116,
    width:116,
    
  },
  section:{
      fontSize:17,
      fontWeight:'bold',
      marginLeft:16,
      marginTop:16
  },
  detail:{
    marginTop:'auto',
    marginBottom:'auto',
    marginHorizontal:16,
    justifyContent:'flex-end'
  },
  nutrition:{
    fontSize:15
  },
  name:{
    fontSize:17,
    fontWeight:'bold'
  },
  imagegym:{
     
      flex:1,
      opacity:0.6,
      borderRadius:20,
      width: undefined,
      height: undefined,
      resizeMode: 'cover'
  }
})