import React from 'react';
import { SafeAreaView, Image } from 'react-native';
import { Divider, Input, Icon, Layout, Text, TopNavigation, TopNavigationAction, evaProps, Button } from '@ui-kitten/components';
import { ImageStyles } from "./ImageStyles";
import { LoginStyles } from './LoginStyles';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const LoginScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const [usernameValue, setUsernameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'  />
  );

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}
        fill='#000000'
     />
      
    </TouchableWithoutFeedback>
  );

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
        value={usernameValue}
        label='Username'
        onChangeText={nextValue => setUsernameValue(nextValue)}
        placeholderTextColor={'#f09874'}
        color={'black'}
        height={28}
        alignItems={'center'}
        

      />

      <Input
        style={LoginStyles.passwordInput}
        value={passwordValue}
        label='Password'
        placeholder='password'
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setPasswordValue(nextValue)}
        placeholderTextColor={'#f09874'}
        color={'black'}
        height={28}
      />

      <Button style={LoginStyles.submitBtnContainer}
        appearance='outline'
        status='warning'
        onPress={() => navigation.navigate('Home')}>Submit</Button>

      <Button style={LoginStyles.forgotBtnContainer}
        appearance='ghost'
        status='warning'
        onPress={() => navigation.navigate('Forgot')}>forgot password</Button>

    </Layout>

  );
};