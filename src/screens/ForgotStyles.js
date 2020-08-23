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
    width:Responsive.width(151),
    height:Responsive.height(150),
    top: Responsive.height(75),
    alignItems: "center",
    resizeMode: "contain",
  },
  bubbleContainer: {
    position: "absolute",
    right:Responsive.width(-87),
    top: hp('0%'),
    width:Responsive.width(322),
    height:Responsive.height(271),
    resizeMode: "contain",
  },

  newPassword: {
    position: "absolute",
    width:Responsive.width(330),
    height:Responsive.height(48),
    backgroundColor: "white",
    top: Responsive.height(439),
    borderRadius: Responsive.height(24),
  },

  emailInput: {
    position: "absolute",
    width:Responsive.width(330),
    height:Responsive.height(48),
    backgroundColor: "white",
    top: hp('48%'),
    borderRadius: Responsive.height(24),
  },

  confirmationButton: {
    position: "absolute",
    width:Responsive.width(330),
    height:Responsive.height(40),
    borderRadius: 24,
    top: Responsive.height(385),
    alignItems: "center",
  },

  confirmCode: {
    position: "absolute",
    width:Responsive.width(330),
    height:Responsive.height(48),
    backgroundColor: "white",
    top: Responsive.height(508),
    borderRadius: Responsive.height(24),
  },
  submitBtnContainer: {
    position: "absolute",
    width:Responsive.width(330),
    height:Responsive.height(40),
    borderRadius: Responsive.height(24),
    top: hp('91%'),
    alignItems: "center",
  },

  eluvoContainer: {
    position: "absolute",
    alignItems: "center",
    top:Responsive.height(170),
    width:Responsive.width(151),
    height:Responsive.height(150),
    resizeMode: "contain",
  },
  eluvoTextContainer: {
    position: "absolute",
    alignItems: "center",
    top:Responsive.height(280),
    width:Responsive.width(186),
    height:Responsive.height(22), 
    resizeMode: "contain",
  },
};