import { Dimensions } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
export const LoginStyles = {
  usernameInput: {
    position: "absolute",
    width:Responsive.width(330),
    height:Responsive.height(48),
    backgroundColor: "white",
    top:Responsive.height(430),
    borderRadius: Responsive.height(24),
    color: "black",
  },

  passwordInput: {
    position: "absolute",
    width:Responsive.width(330),
    height:Responsive.height(48),
    backgroundColor: "white",
    top:Responsive.height(495),
    borderRadius: Responsive.height(24),
  },

  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: "#f09874",
    paddingBottom: hp('40%'),
  },
  submitBtnContainer: {
    position: "absolute",
    width:Responsive.width(330),
    height:Responsive.height(40),
    borderRadius: Responsive.height(24),
    top:Responsive.height(585),
    alignItems: "center",
    
  },

  forgotBtnContainer: {
    position: "absolute",
    top:Responsive.height(545),
    left: wp('0%'),
    
  },
};