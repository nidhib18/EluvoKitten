// import Amplify from 'aws-amplify'
// import config from './aws-exports'

// Amplify.configure(config)
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import React, {Component} from 'react';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
// import { default as theme } from './theme.json'
// import { AppNavigator } from './src/screens/NavigationComponent';
// import {Alert,Dimensions} from 'react-native';
// import RNRestart from 'react-native-restart';
// import {setJSExceptionHandler} from 'react-native-exception-handler';
// console.disableYellowBox = true;
// console.reportErrorsAsExceptions = false;

// //Example to add event in Device Calendar
// //Import React
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// //Import basic react native components
// import * as AddCalendarEvent from 'react-native-add-calendar-event';
// //Import library for AddCalendarEvent
// import moment from 'moment';
// //Import moment.js to deal with time


// /*This is an Example of Calendar With Events*/

// //import react in our project

// //import basic react native components
// import EventCalendar from 'react-native-events-calendar';
// //import EventCalendar component
// let { width } = Dimensions.get('window');
// //get the size of device

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     //Dummy event data to list in calendar 
//     //You can also get the data array from the API call
//     this.state = {
//       events: [
//         {
//           start: '2019-01-01 00:00:00',
//           end: '2019-01-01 02:00:00',
//           title: 'New Year Party',
//           summary: 'xyz Location',
//         },{
//           start: '2019-01-01 01:00:00',
//           end: '2019-01-01 02:00:00',
//           title: 'New Year Wishes',
//           summary: 'Call to every one',
//         },
//         {
//           start: '2019-01-02 00:30:00',
//           end: '2019-01-02 01:30:00',
//           title: 'Parag Birthday Party',
//           summary: 'Call him',
//         },
//         {
//           start: '2019-01-03 01:30:00',
//           end: '2019-01-03 02:20:00',
//           title: 'My Birthday Party',
//           summary: 'Lets Enjoy',
//         },
//         {
//           start: '2019-02-04 04:10:00',
//           end: '2019-02-04 04:40:00',
//           title: 'Engg Expo 2019',
//           summary: 'Expoo Vanue not confirm',
//         },
//       ],
//     };
//   }

//   eventClicked(event) {
//     //On Click oC a event showing alert from here
//     alert(JSON.stringify(event));
//   }

//   render() {
//     return (
//       <View style={{ flex: 1, marginTop: 20 }}>
//         <EventCalendar
//           eventTapped={this.eventClicked.bind(this)}
//           //Function on event press
//           events={this.state.events}
//           //passing the Array of event
//           width={width}
//           //Container width
//           size={60}
//           //number of date will render before and after initDate 
//           //(default is 30 will render 30 day before initDate and 29 day after initDate)
//           initDate={'2019-01-01'}
//           //show initial date (default is today)
//           scrollToFirst
//           //scroll to first event of the day (default true)
//         />
//       </View>
//     );
//   }
// }

// import Amplify from 'aws-amplify'
// import config from './aws-exports'

// Amplify.configure(config)
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import React, {Component} from 'react';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
// import { default as theme } from './theme.json'
// import { AppNavigator } from './src/screens/NavigationComponent';
// import {Alert} from 'react-native';
// import RNRestart from 'react-native-restart';
// import {setJSExceptionHandler} from 'react-native-exception-handler';
// console.disableYellowBox = true;
// console.reportErrorsAsExceptions = false;



// const errorHandler = (err, isFatal) => {
//   const allowedInDevMode = true; //enable DEV mode true in index.js as well
//   if (isFatal && allowedInDevMode ) {
//     Alert.alert(
//         'Unexpected error occurred',
//         `
//         We will need to restart the app.
//         `,
//       [{
//         text: 'Restart',
//         onPress: () => {
//           RNRestart.Restart();
//         }
//       }]
//     );
//   } else {
//     console.log(err); // So that we can see it in the logs
//   }
// };

// setJSExceptionHandler(errorHandler);


// export default () => (
  
//   <>
//     <IconRegistry icons={EvaIconsPack}/>
//    {/* <SafeAreaView style={{ flex: 1 , backgroundColor:'#F09874'}}>  */}
//    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>

//     <AppNavigator />

//     </ApplicationProvider>
//  {/* </SafeAreaView> */}

//   </>
// );


// import React, { Component } from 'react';
// import { Platform } from 'react-native';
//  import { createAppContainer } from 'react-navigation';
// import { createStackNavigator} from 'react-navigation-stack'
// import * as Permissions from 'expo-permissions';
// import HomeTwo from './src/screens/HomeTwo';

// import CreateTask from './src/screens/CreateTask';
// import TodoStore from './src/screens/TodoStore';

// const AppNavigator = createStackNavigator(
//   {
   
//     CreateTask, HomeTwo,
    
    
//   },
//   {
//     headerMode: 'none',
//   }
// );

// const AppContainer = createAppContainer(AppNavigator);

// export default class App extends Component {
//   async componentWillMount() {
//     await this._askForCalendarPermissions();
//     await this._askForReminderPermissions();
//   }

//   _askForCalendarPermissions = async () => {
//     await Permissions.askAsync(Permissions.CALENDAR);
//   };

//   _askForReminderPermissions = async () => {
//     if (Platform.OS === 'android') {
//       return true;
//     }

//     await Permissions.askAsync(Permissions.REMINDERS);
//   };

//   render() {
//     return (
//       <TodoStore>
//         <AppContainer />
//       </TodoStore>
//     );
//   }
// }

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


import { Platform } from 'react-native';

import * as Permissions from 'expo-permissions';

import TodoStore from './src/screens/TodoStore';

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
        <TodoStore>
          <AppNavigator />
        </TodoStore>
      </ApplicationProvider>
    );
  }
}

