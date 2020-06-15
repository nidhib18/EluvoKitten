import React, { Component, useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import Moment from "moment";
import {Divider, Icon,Layout,Text,TopNavigation,TopNavigationAction,Input,props,Datepicker,Button,} from "@ui-kitten/components";

import setJSExceptionHandler from "react-native-exception-handler";
import { ImageStyles } from "./ImageStyles";
import { SignUpStyles } from "./SignUpStyles";

import { UserInfoStyles } from "./UserInfoStyles";

import { Auth } from "aws-amplify";
import { saveUserDetails } from "../helpers/AuthHelpers";


// import UserInfoScreen from "./UserInfoScreen";

// const BackIcon = (props) => (
//   <Icon {...props} name='arrow-back' />
// );

// // export const SignUpScreen = ({ navigation }) => {

// //   const navigateBack = () => {
// //     navigation.goBack();
// //   };

// //   const BackAction = () => (
// //     <TopNavigationAction icon={BackIcon} onPress={navigateBack} />

// //   );

// const [usernameValue, setUsernameValue] = React.useState('');
// const [emailValue, setEmailValue] = React.useState('');
// const [passwordValue, setPasswordValue] = React.useState('');
// const [passwordCValue, setCPasswordValue] = React.useState('');

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
      //birthdate:new Date(),
      screenHeight: sheight,

      confirmationCode: "",
      secureTextEntry: false,
      modalVisible: false,
      birthdate: new Date(),
      //secureTextEntry:false,
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

  BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  //  ***Date picker***

  //   setSecureTextEntry = (textentry) =>
  //   {
  //     this.setState({secureTextEntry:textentry})
  //   };

  //  toggleSecureEntry = () =>
  //  {

  //     setSecureTextEntry(!secureTextEntry);
  //   };

  //   AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

  //   renderIcon = (props) => (
  //     <TouchableWithoutFeedback onPress={toggleSecureEntry}>

  //       <Icon
  //         {...props}
  //         name={this.state.secureTextEntry ? "eye-off" : "eye"}
  //         fill="#000000"
  //       />
  //     </TouchableWithoutFeedback>
  //   );

  // errorHandler = (e, isFatal) =>
  // {
  //   if (isFatal) {
  //     reporter(e);
  //     Alert.alert
  //     (
  //       "Unexpected error occurred",
  //       `
  //         Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}

  //         We have reported this to our team ! Please close the app and start again!
  //         `,
  //       [
  //         {
  //           text: "Close",
  //           // onPress: () => {
  //           //   BackAndroid.exitApp();
  //           // }
  //         }
  //       ]
  //     );
  //   } else
  //   {
  //     console.log(e);
  //   }
  // setJSExceptionHandler(errorHandler);
  // }

  DateIcon = (props) => <Icon {...props} name={"calendar"} />;
  EmailIcon = (props) => <Icon {...props} name={"email"} />;
  renderIcon = (props) => <Icon {...props} name={"eye"} fill="#0000" />;

  handleSignUp = () => {
    // alert(JSON.stringify(this.state));
    const 
    {given_name, family_name, username, email, password, confirmPassword, birthdate,} = this.state;
    // Make sure passwords match
    

    if (password === confirmPassword) {
      Auth.signUp({
        username: username,password, attributes: { email,family_name,given_name,birthdate: Moment(birthdate).format("YYYY-MM-DD"),
        },
      })
        // On success, show Confirmation Code Modal
        .then(() => this.setState({ modalVisible: true }))

        // On failure, display error in console
        //.errorHandler(err,user)
        .catch((err) => console.log(err));
    } else {
      alert("Passwords do not match!");
    }
    if (password.length <=7)
    {
      alert("Password length is too short")
    }
  };

  handleConfirmationCode = () => {
    const { username, confirmationCode } = this.state;
    Auth.confirmSignUp(username, confirmationCode, {})
      // .then(() => {
      //   this.setState({ modalVisible: false });
      //   this.props.navigation.navigate("Home");
      // })

      .then((user) => {
        this.setState({ modalVisible: false });
        saveUserDetails(username);
        this.props.navigation.navigate("Home");
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
          marginTop: "-100%",
          justifyContent: "center",
          top: 410,
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

          <Text style={SignUpStyles.headerText}>Create a new account </Text>

          <Input
            style={UserInfoStyles.nameInput}
            //placeholder="first name"
            //value={nameValue}
            label="First name"
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ given_name: value })
            }
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={28}
          />
          <Input
            style={SignUpStyles.usernameInput}
            //placeholder={"username"}

            //value={usernameValue}
            label="Username"
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ username: value })
            }
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={28}
          />

          <Input
            style={SignUpStyles.emailInput}
            //placeholder={"email"}
            label="Email"
            icon={this.EmailIcon}
            accessoryLeft={this.EmailIcon}
            //Icon = {this.EmailIcon}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ email: value })
            }
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={28}
          />

          <Input
            style={SignUpStyles.passwordInput}
            // value={passwordValue}
            label="Password"
            //placeholder="Should contain at least 8 symbols"
            //accessoryRight={this.renderIcon}
            //secureTextEntry={this.secureTextEntry}
            secureTextEntry={true}
            accessoryRight={this.renderIcon}
            // placeholder={"password"}
            caption="Should contain at least 8 symbols"
            //caption="Should contain at least 8 symbols"
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ password: value })
            }
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={28}
          />

          <Input
            style={SignUpStyles.passwordConfirmInput}
            // value={passwordCValue}
            label="Confirm Password"
            //placeholder="Should contain at least 8 symbols"
            //caption="Should contain at least 8 symbols"

            accessoryRight={this.renderIcon}
            captionIcon={this.AlertIcon}
            secureTextEntry={true}
            //secureTextEntry={this.secureTextEntry}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ confirmPassword: value })
            }
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={28}
          />

          {/* //**********User info ************ */}
          <Input
            style={UserInfoStyles.lnameInput}
            //placeholder="last name"
            label="Last name"
            //value={lnameValue}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ family_name: value })
            }
            placeholderTextColor={"#f09874"}
            color={"black"}
            height={28}
          />

      

          <Datepicker
            style={UserInfoStyles.datepicker}
            //onSelect={ () => this.setDate}
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
                    //leftIcon={{ type: 'font-awesome', name: 'lock' }}
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
                    //title = "Submit verification code"
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
