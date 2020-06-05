// import { Auth } from "aws-amplify"
// import React,{Component} from 'react';
// import { SafeAreaView, Image } from 'react-native';
// import { Divider, Input, Icon, Layout, Text, TopNavigation, TopNavigationAction, evaProps, Button } from '@ui-kitten/components';
// import { ImageStyles } from "./ImageStyles";
// import { ForgotStyles } from "./ForgotStyles";

// export default class ForgotPasswordScreen extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//           email:"",
//       }
//     };
// forgotPassword = () => 
// {
 
//     Auth.forgotPassword(email)
//   .then(data => console.log('New code sent', data))
//   .catch(err => {
//     if (! err.message) {
//       console.log('Error while setting up the new password: ', err)
//       Alert.alert('Error while setting up the new password: ', err)
//     } else {
//       console.log('Error while setting up the new password: ', err.message)
//       Alert.alert('Error while setting up the new password: ', err.message)
//     }
//   })

//  };

//  // Upon confirmation redirect the user to the Sign In page
//   forgotPasswordSubmit = () =>
// {
//     const { username, authCode, newPassword } = this.state
//      Auth.forgotPasswordSubmit(email, authCode, newPassword)
//     .then(() => 
//     {
//       this.props.navigation.navigate('SignIn')
//       console.log('the New password submitted successfully')
//     })
//     .catch(err => 
//     {
//       if (! err.message) {
//         console.log('Error while confirming the new password: ', err)
//         Alert.alert('Error while confirming the new password: ', err)
//       } else {
//         console.log('Error while confirming the new password: ', err.message)
//         Alert.alert('Error while confirming the new password: ', err.message)
//       }

//     } 
//     );
// }




// render ()
// {
//     return (
//         <Layout style={ImageStyles.mainContainer}>

//             <TopNavigation position='absolute' />
//             <Divider />
            
             
//             <Image
//                 style={ImageStyles.logoContainer}
//                 source={require('../../assets/logo.png')}
//             />

//             <Image
//                 style={ImageStyles.bubbleContainer}
//                 source={require('../../assets/bubble.png')}
//             />

//             <Image
//                 style={ImageStyles.squiggleContainer}
//                 source={require('../../assets/squiggle.png')}
//             />

//             <Image
//                 style={ImageStyles.dotsContainer}
//                 source={require('../../assets/dots.png')}
//             />

//             <Image
//                 style={ImageStyles.eluvoContainer}
//                 source={require('../../assets/eluvo.png')}
//             />

//             <Image
//                 style={ImageStyles.eluvoTextContainer}
//                 source={require('../../assets/eluvotext.png')}
//             />

//             <Input
//                 style={ForgotStyles.emailInput}
//                 placeholder='enter your email'
//                 label='Email'
//                 value={emailValue}
//                 onChangeText={nextValue => setEmailValue(nextValue)}
//                 placeholderTextColor={'#f09874'}
//                 color={'black'}
//                 height={28}

//             />
//             <Text
//                 style={ForgotStyles.headerText}>Forgot Password? No Worries :) </Text>

//             <Button style={ForgotStyles.submitBtnContainer}
//                 appearance='outline'
//                 status='warning'
                
//                 onPress={this.forgotPassword}>Submit</Button>
//                // onPress={() => navigation.navigate('Home')}

               
//         </Layout>


//     );

//     }
    
// }
