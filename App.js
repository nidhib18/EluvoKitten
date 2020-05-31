import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json'
import { AppNavigator } from './src/screens/navigation.component';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AppNavigator/>
    </ApplicationProvider>
  </>
);

