
import { Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
    width: Responsive.width(121),
    height: Responsive.height(206),
    top: Responsive.height(90),
    alignSelf: "center",
    resizeMode: "contain",
  },
  headerText: {
    position: "absolute",
    color: "#8A8A8E",
    fontSize: Responsive.width(16),
    letterSpacing: -0.2,
    fontWeight: '500',
    alignSelf: 'center',
    top: Responsive.height(316),
  },

  ovalContainer: {
    flex: 1,
    position: "absolute",
    width: Responsive.width(100),
    height: Responsive.height(100),
    top: Responsive.height(180),
    left: Responsive.width(-57),
    alignItems: "center",
    resizeMode: "contain",
  },

  tabContainer: {
    flex: 1,
    position: "absolute",
    width: Responsive.width(450),
    height: Responsive.height(50),
    top: Responsive.height(590),
    left: wp('0%'),
    alignItems: "center",

  },
  careplan: {
    flex: 1,
    position: "absolute",
    width: Responsive.width(50),
    height: Responsive.height(50),
    top: Responsive.height(230),
    left: Responsive.width(-170),
    alignItems: "center",
    resizeMode: "contain",

  },
  insights: {
    flex: 1,
    position: "absolute",
    width: Responsive.width(50),
    height: Responsive.height(50),
    top: Responsive.height(230),
    left: Responsive.width(-110),
    alignItems: "center",
    resizeMode: "contain",

  },
  learn: {
    flex: 1,
    position: "absolute",
    width: Responsive.width(45),
    height: Responsive.height(45),
    top: Responsive.height(230),
    left: Responsive.width(50),
    alignItems: "center",
    resizeMode: "contain",

  },
  settings: {
    flex: 1,
    position: "absolute",
    width: Responsive.width(45),
    height: Responsive.height(45),
    top: Responsive.height(230),
    left: Responsive.width(125),
    alignItems: "center",
    resizeMode: "contain",

  },
};