import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Responsive from 'react-native-lightweight-responsive';
export const ImageStyles = {
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  logoContainer: {
    flex: 1,
    position: "absolute",
    // width: wp('65.98%'),
    // height: hp('20.81%'),
    width:Responsive.width(151),
    height:Responsive.height(150),
    top: Responsive.height(200),
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

  squiggleContainer: {
    position: "absolute",
    right:Responsive.width(110.36),
    top: Responsive.height(427.86),
    width:Responsive.width(280.36),
    height:Responsive.height(165.86),
    resizeMode: "contain",
  },

  dotsContainer: {
    position: "absolute",
    left:  Responsive.width(-17),
    top: Responsive.height(127),
    // height: hp('20%'),
    // width: wp('25%'),
    width:Responsive.width(114),
    height:Responsive.height(108),
    resizeMode: "contain",
  },

  eluvoContainer: {
    position: "absolute",
    alignItems: "center",
    top:Responsive.height(300),
    //height: hp('10%'),
    
    width: wp('30%'),
    width:Responsive.width(151),
    height:Responsive.height(150),
    resizeMode: "contain",
  },
  eluvoTextContainer: {
    position: "absolute",
    alignItems: "center",
    top:Responsive.height(408),
    // height: hp('3'),
    // width: wp('50%'),
    width:Responsive.width(186),
    height:Responsive.height(22),
    
    resizeMode: "contain",
  },
};