import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const ForgotStyles = {

    headerText: {
        
        position: 'absolute',
        fontSize: 25,
        fontWeight: 'bold',
        top:150,
        alignItems: 'center'
      },

      logoContainer: 
      {
        flex: 1,
        position: 'absolute',
        width:151,
        height:150,
        top:90,
    
        alignItems: 'center',
        resizeMode: "contain"
    
      },
      bubbleContainer: {

        position: 'absolute',
        right: -80,
        top: 0,
        width: 200,
        height: 301.07,
        resizeMode: "contain",
    
      },

      newPassword:
      {
        position: 'absolute',
        width: width - 55,
        height: 80,
        backgroundColor: 'white',
       // borderRadius: 24,
        top: 500,
        borderRadius: 25,
      },

    emailInput: {
        position: 'absolute',
        width: width - 55,
        height: 80,
        backgroundColor: 'white',
        top: 360,
        borderRadius: 25,
        
    },
    
    confirmationButton:
    {

        position: 'absolute',
        width: width - 55,
        height: 45,
        borderRadius: 24,
        top: 440,
        alignItems: 'center',


    },

    

    confirmCode: {
        position: 'absolute',
        width: width - 55,
        height: 80,
        backgroundColor: 'white',
        top: 570,
        borderRadius: 25,

    },
    submitBtnContainer:
    {

        position: 'absolute',
        width: width - 55,
        height: 45,
        borderRadius: 24,
        top: 660,
        alignItems: 'center',


    },

    eluvoContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 230,
        height: 74,
        width: 142,
        resizeMode: "contain"
      },
      eluvoTextContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 300,
        height: 22,
        width: 186,
        resizeMode: "contain"
      },
}