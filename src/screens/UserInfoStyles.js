import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const UserInfoStyles = {
  
  nameInput: {
    position: "absolute",
    width: wp('90%'),
    height: hp('5%'),
    backgroundColor: "white",
    top: hp('31%'),
    borderRadius: 24,
    color: "black",
    alignLabel: "left",
  },

  lnameInput: {
    position: "absolute",
    width: wp('90%'),
    height: hp('5%'),
    backgroundColor: "white",
    top: hp('44%'),
    borderRadius: 25,
  },

  datepicker: {
    width: wp('90%'),
    position: "absolute",
    top: hp('98%'),
    borderRadius: 24,
  },
  submitBtnContainer: {
    position: "absolute",
    width: wp('90%'),
    height: hp('5%'),
    borderRadius: 24,
    top: hp('111%'),

    alignItems: "center",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 18,
  },
};
