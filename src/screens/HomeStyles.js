
import { Dimensions } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
export const HomeStyles = {
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfbfb",
  },

  girlContainer: {
    flex: 1,
    position: "absolute",
    width: wp('95%'),
    height: hp('30%'),
    top: hp('40%'),
    alignItems: "center",
    resizeMode: "contain",
  },
  headerText: {
    position: "absolute",
    height: hp('20%'),
    width: wp('90%'),
    color: "#8A8A8E",
    fontSize:  wp('5%'),
    letterSpacing: -0.2,
    lineHeight: wp('5%'),
    alignItems: "center",
    left: wp('14%'),
    top: hp('75%'),
  },

  ovalContainer: {
    flex: 1,
    position: "absolute",
    width: wp('40%'),
    height: hp('15%'),
    top: hp('60%'),
    left: wp('-21%'),
    alignItems: "center",
    resizeMode: "contain",
  },

  

 
};
