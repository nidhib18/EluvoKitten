import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen as WelcomeScreen } from './WelcomeScreen';
import  LoginScreen  from './LoginScreen';
import SignUpScreen  from './SignUpScreen';
import ForgotPassword from './ForgotPassword';
import {InsightScreen }from './InsightScreen';
import {SettingScreen }from './SettingScreen';
import {CalendarScreen} from './CalendarScreen'; 

import Home from './Home'
import { TrackScreen } from './TrackScreen';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode='none'>
      <MainStack.Screen name='Welcome' component={WelcomeScreen} />
      <MainStack.Screen name='Login' component={LoginScreen} />
      <MainStack.Screen name='Forgot' component= {ForgotPassword}/>
      <MainStack.Screen name='SignUp' component={SignUpScreen} />
      <MainStack.Screen name='Home' component={Home} />
      <MainStack.Screen name='Calendar' component={CalendarScreen} />
      <MainStack.Screen name='Setting' component={SettingScreen} />
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal" headerMode='none' >
      <RootStack.Screen
        name="Back"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Track" component={TrackScreen} />
      <RootStack.Screen
        name="Cal"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Calendar" component={CalendarScreen} />
      <RootStack.Screen
        name="Set"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Settings" component={SettingScreen} />
    </RootStack.Navigator>
  );
}

export const AppNavigator = () => (
  <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer>
);
