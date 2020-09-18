import React, { Component } from 'react';
import { Platform } from 'react-native';
 import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'
import * as Permissions from 'expo-permissions';
import HomeTwo from './HomeTwo';
import CreateTask from './CreateTask';
import TodoStore from './TodoStore';

const AppNavigator = createStackNavigator(
  {
    HomeTwo,
    CreateTask,
  },
  {
    headerMode: 'none',
  }
);


const AppContainer = createAppContainer(AppNavigator);

export const CalendarScreen = () => {
  
  
  async function  componentWillMount() {
    await this._askForCalendarPermissions();
    await this._askForReminderPermissions();
  }

  _askForCalendarPermissions = async () => {
    await Permissions.askAsync(Permissions.CALENDAR);
  };

  _askForReminderPermissions = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }

    await Permissions.askAsync(Permissions.REMINDERS);
  };

  
    return (

      
      <TodoStore>
        <AppContainer />
      </TodoStore> );
      

      
      

};