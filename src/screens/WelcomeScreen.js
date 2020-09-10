import React from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { ImageStyles } from "./ImageStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
import Responsive from 'react-native-lightweight-responsive';

console.disableYellowBox = true;
console.reportErrorsAsExceptions = false;

export const WelcomeScreen = ({ navigation }) => {
  return (
    <Layout style={ImageStyles.mainContainer}>
      <TopNavigation position="absolute" />
      <Divider />
      <Image
        style={ImageStyles.logoContainer}
        source={require("../../assets/logo.png")}
      />
      <Image
        style={ImageStyles.bubbleContainer}
        source={require("../../assets/bubble.png")}
      />

      <Image
        style={ImageStyles.squiggleContainer}
        source={require("../../assets/squiggle.png")}
      />

      <Image
        style={ImageStyles.dotsContainer}
        source={require("../../assets/dots.png")}
      />

      <Image
        style={ImageStyles.eluvoContainer}
        source={require("../../assets/eluvo.png")}
      />

      <Image
        style={ImageStyles.eluvoTextContainer}
        source={require("../../assets/eluvotext.png")}
      />

      <Button
        style={styles.loginBtnContainer}
        onPress={() => navigation.navigate("Login")}
      >
        Log in
      </Button>

      <Button
        style={styles.signBtnContainer}
        onPress={() => navigation.navigate("SignUp")}  //This is the create an account button that will navigate to sign up page
      >
        Create an account
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  signBtnContainer: {
    position: "absolute",
    // width: wp('95%') ,
    // height: hp('7%'),
    width:Responsive.width(345),
    height:Responsive.height(48),
    borderRadius: Responsive.height(24),
    top: Responsive.height(550),
    backgroundColor: "#fff",
    includeFontPadding: true,
    paddingVertical: 5,
  },

  loginBtnContainer: {
    position: "absolute",
    width:Responsive.width(345),
    height:Responsive.height(48),
   // width:wp('95%'),
    //height: hp('7%'),
    borderRadius: Responsive.height(24),
    top: Responsive.height(480),
    backgroundColor: "white",
    includeFontPadding: true,
    paddingVertical: 5,
  },
});
