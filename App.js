import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json'
import { AppNavigator } from './src/screens/NavigationComponent';

console.disableYellowBox = true;

// import {Alert} from 'react-native';
// import RNRestart from 'react-native-restart';
// import {setJSExceptionHandler} from 'react-native-exception-handler';
// import { setNativeExceptionHandler } from "react-native-exception-handler";

// const errorHandler = (e, isFatal) => {
//   if (isFatal) {
//     Alert.alert(
//         'Unexpected error occurred',
//         `
//         Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

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
//     console.log(e); // So that we can see it in the ADB logs in case of Android if needed
//   }
// };

// setJSExceptionHandler(errorHandler);

// setNativeExceptionHandler(
//   exceptionhandler,
//   forceAppQuit,
//   executeDefaultHandler
// );
export default () => (
  
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AppNavigator/>    
    </ApplicationProvider>
  </>
);

