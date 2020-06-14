import { Auth } from "aws-amplify";
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen as WelcomeScreen } from './WelcomeScreen';
import LoginScreen  from './LoginScreen';
import  SignUpScreen  from './SignUpScreen';
import {TrackTest } from './TrackScreen'
import Home from './Home';
import ResetPassword from './ResetPassword';
// import SaveCard from "./TrackingCards/SaveCard";



const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Welcome' component={WelcomeScreen}/>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='SignUp' component= {SignUpScreen}/>
    <Screen name='Home' component= {Home}/>
    <Screen name='Reset' component= {ResetPassword}/>
    <Screen name='TrackT' component= {TrackTest}/>
   
  
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);