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



  usernameInput: {
    position: 'absolute',
    width: width - 55,
    height: 80,
    backgroundColor: 'white',
    top: 130,
    borderRadius: 24,
    color: 'black',
    alignLabel:'left',
  },


  emailInput: {
    position: 'absolute',
    width: width - 55,
    height: 80,
    backgroundColor: 'white',
    top: 230,
    borderRadius: 25,
    
  },

  passwordInput: {
    position: 'absolute',
    width: width - 55,
    height: 80,
    backgroundColor: 'white',
    top: 330,
    borderRadius: 24,
    

  },

  passwordConfirmInput: {
    position: 'absolute',
    width: width - 55,
    height: 80,
    backgroundColor: 'white',
    top: 430,
    borderRadius: 24,
  
    color: 'black',
    

  },

  nextBtnContainer:
  {

    position: 'absolute',
    width: width - 55,
    height: 45,
    borderRadius: 24,
    top: 530,
    alignItems:'center',
    
    
  },

}



