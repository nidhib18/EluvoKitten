import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen as WelcomeScreen } from './WelcomeScreen';
import { LoginScreen } from './LoginScreen';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Welcome' component={WelcomeScreen}/>
    <Screen name='Login' component={LoginScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);