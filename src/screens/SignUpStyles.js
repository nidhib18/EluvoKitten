import { Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");


export const SignUpStyles = {
  headerText: {
    position: "absolute",
    fontSize: Responsive.font(26),
    fontWeight: "500",
    top:Responsive.height(60),
    alignItems: "center",
  },
  //
  modal: {
    position: "absolute",
    width: width - 55,
    height: 80,
    backgroundColor: "white",
    borderRadius: 24,
    top: 500,
  },

  submit: {
    position: "absolute",
    width: width - 55,
    height: 45,
    borderRadius: 24,
    top: 590,
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#f09874",
    alignItems: "center",
    justifyContent: "center",
  },

  usernameInput: {
    position: "absolute",
    width:Responsive.width(320),
    height:Responsive.height(45),
    backgroundColor: "white",
    top:Responsive.height(120),
    borderRadius: Responsive.height(24),
  },

  emailInput: {
    position: "absolute",
    width:Responsive.width(320),
    height:Responsive.height(45),
    backgroundColor: "white",
    top:Responsive.height(360),
    borderRadius: Responsive.height(24),
    color: "black",
  },

  passwordInput: {
    position: "absolute",
    width:Responsive.width(320),
    height:Responsive.height(45),
    backgroundColor: "white",
    borderRadius: Responsive.height(24),
    top:Responsive.height(440),
  },

  passwordConfirmInput: {
    position: "absolute",
    width:Responsive.width(320),
    height:Responsive.height(45),
    backgroundColor: "white",
    top:Responsive.height(540),
    borderRadius: Responsive.height(24),
  },

};