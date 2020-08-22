import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, {Component} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json'
import { AppNavigator } from './src/screens/NavigationComponent';
import {Alert,SafeAreaView} from 'react-native';
import RNRestart from 'react-native-restart';
import {setJSExceptionHandler} from 'react-native-exception-handler';
console.disableYellowBox = true;
console.reportErrorsAsExceptions = false;



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


export default () => (
  
  <>
    <IconRegistry icons={EvaIconsPack}/>
   <SafeAreaView style={{ flex: 1 , backgroundColor:'#F09874'}}> 
   <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>

    <AppNavigator />

    </ApplicationProvider>
 </SafeAreaView>

  </>
);