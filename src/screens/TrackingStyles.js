import { Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
import Responsive from 'react-native-lightweight-responsive';
// import EStyleSheet from 'react-native-extended-stylesheet';
// const entireScreenWidth = Dimensions.get('window').width;
// EStyleSheet.build({$rem: entireScreenWidth / 380});
export const TrackingStyles= {
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  painButton: {
    position: "absolute",
    top: hp('29.5%'),
    width: wp('21%'),
    height: hp('22%'),
    right: wp('25%'),
    resizeMode: "contain",
  },

  moodButton: {
    position: "absolute",
    top: hp('30%'),
    width: wp('20%'),
    height: hp('20.81%'),
    right: wp('4%'),
    resizeMode: "contain",
  },
  
  bloodButton: {
    position: "absolute",
    top: hp('30.8%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-17%'),
    resizeMode: "contain",
  },

  digestionButton: {
    position: "absolute",
    top: hp('30%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-38%'),
    resizeMode: "contain",
  },

  exerciseButton: {
    position: "absolute",
    top: hp('30%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-59.5%'),
    resizeMode: "contain",
  },

  medicationButton: {
    position: "absolute",
    top: hp('30.5%'),
    width: wp('22%'),
    height: hp('20%'),
    right: wp('-81.5%'),
    resizeMode: "contain",
  },

  dietButton: {
    position: "absolute",
    top: hp('28.5%'),
    width: wp('22.8%'),
    height: hp('23.81%'),
    right: wp('-104%'),
    resizeMode: "contain",

  },
  // dietText: {
  //   color: '#96969a',
  //   textAlign: 'left',
  //   top: Responsive.width(293),
  //   right: Responsive.width(-320),
  //   fontSize: Responsive.font(9.5),
  //   fontWeight: 'bold'
  // },

  // painText: {
  //   color: '#96969a',
  //   textAlign: 'left',
  //   top: Responsive.width(293),
  //   right: Responsive.width(170.5),
  //   fontSize: Responsive.font(10),
  //   fontWeight: 'bold'
  // },

  sexButton: {
    position: "absolute",
    top: hp('28.4%'),
    width: wp('22%'),
    height: hp('23.81%'),
    right: wp('-125.8%'),
    resizeMode: "contain",

  },
  // appointmentButton: {
  //   position: "absolute",
  //   top: hp('-80%'),
  //   width: wp('22%'),
  //   height: hp('20.81%'),
  //   right: wp('-9%'),
  //   resizeMode: "contain",

  // },
  // appointmentText: {
  //   position: "absolute",
  //   top: hp('24%'),
  //   right: wp('43.5%'),
  //   resizeMode: "contain",
  //   fontWeight: 'bold',
  //   color: '#96969a',
  //   textAlign: 'left',
  //   fontSize: wp('2.7%'),


  // },
  dietText: {
    color: '#96969a',
    textAlign: 'left',
    top: hp('45.5%'),
    left: wp('92%'),
    fontSize: wp('2.7%'),
    fontWeight: 'bold'
  },

  painText: {
    color: '#96969a',
    textAlign: 'left',
    top: hp('45.3%'),
    right: wp('47.5%'),
    fontSize: wp('2.9%'),
    fontWeight: 'bold'
  },
  sexText: {
    color: '#96969a',
    textAlign: 'left',
    top: hp('45.5%'),
    left: wp('110.6%'),
    fontSize: wp('2.7%'),
    fontWeight: '500'
  },


  smallSaveText: {
    color: '#96969a',
    textAlign: 'left',
    top: Responsive.height(292),
    right: Responsive.width(-414),
    fontSize: Responsive.font(9.5),
    fontWeight: 'bold'
  },

  saveButton: {
    position: "absolute",
    top: hp('29.6%'),
    width: wp('23%'),
    height: hp('22.81%'),
    right: wp('-147.8%'),
    resizeMode: "contain",
  },

  trackButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: hp('62.5'),
    left: wp('5%'),
    backgroundColor: "#f09874",
    borderRadius: 25,
    width: wp('80%'),

  },

  // doneButton: {
  //   position: "absolute",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   top: hp('70'),
  //   left: wp('5%'),
  //   width: wp('80%'),
  // },
  girlSaveContainer: {
   
    alignSelf:'center',
    width:Responsive.width(280),
    height:Responsive.height(310),
    top: Responsive.height(-90),
    resizeMode: "contain",
  },

  saveText: {
    color: "black",
    textAlign: "center",
    fontWeight: "600",
    fontSize: Responsive.font(26),
    top:Responsive.height(275),
  },
  saveLogText: {
    color: "black",
    textAlign: "center",    
    fontWeight: "500",
    fontSize: Responsive.font(13),
    top:Responsive.height(290),
    color: "#B3B3B3",
  },

  cardStyle: {
    top:Responsive.height(-26),
    width:Responsive.width(325),
    height:Responsive.height(450),
    borderRadius: 20,
    borderBottomColor: '#ffffff',
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#ffffff',
    backgroundColor: '#ffffff',
    shadowColor: '#c8c8c8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
   
  
  symptomText: {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: Responsive.font(25),
  },
  
  // tag: {
  //   justifyContent: "centre",
  //   includingFontPadding:true,
  //   paddingBottom: Responsive.height(8),
  //   paddingTop: Responsive.height(8),
  //   paddingLeft: Responsive.width(16),
  //   paddingRight: Responsive.width(16),
  //   marginLeft: Responsive.width(8),
  //   marginBottom: Responsive.height(8),
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   overflow: 'hidden',
  //   borderRadius: Responsive.height(14),
  //   height:Responsive.height(25),
  //   //padding:3,
  
  //   //width:Responsive.height(100),
  //   color: '#8A8A8E',
  //   fontWeight:'500',
  //   backgroundColor: 'rgba(118, 118, 128, 0.12)',
    
     
  // },
  tag: {
    justifyContent: "left",
    paddingBottom: Responsive.height(8),
    paddingTop: Responsive.height(8),
    paddingLeft: Responsive.width(16),
    paddingRight: Responsive.width(16),
    marginLeft: Responsive.width(8),
    marginBottom: Responsive.height(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    borderRadius: Responsive.height(14),
    height: Responsive.height(30),
    color: '#8A8A8E',
    fontWeight:'400',
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    
  },
  tagSelected: {
    justifyContent: "left",
    paddingBottom: Responsive.height(8),
    paddingTop: Responsive.height(8),
    paddingLeft: Responsive.width(16),
    paddingRight: Responsive.width(16),
    marginLeft: Responsive.width(8),
    marginBottom: Responsive.height(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    borderRadius: Responsive.height(14),
    height: Responsive.height(30),
    color: 'white',
    fontWeight:'500',
    backgroundColor: '#f09874',
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex:1,
    backgroundColor: "#fbfbfb",
  },

  xContainer: {
    //flex: 1,
    position: "absolute",
    width: wp('5%'),
    height: hp('5%'),
    top: hp('3%'),
    right:wp('4%'),
    //alignItems: "center",
    resizeMode: "contain",
  },
  painContainer: {
    //flex: 1,
    position: "absolute",
    width: wp('5%'),
    height: hp('5%'),
    top: hp('15%'),
    right:wp('45%'),
    //alignItems: "center",
    resizeMode: "contain",
  },
  xContainerSave: {
    //flex: 1,
    position: "absolute",
    width: wp('5%'),
    height: hp('5%'),
    top: hp('3%'),
    right:wp('2%'),
    //alignItems: "center",
    resizeMode: "contain",
  }

  // xContainer: {
  //   position: "absolute",
  //   right: wp('0%'),
  //   top: Responsive.height(-25),
  //   width:Responsive.width(20),
  //   height:Responsive.height(20),
  //   resizeMode: "contain",
  // },
  // docContainer: {
  //   position: "absolute",
  //   right: wp('75%'),
  //   top: hp('10%'),
  //   width: wp('9%'),
  //   height: hp('9%'),
  //   resizeMode: "contain",
  // },

  // clinicContainer: {
  //   position: "absolute",
  //   right: wp('75%'),
  //   top: hp('30%'),
  //   width: wp('8%'),
  //   height: hp('8%'),
  //   resizeMode: "contain",
  // },

  // timeContainer: {
  //   position: "absolute",
  //   right: wp('75%'),
  //   top: hp('20%'),
  //   width: wp('8%'),
  //   height: hp('8%'),
  //   resizeMode: "contain",
  // },
};