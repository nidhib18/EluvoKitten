

import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Component } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json'
import { AppNavigator } from './src/screens/NavigationComponent';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import { setJSExceptionHandler } from 'react-native-exception-handler';
console.disableYellowBox = true;
console.reportErrorsAsExceptions = false;




// const AppNavigator = createStackNavigator(
//   {
//     Home,
//     CreateTask,
//   },
//   {
//     headerMode: 'none',
//   }
// );

// const AppNavigator = createStackNavigator(
//   {
//     Home,
//     CreateTask,
//   },
//   {
//     headerMode: 'none',
//   }
// );

// const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  async componentWillMount() {
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

  render() {
    return (
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
       
          <AppNavigator />
       
      </ApplicationProvider>
    );
  }
}

