import { Dimensions } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
export const LoginStyles = {
  usernameInput: {
    position: "absolute",
    width: wp('90%'),
    height: hp('15%'),
    backgroundColor: "white",
    top: hp('68%'),
    borderRadius: 25,
    color: "black",
  },

  passwordInput: {
    position: "absolute",
    width: wp('90%'),
    height: hp('15%'),
    backgroundColor: "white",
    top: hp('78%'),
    borderRadius: 25,
  },

  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: "#f09874",
    paddingBottom: hp('40%'),
  },
  submitBtnContainer: {
    position: "absolute",
    width: wp('90%'),
    height: hp('5%'),
    borderRadius: 25,
    top: hp('91%'),
    alignItems: "center",
  },

  forgotBtnContainer: {
    position: "absolute",
    top: hp('86%'),
    left: wp('0%'),
  },
};