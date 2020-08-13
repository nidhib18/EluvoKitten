import { Auth } from "aws-amplify"
import React, { Component } from 'react';
import { SafeAreaView, Image,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView, } from 'react-native';
import { Divider, Input, Icon, Layout, Text, TopNavigation, TopNavigationAction, evaProps, Button } from '@ui-kitten/components';
import { ImageStyles } from "./ImageStyles";
import { ForgotStyles } from "./ForgotStyles";

export default class ForgotPassword extends Component {
    constructor(props)
     {
      super(props);
      this.state = 
      {
        username:" ",
        authCode:" ",
        newPassword:" ",
            
      }
    }
  // Request a new password
 forgotPassword= () => {
  const { username } = this.state
   Auth.forgotPassword(username)
  .then(data => console.log('New code sent', data))
  .catch(err => {
    if (! err.message) {
      console.log('Error while setting up the new password: ', err)
      Alert.alert('Error while setting up the new password: ', err)
    } else {
      console.log('Error while setting up the new password: ', err.message)
      Alert.alert('Error while setting up the new password: ', err.message)
    }
  })
}
  
// Upon confirmation redirect the user to the Sign In page
 forgotPasswordSubmit= () => {
  const { username, authCode, newPassword } = this.state
Auth.forgotPasswordSubmit(username,authCode,newPassword)
  .then(() => {
    this.props.navigation.navigate('Login')
    alert('The new password submitted successfully')
  })
  .catch(err => {
    if (! err.message) {
      alert('Error while confirming the new password: ', err)
    } else {
      alert('Error while confirming the new password: ', err.message)
    }
  })
}

render ()
{

return (
  <KeyboardAvoidingView style={{flex:1,backgroundColor:"#f09874"}} behavior="position" enabled>
        <Layout style={ImageStyles.mainContainer}>

            <TopNavigation position='absolute' />
            <Divider />
            
             
            <Image
                style={ForgotStyles.logoContainer}
                source={require('../../assets/logo.png')}
            />

            <Image
                style={ForgotStyles.bubbleContainer}
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
                style={ForgotStyles.eluvoContainer}
                source={require('../../assets/eluvo.png')}
            />

            <Image
                style={ForgotStyles.eluvoTextContainer}
                source={require('../../assets/eluvotext.png')}
            />


            <Input
                style={ForgotStyles.emailInput}
                placeholder='Username'
                label='Username'
                onChangeText={
                // Set this.state.username to the value in this Input box
                (value) => this.setState({username: value }) }
                placeholderTextColor={'#f09874'}
                backgroundColor = '#fff'
                color={'black'}
                height={Responsive.height(24)}/>

            <Button style={ForgotStyles.confirmationButton}
                appearance='outline'
                status='warning'
                
                onPress={this.forgotPassword}>Request verification code</Button>
             
            <Input
                style={ForgotStyles.newPassword}
                placeholder='New Password'
                label='New Password'
                onChangeText={
                // Set this.state.email to the value in this Input box
                (value) => this.setState({newPassword: value }) }
                secureTextEntry ={true}
                placeholderTextColor={'#f09874'}
                color={'black'}
                height={Responsive.height(24)}


            />
  
            <Input
                style={ForgotStyles.confirmCode}
                placeholder='Code'
                label='Confirmation code'
                onChangeText={
                // Set this.state.code to the value in this Input box
                (value) => this.setState({authCode: value }) }
                placeholderTextColor={'#f09874'}
                color={'black'}
                height={Responsive.height(24)}

            />
           <Button style={ForgotStyles.submitBtnContainer}
                appearance='outline'
                status='warning'
                onPress={this.forgotPasswordSubmit}>Confirm new password</Button>
                      
        </Layout>
        </KeyboardAvoidingView>


    );

    
    
 };

}