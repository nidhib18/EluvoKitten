import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Responsive from 'react-native-lightweight-responsive';
export const UserInfoStyles = {
  
  nameInput: {
    position: "absolute",
    width:Responsive.width(320),
    height:Responsive.height(48),
    backgroundColor: "white",
    top:Responsive.height(200),
    borderRadius: Responsive.height(24),
    color: "black",
    alignLabel: "left",
  },

  lnameInput: {
    position: "absolute",
    width:Responsive.width(320),
    height:Responsive.height(48),
    backgroundColor: "white",
    top:Responsive.height(280),
    borderRadius: Responsive.height(24),
  },

  datepicker: {
    width:Responsive.width(320),
    height:Responsive.height(48),
    position: "absolute",
    top:Responsive.height(620),
    borderRadius: Responsive.height(24),
  },
  submitBtnContainer: {
    position: "absolute",
    width:Responsive.width(320),
    height:Responsive.height(45),
    borderRadius: Responsive.height(24),
    top:Responsive.height(700),
    alignItems: "center",
  },
  label: {
    color: "#FFFFFF",
    fontSize: Responsive.font(18)
  },
};
