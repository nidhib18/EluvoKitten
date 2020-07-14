import { Dimensions } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
export const ForgotStyles = {
  headerText: {
    position: "absolute",
    fontSize: 25,
    fontWeight: "bold",
    top: hp('55%'),
    alignItems: "center",
  },

  logoContainer: {
    flex: 1,
    position: "absolute",
    width: wp('65.98%'),
    height: hp('20.81%'),
    top: hp('10%'),
    alignItems: "center",
    resizeMode: "contain",
  },
  bubbleContainer: {
    position: "absolute",
    right: wp('-23%'),
    top: hp('0%'),
    width: wp('87%'),
    height: hp('44%'),
    resizeMode: "contain",
  },

  newPassword: {
    position: "absolute",
    width: wp('90%'),
    height: hp('5%'),
    backgroundColor: "white",
    top: hp('68%'),
    borderRadius: 25,
  },

  emailInput: {
    position: "absolute",
    width: wp('90%'),
    height: hp('5%'),
    backgroundColor: "white",
    top: hp('48%'),
    borderRadius: 25,
  },

  confirmationButton: {
    position: "absolute",
    width: wp('90%'),
    height: hp('5%'),
    borderRadius: 24,
    top: hp('61%'),
    alignItems: "center",
  },

  confirmCode: {
    position: "absolute",
    width: wp('90%'),
    height: hp('5%'),
    backgroundColor: "white",
    top: hp('79%'),
    borderRadius: 25,
  },
  submitBtnContainer: {
    position: "absolute",
    width: wp('90%'),
    height: hp('5%'),
    borderRadius: 24,
    top: hp('91%'),
    alignItems: "center",
  },

  eluvoContainer: {
    position: "absolute",
    alignItems: "center",
    top: hp('35%'),
    width: wp('60%'),
    height: hp('6%'),
    resizeMode: "contain",
  },
  eluvoTextContainer: {
    position: "absolute",
    alignItems: "center",
    top: hp('42%'),
    width: wp('50%'),
    height: hp('5%'),
    resizeMode: "contain",
  },
};
