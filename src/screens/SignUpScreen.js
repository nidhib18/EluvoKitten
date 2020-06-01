import React from 'react';
import { SafeAreaView, View, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Input, props, Button } from '@ui-kitten/components';
import { ImageStyles } from "./ImageStyles";
import { SignUpStyles } from './SignUpStyles';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const SignUpScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const [usernameValue, setUsernameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [passwordCValue, setCPasswordValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
  );

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}
      fill='#000000' />
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
        style={ImageStyles.squiggleContainer}
        source={require('../../assets/squiggle.png')}
      />

      <Image
        style={ImageStyles.dotsContainer}
        source={require('../../assets/dots.png')}
      />

      <Text
        style={SignUpStyles.headerText}>Create a new account </Text>


      <Input
        style={SignUpStyles.usernameInput}

        placeholder='enter a username'
        value={usernameValue}
        label='Username'
        onChangeText={nextValue => setUsernameValue(nextValue)}
        placeholderTextColor={'#f09874'}
        color={'black'}
        height={28}

      />

      <Input
        style={SignUpStyles.emailInput}
        placeholder='enter your email'
        label='Email'
        value={emailValue}
        onChangeText={nextValue => setEmailValue(nextValue)}
        placeholderTextColor={'#f09874'}
        color={'black'}
        height={28}

      />

      <Input
        style={SignUpStyles.passwordInput}
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

      <Input
        style={SignUpStyles.passwordConfirmInput}
        value={passwordCValue}
        label='Confirm Password'
        placeholder='confirm password'
        caption='Should contain at least 8 symbols'
        accessoryRight={renderIcon}
        captionIcon={AlertIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setCPasswordValue(nextValue)}
        placeholderTextColor={'#f09874'}
        color={'black'}
        height={28}
      />

      <Button style={SignUpStyles.nextBtnContainer}
        appearance='outline'
        status='warning'
        onPress={() => navigation.navigate('UserInfo')}>Next</Button>

     





    </Layout>




  );
};
