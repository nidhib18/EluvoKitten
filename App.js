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

console.disableYellowBox = true;
console.reportErrorsAsExceptions = false;

export default () => (
  
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AppNavigator/>    
    </ApplicationProvider>
  </>
);

