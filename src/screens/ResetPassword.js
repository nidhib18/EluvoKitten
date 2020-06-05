import { Auth } from "aws-amplify"
import React, { Component } from 'react';
import { SafeAreaView, Image } from 'react-native';
import { Divider, Input, Icon, Layout, Text, TopNavigation, TopNavigationAction, evaProps, Button } from '@ui-kitten/components';
import { ImageStyles } from "./ImageStyles";
import { ForgotStyles } from "./ForgotStyles";

export default class ResetPassword extends Component {
    constructor(props)
     {
      super(props);
      this.state = 
      {
        passwordOld:"",
        passwordNew:"",
        //      
      }
    }
     // Change user password for the app
changePassword = async () => 
{
    const { passwordOld, passwordNew } = this.state
    await Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.changePassword(user, passwordOld, passwordNew)
    })
    .then(data => console.log('Password changed successfully', data))
    .catch(err => {
      if (! err.message) {
        console.log('Error changing password: ', err)
        Alert.alert('Error changing password: ', err)
      } else {
        console.log('Error changing password: ', err.message)
        Alert.alert('Error changing password: ', err.message)
      }
    })

}
  

render ()
{

return (
        <Layout style={ImageStyles.mainContainer}>

            <TopNavigation position='absolute' />
            <Divider />
            
             
            <Image
                style={ImageStyles.logoContainer}
                source={require('../../assets/logo.png')}
            />

            <Image
                style={ImageStyles.bubbleContainer}
                source={require('../../assets/bubble.png')}
            />

            <Image
                style={ImageStyles.squiggleContainer}
                source={require('../../assets/squiggle.png')}
            />

            <Image
                style={ImageStyles.dotsContainer}
                source={require('../../assets/dots.png')}
            />

            <Image
                style={ImageStyles.eluvoContainer}
                source={require('../../assets/eluvo.png')}
            />

            <Image
                style={ImageStyles.eluvoTextContainer}
                source={require('../../assets/eluvotext.png')}
            />


            <Input
                style={ForgotStyles.emailInput}
                placeholder='old password'
                label='Old Password'
                //value={emailValue}
               // onChangeText={nextValue => setEmailValue(nextValue)}
                onChangeText={
                // Set this.state.email to the value in this Input box
                (value) => this.setState({ passwordOld: value })}
                placeholderTextColor={'#f09874'}
                color={'black'}
                height={28}


            />

            
            <Input
                style={ForgotStyles.passwordInput}
                placeholder='new password'
                label='New Password'
               // value={emailValue}
               // onChangeText={nextValue => setEmailValue(nextValue)}
                onChangeText={
                // Set this.state.email to the value in this Input box
                (value) => this.setState({ passwordNew: value })}
                placeholderTextColor={'#f09874'}
                color={'black'}
                height={28}

            />

            {/* <Text style={ForgotStyles.headerText}>Forgot Password? No Worries</Text> */}

            <Button style={ForgotStyles.submitBtnContainer}
                appearance='outline'
                status='warning'
                
                onPress={this.changePassword}>Submit</Button>
               {/* // onPress={() => navigation.navigate('Home')} */}

               
        </Layout>


    );

    
    
 };

}