import AppIntroSlider from 'react-native-app-intro-slider';
import React, { Component } from "react";
import {StyleSheet,View,Image,Text} from "react-native";
import Responsive from 'react-native-lightweight-responsive';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Auth } from "aws-amplify";
import { saveUserDetails } from "../helpers/AuthHelpers";

const slides = [
    {
      key: 'k1',
      image: require('../../assets/Intro1.png'),
      //imageStyle: styles.image
      
    },
    {
      key: 'k2',
      image: require('../../assets/intro2.png'),
      //imageStyle: styles.image,
    },
    {
      key: 'k3',
      image: require('../../assets/Intro3.png'),
      //imageStyle: styles.image,
    },

  ];
export default class Instruction extends React.Component 
{

    constructor(props) 
    {
        super(props);
        this.state = 
        {
            show_Main_App: false,
            userDetails: {},
            username:
            (this.props &&
              this.props.route &&
              this.props.route.params &&
              this.props.route.params.username) ||
            "",
           
        };
    }
   
    // _renderNextButton = () => {
    // };
    // _renderDoneButton = () => {
    // };
//will enable the program to handle the state show_Main_App and set it as true.
    on_Done_all_slides = () => 
      { const { username } = this.state;
        this.setState({ show_Main_App: true });
        this.props.navigation.navigate("Home",
        {username:username});
      };
    on_Skip_slides = () => 
     {
        const { username } = this.state;
        this.setState({ show_Main_App: true });
        this.props.navigation.navigate("Home",
        {username:username});
        // this.props.navigation.navigate("Instruction", {
        //   username: username,
        // });
      };

      _renderItem = ({ item }) => {
        return(
          <View style={{flex:1,backgroundColor:'#f09874'}}>
              {/* <Text style = {{ fontSize: 26, color: '#fff',  fontWeight: 'bold',  textAlign: 'center',  top:-100,marginTop: 20,}}>{item.title}</Text> */}
              <Image style = {{ width:Responsive.width(380),height:Responsive.height(500),top:Responsive.height(80),right:wp('1%'),resizeMode:'contain',alignItems:'center'}} source ={item.image}  />
              {/* <Text>{item.text}</Text> */}
          </View>
        );
    };

      render ()  {
        if (this.state.show_Main_App) {
          return (
            <View>
            <Text>aaaaa</Text>
          </View>
        );
            
       }  else { 
           return ( 
             <AppIntroSlider 
              data={slides} 
              renderItem={this._renderItem}
              onDone={this.on_Done_all_slides} 
              showSkipButton={true} 
              onSkip={this.on_Skip_slides} 
            //   renderDoneButton={this._renderDoneButton}
            //   renderNextButton={this._renderNextButton}

              /> 
            ); 
       } 
    }
}
const styles = StyleSheet.create({
        MainContainer: { 
         flex: 1, 
         paddingTop: 20, 
         alignItems: 'center', 
         justifyContent: 'center', 
         padding: 20 
        }, 
     
        title: { 
         fontSize: 26, 
         color: '#fff', 
         fontWeight: 'bold', 
         textAlign: 'center', 
         marginTop: 20, 
        }, 
     
        text: { 
         color: '#fff', 
         fontSize: 20, 
        }, 
     
        image: { 
         width: 200, 
         height: 200, 
         resizeMode: 'contain' 
        } 
     });