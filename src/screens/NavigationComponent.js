import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen as WelcomeScreen } from './WelcomeScreen';
import { LoginScreen } from './LoginScreen';
import { SignUpScreen } from './SignUpScreen';


const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Welcome' component={WelcomeScreen}/>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='SignUp' component={SignUpScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);