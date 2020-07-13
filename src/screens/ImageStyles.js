import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
    width: wp('65.98%'),
    height: hp('20.81%'),
    top: hp('33.81%'),
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

  squiggleContainer: {
    position: "absolute",
    right: wp('25%'),
    top: hp('55%'),
    height: hp('29%'),
    width: wp('100%'),
    resizeMode: "contain",
  },

  dotsContainer: {
    position: "absolute",
    right: wp('75%'),
    top: hp('20%'),
    height: hp('20%'),
    width: wp('25%'),
    resizeMode: "contain",
  },

  eluvoContainer: {
    position: "absolute",
    alignItems: "center",
    top: hp('55%'),
    height: hp('10%'),
    width: wp('30%'),
    resizeMode: "contain",
  },
  eluvoTextContainer: {
    position: "absolute",
    alignItems: "center",
    top: hp('64%'),
    height: hp('3'),
    width: wp('50%'),
    resizeMode: "contain",
  },
};
