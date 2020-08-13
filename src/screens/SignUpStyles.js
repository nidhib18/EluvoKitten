import { Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
export const SignUpStyles = {
  headerText: {
    position: "absolute",
    fontSize: wp('8%'),
    fontWeight: "bold",
    top: hp('7%'),
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
    width: wp('90%'),
    height: hp('5%'),
    backgroundColor: "white",
    top: hp('18%'),
    borderRadius: 24,
  },

  emailInput: {
    position: "absolute",
    width: wp('90%'),
    backgroundColor: "white",
    top: hp('57%'),
    borderRadius: 24,
    color: "black",
  },

  passwordInput: {
    position: "absolute",
    width: wp('90%'),
    height: hp('15%'),
    backgroundColor: "white",
    borderRadius: 24,
    top: hp('70%'),
  },

  passwordConfirmInput: {
    position: "absolute",
    width: wp('90%'),
    height: hp('15%'),
    backgroundColor: "white",
    top: hp('85%'),
    borderRadius: 24,
  },

};
