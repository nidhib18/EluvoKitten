import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen as WelcomeScreen } from './WelcomeScreen';
import  LoginScreen  from './LoginScreen';
import SignUpScreen  from './SignUpScreen';
import ForgotPassword from './ForgotPassword';
import {InsightScreen }from './InsightScreen';
import SettingScreen from './SettingScreen';
import CustomiseTracking from './CustomiseTracking'
import Home from './Home'
import { TrackScreen } from './TrackScreen';
// import ErrorBoundary from './ErrorBoundary';

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
      {/* <MainStack.Screen name='Error' component={ErrorBoundary} />  */}
      {/* <MainStack.Screen name='TrackCust' component={CustomiseTracking} />  */}
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
        name="Insight"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Insights" component={InsightScreen} />
      {/* <RootStack.Screen
        name="Set"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Settings" component={SettingScreen} />
       */}
     
    </RootStack.Navigator>
  );
}

export const AppNavigator = () => (
  <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer>
);
