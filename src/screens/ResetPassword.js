import { Auth } from "aws-amplify"
import React, { Component } from 'react';
import { SafeAreaView, Image,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView,StyleSheet } from 'react-native';
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
    if(passwordOld!=passwordNew)
{
    await Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.changePassword(user, passwordOld, passwordNew)
    })

    .then(() => {
      this.props.navigation.navigate('HTwo')
        alert('The new password submitted successfully')
      })

      
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
  if (passwordOld == passwordNew) {
    alert("Your new password cannot be same as the old password!");
  }
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
                style={styles.newPassword}
                //placeholder='password'
                label='Old password'
                onChangeText={
                // Set this.state.username to the value in this Input box
                (value) => this.setState({ passwordOld: value }) }
                placeholderTextColor={'#f09874'}
                backgroundColor = '#fff'
                color={'black'}
                height={28}/>

<Input
                style={styles.emailInput}
               // placeholder='New Password'
                label='New Password'
                onChangeText={
                // Set this.state.email to the value in this Input box
                (value) => this.setState({passwordNew: value }) }
                secureTextEntry ={true}
                placeholderTextColor={'#f09874'}
                color={'black'}
                height={28}


            />

<Button style={styles.submitBtnContainer}
                appearance='outline'
                status='warning'
                onPress={this.changePassword}>Confirm new password</Button>
                      
        </Layout>
        </KeyboardAvoidingView>
);
}
}

const styles = StyleSheet.create({
newPassword: {
  position: "absolute",
  width:Responsive.width(330),
  height:Responsive.height(48),
  backgroundColor: "white",
  top: Responsive.height(380),
  borderRadius: Responsive.height(24),
},

emailInput: {
  position: "absolute",
  width:Responsive.width(330),
  height:Responsive.height(48),
  backgroundColor: "white",
  top:Responsive.height(439),
  borderRadius: Responsive.height(24),
},

submitBtnContainer: {
  position: "absolute",
  width:Responsive.width(330),
  height:Responsive.height(40),
  borderRadius: Responsive.height(24),
  top:Responsive.height(520),
  alignItems: "center",
},

})