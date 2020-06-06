
import { Auth } from "aws-amplify";
import React,{Component} from 'react';
import { SafeAreaView, Image } from 'react-native';
import { Divider, Input, Icon, Layout, Text, TopNavigation, TopNavigationAction, evaProps, Button } from '@ui-kitten/components';
import { ImageStyles } from "./ImageStyles";
import { LoginStyles } from './LoginStyles';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

// const BackIcon = (props) => (
//   <Icon {...props} name='arrow-back' />
// );

// const navigateBack = () => {
//   navigation.goBack();
// };
// const BackAction = () => (
//   <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
// );

// const [usernameValue, setUsernameValue] = React.useState('');
// const [passwordValue, setPasswordValue] = React.useState('');
// const [secureTextEntry, setSecureTextEntry] = React.useState(true);


export default class LoginScreen extends Component {
  constructor(props) 
  {
    super(props);
    this.state = {
      //*******changed firstName to given_name ********
      username: "",   //*******changed firstName to given_name ********
      password: ""

    }
  };
  
//   setSecureTextEntry = (textentry) =>
//   {
//     this.setState({secureTextEntry:textentry})
//   };
  
//  toggleSecureEntry = () => {
//   setSecureTextEntry(!secureTextEntry);
// };


//  AlertIcon = (props) => (
//   <Icon {...props} name='alert-circle-outline'  />
// );
// renderIcon = (props) => (
//   <TouchableWithoutFeedback onPress={toggleSecureEntry}>
//     <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}
//       fill='#000000'
//    />
    
//   </TouchableWithoutFeedback>
// );

  handleSignIn = () => {
    const { username, password } = this.state;
    
    Auth.signIn({username:username, password})
      // If we are successful, navigate to Home screen
      .then(user => this.props.navigation.navigate('Home'))
      // On failure, display error in console
      .catch(err => alert("Wrong username or password"));
  }
  
  
  render ()
  {

  return (
    <Layout style={ImageStyles.mainContainer}>

      <TopNavigation position='absolute' />
      <Divider />

      <Image
        style={ImageStyles.bubbleContainer}
        source={require('../../assets/bubble.png')}
      />

      <Image
        style={ImageStyles.logoContainer}
        source={require('../../assets/logo.png')}
      />

      <Image
        style={ImageStyles.eluvoContainer}
        source={require('../../assets/eluvo.png')}
      />

      <Image
        style={ImageStyles.eluvoTextContainer}
        source={require('../../assets/eluvotext.png')}
      />
      <Image
        style={ImageStyles.squiggleContainer}
        source={require('../../assets/squiggle.png')}
      />

      <Image
        style={ImageStyles.dotsContainer}
        source={require('../../assets/dots.png')}
      />

      <Input
        style={LoginStyles.usernameInput}
        placeholder='enter your username'
        //value={usernameValue}
        label='Username'
       
        onChangeText={
    // Set this.state.email to the value in this Input box
        (value) => this.setState({ username: value })}
       // onChangeText={nextValue => setUsernameValue(nextValue)}
        placeholderTextColor={'#f09874'}
        color={'black'}
        height={28}
        alignItems={'center'}
        

      />

      <Input
        style={LoginStyles.passwordInput}
        //value={passwordValue}
        label='Password'
        placeholder='password'
        //accessoryRight={this.renderIcon}
        //secureTextEntry={this.secureTextEntry}
        onChangeText=
        {
    // Set this.state.email to the value in this Input box
        (value) => this.setState({ password: value })}
        //onChangeText={nextValue => setPasswordValue(nextValue)}
        placeholderTextColor={'#f09874'}
        color={'black'}
        height={28}
      />

      <Button style={LoginStyles.submitBtnContainer}
        appearance='outline'
        status='warning'
        onPress={this.handleSignIn}>Submit</Button>

      <Button style={LoginStyles.forgotBtnContainer}
        appearance='ghost'
        status='warning'
        onPress={() => this.props.navigation.navigate('Reset')}>reset password</Button>

    </Layout>

  );
};
}