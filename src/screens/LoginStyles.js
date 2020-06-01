import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const LoginStyles = {

    usernameInput: {
        position: 'absolute',
        width: width - 55,
        height: 80,
        backgroundColor: 'white',
        top: 480,
        borderRadius: 24,
        color: 'black',

    },

    passwordInput: {
        position: 'absolute',
        width: width - 55,
        height: 80,
        backgroundColor: 'white',
        top: 550,
        borderRadius: 24,

    },

    submitBtnContainer:
    {

        position: 'absolute',
        width: width - 55,
        height: 45,
        borderRadius: 24,
        top: 650,
        
        alignItems: 'center',


    },

    forgotBtnContainer:
    {

        position: 'absolute',
        top: 600,
        left:8,

        


    },






}