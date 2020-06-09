import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const SignUpStyles = {

  headerText: {
    position: 'absolute',
    fontSize: 35,
    fontWeight: 'bold',
    top: 50,
    alignItems: 'center'
  },
 
  // container:{
  //   flex:1
  // },
  modal:{
    position: 'absolute',
    width: width - 55,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 24,
    top: 500,
  },

  submit:{

        position: 'absolute',
        width: width - 55,
        height: 45,
        borderRadius: 24,
        top: 590,
        alignItems: 'center',
  },
  scrollView: {
   // flexGrow: 1,
    //backgroundColor:'#f094',
    
    //flex:1,
   // marginBottom:50, 
     //paddingBottom:120
   // height:'100%',
    //alignSelf:'stretch'

    // position:'absolute',
    // left:0,
    // right:0,
    // paddingBottom: 200
    // paddingLeft:20,
    // paddingRight:20,
    // top:0,
    // bottom:0
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainer:{
    flex: 1,
    backgroundColor: '#f09874',
    alignItems: 'center',
    justifyContent: 'center',
  },

  usernameInput: {
    position: 'absolute',
    width: width - 55,
    height: 80,
    backgroundColor: 'white',
    top:110,
    borderRadius: 24,
    
  },


  emailInput: {
    position: 'absolute',
    width: width - 55,
    height: 80,
    backgroundColor: 'white',
    top: 320,
    borderRadius: 24,
  
    color: 'black',
    
  },

  passwordInput: {
    position: 'absolute',
    width: width - 55,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 24,
    top: 390,
   
    

  },

  passwordConfirmInput: {
    position: 'absolute',
    width: width - 55,
    height: 80,
    backgroundColor: 'white',
    top: 480,
    borderRadius: 24,
    

  },

  eluvoContainer: 
  {
    position: 'absolute',
    alignItems: 'center',
    top: 367,
    height: 74,
    width: 142,
    resizeMode: "contain"
  },
  eluvoTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    top: 437,
    height: 22,
    width: 186,
    resizeMode: "contain"
  },


  // nextBtnContainer:
  // {

  //   position: 'absolute',
  //   width: width - 55,
  //   height: 45,
  //   borderRadius: 24,
  //   top: 530,
  //   alignItems:'center',
    
    
  // },

}



