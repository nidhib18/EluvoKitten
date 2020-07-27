
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
    top: hp('15%'),
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
    top: hp('50%'),
  },

  ovalContainer: {
    flex: 1,
    position: "absolute",
    width: wp('38%'),
    height: hp('15%'),
    top: hp('28%'),
    left: wp('-21%'),
    alignItems: "center",
    resizeMode: "contain",
  },

  tabContainer: {
    flex: 1,
    position: "absolute",
    width: wp('150%'),
    height: hp('9%'),
    top: hp('92%'),
    left: wp('0%'),
    alignItems: "center",
    
  },
  careplan: {
    flex: 1,
    position: "absolute",
    width: wp('15%'),
    height: hp('15%'),
    top: hp('32.5'),
    left: wp('-48%'),
    alignItems: "center",
    resizeMode: "contain",
    
  },
  insights: {
    flex: 1,
    position: "absolute",
    width: wp('15%'),
    height: hp('15%'),
    top: hp('32'),
    left: wp('-30%'),
    alignItems: "center",
    resizeMode: "contain",
    
  },
  learn: {
    flex: 1,
    position: "absolute",
    width: wp('13%'),
    height: hp('13%'),
    top: hp('33'),
    left: wp('16%'),
    alignItems: "center",
    resizeMode: "contain",
    
  },
  settings: {
    flex: 1,
    position: "absolute",
    width: wp('13%'),
    height: hp('13%'),
    top: hp('33'),
    left: wp('35%'),
    alignItems: "center",
    resizeMode: "contain",
    
  },




  

 
};
