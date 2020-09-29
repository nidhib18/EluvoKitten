import React, { Component } from 'react';
import { StyleSheet, View,Linking,TouchableOpacity,Text} from 'react-native'
//import { WebView } from 'react-native-webview';

export default class Learn extends React.Component {
  render() {
    return (
        <View style ={{top:40}}>

<TouchableOpacity onPress={() => Linking.openURL('https://nzendo.org.nz/managing-endo/')}>
  <Text style={{color: 'blue'}}>
    ENDO
  </Text>
</TouchableOpacity>
        </View>

    //   <WebView
    //     source={{uri: 'https://github.com/facebook/react-native'}}
    //     style={{marginTop: 20}}
    //   />
    );
  }
}