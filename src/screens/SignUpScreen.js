import React, { Component} from "react";
import 
{
  SafeAreaView,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
 Dimensions,
  Modal
} from "react-native";

import
 {
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
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { UserInfoStyles } from "./UserInfoStyles";
import { Auth } from "aws-amplify";
import UserInfoScreen from "./UserInfoScreen";

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

  const { sheight } = Dimensions.get('window').height;
 
//   const now = new Date();
//     const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30000);
    
//     const useDatepickerState = (initialDate = null) => {
//         const [date, setDate] = React.useState(initialDate);
//         return { date, onSelect: setDate };
//     };
//     const minMaxPickerState= useDatepickerState();

    
  
//   const CalendarIcon = (props) => (
//     <Icon {...props} name='calendar' />
// );
export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //*******changed firstName to given_name ********
      given_name: "",   //*******changed firstName to given_name ********
      family_name: "",
      email: "",
      username: "", 
      password: "",
      confirmPassword: " ",
      //birthdate:new Date(),
      screenHeight:sheight,
      
      confirmationCode: "",
      //secureTextEntry:false,
       modalVisible: false,
       
       
 
    };
    
    
        
    
  }
       
  // const [nameValue, setNameValue] = React.useState("");
  // const [lnameValue, setLnameValue] = React.useState("");
  // trial = () => 
  // {

  //   this.state = {birthdate},
  //   this.setState ={setDate=useState(new Date()) };
 
  // }
  
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  navigateBack = () => {
    navigation.goBack();
  };

   BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
 
      
 toggleSecureEntry = () => 
 {

    setSecureTextEntry(!secureTextEntry);
  };

  AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

  renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={this.toggleSecureEntry}>
      <Icon
        {...props}
        name={this.secureTextEntry ? "eye-off" : "eye"}
        fill="#000000"
      />
    </TouchableWithoutFeedback>
  );


  handleSignUp = () => 
  {
    // alert(JSON.stringify(this.state));
    const { given_name,family_name,username,email, password, confirmPassword,birthdate} = this.state;
    // Make sure passwords match
    if (password === confirmPassword) 
    {
      Auth.signUp({username: username,password,email,given_name,family_name,birthdate,attributes: {email,family_name,given_name,birthdate},})
        // On success, show Confirmation Code Modal
        .then(() => this.setState({ modalVisible: true }))
        
        // On failure, display error in console
        .catch((err) => console.log(err));
    } 
    else 
    {   
      alert("Passwords do not match.");
    }
  };

  handleConfirmationCode = () => {
    const { username,confirmationCode } = this.state;
    Auth.confirmSignUp(username, confirmationCode, {})
      .then(() => {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate('Home')
      })
      .catch(err => console.log(err));
  }
 
  render() 

  {
    //now= new Date();
  //   yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30000);
    
  //   useDatepickerState = (initialDate = null) => {
  //       const [date, setDate] = this.setState(initialDate);
  //       return { date, onSelect: setDate };
  //   };
  //  minMaxPickerState= useDatepickerState();
   
    return (
    
      <ScrollView style = {{backgroundColor:'#0000ff'}}
      //scrollEnabled={scrollEnabled}
      //bounces={false}
        contentContainerStyle={SignUpStyles.scrollView}
      //onContentSizeChange={this.onContentSizeChange}
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
          placeholder="first name"
          //value={nameValue}
          label="First name"
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({given_name: value })
          }
          placeholderTextColor={"#f09874"}
          color={"black"}
          height={28}
        />
        <Input
          style={SignUpStyles.usernameInput}
          placeholder={"enter a username"}
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
          placeholder={"enter your email"}
          label="Email"
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
          //placeholder='password'
          accessoryRight={this.renderIcon}
          secureTextEntry={this.secureTextEntry}
          placeholder={"password"}
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
          placeholder={"confirm password"}
          caption="Should contain at least 8 symbols"
          accessoryRight={this.renderIcon}
          captionIcon={this.AlertIcon}
          secureTextEntry={this.secureTextEntry}
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
          placeholder="enter your last name"
          label="Last name"
          //value={lnameValue}
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({family_name: value })
          }
          placeholderTextColor={"#f09874"}
          color={"black"}
          height={28}
        />


            <Input
              style={UserInfoStyles.datepicker}
              placeholder={"Birth date"}
              label='Date of Birth'
              
           //accessoryRight={CalendarIcon}
               placeholder='dd/mm/yy'
              onChangeText={
                // Set this.state.email to the value in this Input box
                (value) => this.setState({ birthdate: value })
              }
              placeholderTextColor="#ffff"
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
        <Modal
          visible={this.state.modalVisible}
        >
          <Layout
            style={SignUpStyles.container}
          >
            <Input
             style = {SignUpStyles.modal}
              label="Confirmation Code"
              placeholderTextColor={'#f09874'}
              //leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ confirmationCode: value })

              }
              color={'black'}
            />
            <Button
              style={SignUpStyles.submit}
              title='Submit'
              //appearance='ghost'
              status='warning'
              onPress={ this.handleConfirmationCode }
            />
          </Layout>
        </Modal>

     
        </Layout>
     
      
        </ScrollView>

  
  

    );
  }
}
