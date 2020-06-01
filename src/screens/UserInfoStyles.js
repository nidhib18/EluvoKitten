import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const UserInfoStyles = {

    headerText: {
        position: 'absolute',
        fontSize: 30,
        fontWeight: 'bold',
        top: 70,
        alignItems: 'center'
      },
    

    nameInput: {
        position: 'absolute',
        width: width - 55,
        height: 80,
        backgroundColor: 'white',
        top: 150,
        borderRadius: 24,
        color: 'black',

    },

    lnameInput: {
        position: 'absolute',
        width: width - 55,
        height: 80,
        backgroundColor: 'white',
        top: 250,
        borderRadius: 24,

    },

    datepicker: {
        width: width - 55,
        position: 'absolute',
        top: 350,
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
    label: {
        color:'#FFFFFF',
        fontSize: 18,
      },
}