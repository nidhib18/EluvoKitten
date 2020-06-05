import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const ForgotStyles = {

    headerText: {
        
        position: 'absolute',
        fontSize: 25,
        fontWeight: 'bold',
        top: 150,
        alignItems: 'center'
      },

    emailInput: {
        position: 'absolute',
        width: width - 55,
        height: 80,
        backgroundColor: 'white',
        top: 500,
        borderRadius: 25,

    },

    passwordInput: {
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


    }
}