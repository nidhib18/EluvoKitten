import React, { Component, useState } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import Moment from "moment";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  props,
  Datepicker,
  Button,
} from "@ui-kitten/components";

import { ImageStyles } from "./ImageStyles";
import { SignUpStyles } from "./SignUpStyles";

import { UserInfoStyles } from "./UserInfoStyles";

import { Auth } from "aws-amplify";

import { constants } from "../resources/Constants";
const { sheight } = Dimensions.get("window").height;

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //*******changed firstName to given_name ********
      given_name: "", //*******changed firstName to given_name ********
      family_name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: " ",
      screenHeight: sheight, 
      confirmationCode: "",
      secureTextEntry: false,
      modalVisible: false,
      birthdate: new Date(),
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
    };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    let today = new Date();
    let birthDate = new Date(newDate);
    if (today.getFullYear() - birthDate.getFullYear() < 12) {
      alert(
        "Eluvo is intended for users aged 12 and over. We recommend parental guidance for users under the age of 12."
      );
    }

    this.setState({ birthdate: birthDate });
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  navigateBack = () => {
    navigation.goBack();
  };

  handleSignUp = () => {
    const {
      given_name,
      family_name,
      username,
      email,
      password,
      confirmPassword,
      birthdate,
    } = this.state;

    if (password === confirmPassword) {
      Auth.signUp({
        username: username,
        password,
        attributes: {
          email,
          family_name,
          given_name,
          birthdate: Moment(birthdate).format("YYYY-MM-DD"),
        },
      })

      
        // On success, show Confirmation Code Modal
        .then(() => this.setState({ modalVisible: true }))
        .catch((err) => {
          console.log(err);
          (err.code == constants.USERNAMEEXISTS_EXCEPTION); alert(err.message);
         
        });
        // On failure, display error in console
//    

    } 
    
    else {
      alert("Passwords do not match!");
    }
    if (password.length <= 7) {
      alert("Password length is too short");
    }
  };
  
  // handleConfirmationCode = () => {
  //   const { username, confirmationCode } = this.state;
  //   Auth.confirmSignUp(username, confirmationCode, {})

  //     .then((user) => {
  //       this.setState({ modalVisible: false });
  //       saveUserDetails(username, this.props.navigation);
  //     })

  //     .catch((err) => console.log(err));
  // };
 
  handleConfirmationCode = () => {
    const { username, confirmationCode } = this.state;
    Auth.confirmSignUp(username, confirmationCode, {})

      .then((user) => {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate("Instruction", {
          username: username,
        });
      })

      .catch((err) => console.log(err));
  };

  render() {
    
      return (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexGrow: 1,
            flexDirection: "column",
            marginTop: Responsive.height(-350),
            justifyContent: "center",
            top:Responsive.height(350),
          }}
          vertical={true}
          showsVerticalScrollIndicator={true}
        >
        <Layout style={ImageStyles.mainContainer}>
          <TopNavigation position="absolute" />
          <Divider />

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
<View style={{width:Responsive.width(320), top:Responsive.height(-500)}}>
          <Text style={SignUpStyles.headerText}>Create a new account </Text>
</View>
          <Input
            style={UserInfoStyles.nameInput}
            label="First name"
            onChangeText={(value) => this.setState({ given_name: value })}
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={Responsive.height(24)}
          />
          <Input
            style={SignUpStyles.usernameInput}
            label="Username"
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ username: value })
            }
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={Responsive.height(24)}
          />

          <Input
            style={SignUpStyles.emailInput}
            label="Email"
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ email: value })
            }
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={Responsive.height(24)}
          />

          <Input
            style={SignUpStyles.passwordInput}
            label="Password"
            secureTextEntry={true}
            accessoryRight={this.renderIcon}
            caption="Should contain at least 8 symbols"
            onChangeText={(value) => this.setState({ password: value })}
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={Responsive.height(24)}
          />

          <Input
            style={SignUpStyles.passwordConfirmInput}
            label="Confirm Password"
            accessoryRight={this.renderIcon}
            captionIcon={this.AlertIcon}
            secureTextEntry={true}
            onChangeText={(value) => this.setState({ confirmPassword: value })}
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={Responsive.height(24)}
          />

          {/* //**********User info ************ */}
          <Input
            style={UserInfoStyles.lnameInput}
            label="Last name"
            onChangeText={(value) => this.setState({ family_name: value })}
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={Responsive.height(24)}
          />

          <Datepicker
            style={UserInfoStyles.datepicker}
            date={this.state.birthdate}
            onSelect={this.setDate}
            accessoryRight={this.DateIcon}
            label="Date of Birth"
            min={this.state.minDate}
            max={this.state.maxDate}
            // max = n
            placeholder="dd/mm/yyyy"
          />
          <Button
            style={UserInfoStyles.submitBtnContainer}
            appearance="outline"
            status="warning"
            onPress={this.handleSignUp}
          >
            Submit
          </Button>

          {/* 
        //******************************** --- MODAL-----****************** */}

          <Modal visible={this.state.modalVisible}>
            <KeyboardAvoidingView
              style={{ flex: 1, backgroundColor: "#f09874" }}
              behavior="position"
              enabled
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Layout style={SignUpStyles.modalContainer}>
                  <Image
                    style={ImageStyles.bubbleContainer}
                    source={require("../../assets/bubble.png")}
                  />

                  <Image
                    style={ImageStyles.logoContainer}
                    source={require("../../assets/logo.png")}
                  />

                  <Image
                    style={ImageStyles.eluvoContainer}
                    source={require("../../assets/eluvo.png")}
                  />

                  <Image
                    style={ImageStyles.eluvoTextContainer}
                    source={require("../../assets/eluvotext.png")}
                  />
                  <Image
                    style={ImageStyles.squiggleContainer}
                    source={require("../../assets/squiggle.png")}
                  />

                  <Image
                    style={ImageStyles.dotsContainer}
                    source={require("../../assets/dots.png")}
                  />

                  <Input
                    style={SignUpStyles.modal}
                    label="Confirmation Code"
                    placeholderTextColor={"#f09874"}
                    onChangeText={
                      // Set this.state.confirmationCode to the value in this Input box
                      (value) => this.setState({ confirmationCode: value })
                    }
                    color={"black"}
                  />
                  <Button
                    style={SignUpStyles.submit}
                    title="Submit"
                    appearance="outline"
                    status="warning"
                    onPress={this.handleConfirmationCode}
                  >
                    Submit verification code
                  </Button>
                </Layout>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </Modal>
        </Layout>
      </ScrollView>
    );
  }
}
