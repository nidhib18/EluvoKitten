import React,{ Component }from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { ImageStyles } from "./ImageStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import Responsive from 'react-native-lightweight-responsive';

console.disableYellowBox = true;
console.reportErrorsAsExceptions = false;

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
    };
  }
  async componentDidMount() {
      getData(constants.USERDETAILS).then((data) => {
        // Read back the user details from storage and convert to object
        if (data != "")
        {
              var userDetails = JSON.parse(data);
              console.log("Got welocome data", userDetails);
              this.setState({isLoggedIn: true, username: userDetails.user_name});
        }
    });
  }


  render()
  {
    if (this.state.isLoggedIn && this.state.username) {
      console.log("Is Logged in", this.state.isLoggedIn);
      console.log("Useranme", this.state.username)
      this.props.navigation.navigate("Home", {username: this.state.username});
      return null;
    }
    else {
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
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Log in
          </Button>

          <Button
            style={styles.signBtnContainer}
            onPress={() => this.props.navigation.navigate("SignUp")}  //This is the create an account button that will navigate to sign up page
          >
            Create an account
          </Button>
        </Layout>
      );
    }
}
};       

const styles = StyleSheet.create({
  signBtnContainer: {
    position: "absolute",
    width:Responsive.width(345),
    height:Responsive.height(42),
    borderRadius: Responsive.height(24),
    top: Responsive.height(550),
    backgroundColor: "#fff",
    includeFontPadding: true,
    paddingVertical: 5,
  },

  loginBtnContainer: {
    position: "absolute",
    width:Responsive.width(345),
    height:Responsive.height(42),
    borderRadius: Responsive.height(24),
    top: Responsive.height(495),
    backgroundColor: "white",
    includeFontPadding: true,
    paddingVertical: 5,
  },
});