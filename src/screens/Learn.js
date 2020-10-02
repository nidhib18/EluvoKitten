import React, { Component } from 'react';
import { StyleSheet, View,Linking,TouchableOpacity,Text,ActivityIndicator} from 'react-native'
import { WebView } from 'react-native-webview';



export default class Learn extends React.Component 


{
    render() {
      <Text style ={{position: "absolute",
      color: "#8A8A8E",
      fontSize: Responsive.width(16),
      letterSpacing: -0.2,
      fontWeight: '500',
      alignSelf: 'center',
      top: Responsive.height(316)}} >Loading..</Text>
      return <WebView source={{ uri: 'https://nzendo.org.nz/managing-endo/' }} />;
      
    }
  
//     return (
//         <View style ={{top:40}}>

// <TouchableOpacity onPress={() => Linking.openURL('https://nzendo.org.nz/managing-endo/')}>
//   <Text style={{color: 'blue'}}>
//     ENDO
//   </Text>
// </TouchableOpacity>
//         </View>

    //   <WebView
    //     source={{uri: 'https://github.com/facebook/react-native'}}
    //     style={{marginTop: 20}}
    //   />
    
  
}