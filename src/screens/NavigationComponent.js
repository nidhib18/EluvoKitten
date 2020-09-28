  
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen as WelcomeScreen } from './WelcomeScreen';
import  LoginScreen  from './LoginScreen';
import SignUpScreen  from './SignUpScreen';
import ForgotPassword from './ForgotPassword';
import InsightScreen from './InsightScreen';
import Yearly from './Yearly';
import Monthly from './Monthly';
import SettingScreen from './SettingScreen';
import CustomiseTracking from './CustomiseTracking.js';
import Learn from './Learn';
import ResetPassword from './ResetPassword.js'
import Instruction from './Instruction';
import CreateTask from './CreateTask';
import Home from './Home'
import { TrackScreen } from './TrackScreen';
import {CalendarScreen} from './CalendarScreen'; 
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
      <MainStack.Screen name='Monthly' component={Monthly} /> 
      <MainStack.Screen name='Yearly' component={Yearly} /> 
      <MainStack.Screen name='Learn' component={Learn} /> 
      <MainStack.Screen name='TrackCust' component={CustomiseTracking} /> 
      <MainStack.Screen name='Instruction' component={Instruction} />
      <MainStack.Screen name='Calendar' component={CalendarScreen} />
      <MainStack.Screen name='Reset' component={ResetPassword} /> 
      <MainStack.Screen name='Setting' component={SettingScreen} />
      {/* <MainStack.Screen name='Create Task' component={CreateTask} />  */}

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
      {/* <RootStack.Screen name = "Learn" component ={Learn} /> */}
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