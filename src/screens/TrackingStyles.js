import { Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
export const TrackingStyles = {
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  painButton: {
    position: "absolute",
    top: Responsive.height(214),
    width:Responsive.width(69),
    height:Responsive.height(76),
    right: Responsive.width(90),
    resizeMode: "contain",
  },

  moodButton: {
    position: "absolute",
    top: Responsive.height(214),
    width:Responsive.width(95),
    height:Responsive.height(95),
    right: Responsive.width(-1),
    resizeMode: "contain",
  },
  
  bloodButton: {
    position: "absolute",
    top: Responsive.height(216),
    width:Responsive.width(98),
    height:Responsive.height(98),
    right: Responsive.width(-75),
    resizeMode: "contain",
  },

  digestionButton: {
    position: "absolute",
    top: Responsive.height(215),
    width:Responsive.width(92),
    height:Responsive.height(92),
    right: Responsive.width(-147),
    resizeMode: "contain",
  },

  exerciseButton: {
    position: "absolute",
    top: Responsive.height(216),
    width:Responsive.width(92),
    height:Responsive.height(92),
    right: Responsive.width(-222),
    resizeMode: "contain",
  },

  medicationButton: {
    position: "absolute",
    top: Responsive.height(216),
    width:Responsive.width(92),
    height:Responsive.height(92),
    right: Responsive.width(-298),
    resizeMode: "contain",
  },

  dietButton: {
    position: "absolute",
    top: Responsive.height(209),
    width:Responsive.width(81),
    height:Responsive.height(83),
    right: Responsive.width(-367),
    resizeMode: "contain",

  },
  dietText: {
    color: '#96969a',
    textAlign: 'left',
    top: Responsive.width(293),
    right: Responsive.width(-320),
    fontSize: Responsive.font(9.5),
    fontWeight: 'bold'
  },

  painText: {
    color: '#96969a',
    textAlign: 'left',
    top: Responsive.width(293),
    right: Responsive.width(170.5),
    fontSize: Responsive.font(10),
    fontWeight: 'bold'
  },

  sexButton: {
    position: "absolute",
    top: Responsive.height(208),
    width:Responsive.width(76),
    height:Responsive.height(81),
    right: Responsive.width(-444),
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
  sexText: {
    color: '#96969a',
    textAlign: 'left',
    top: Responsive.height(293),
    right: Responsive.width(-380),
    fontSize: Responsive.font(9.5),
    fontWeight: 'bold'
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
    position: "absolute",
    top: Responsive.height(212),
    width:Responsive.width(72),
    height:Responsive.height(73),
    right: Responsive.width(-520),
    resizeMode: "contain",
  },

  trackButton: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    top: Responsive.height(398),
   // left: wp('5%'),
    backgroundColor: "#f09874",
    borderRadius: 25,
    width:Responsive.width(290),
    height:Responsive.height(28),

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
    width:Responsive.width(285),
    height:Responsive.height(285),
    top: -80,
  },

  saveText: {
    color: "black",
    textAlign: "center",
    fontWeight: "500",
    fontSize: Responsive.font(26),
    top:Responsive.height(287),
  },
  saveLogText: {
    color: "black",
    textAlign: "center",    
    fontWeight: "500",
    fontSize: Responsive.font(13),
    top:Responsive.height(297),
    color: "#B3B3B3",
  },

  cardStyle: {
    top:Responsive.height(-17),
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
    fontWeight: '700',
    fontSize: Responsive.font(25),
  },
  
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
    fontWeight:'500',
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
   
    backgroundColor: "#fbfbfb",
  },

  // doctorContainer: {
  //   flex: 1,
  //   position: "absolute",
  //   width: wp('105%'),
  //   height: hp('50%'),
  //   top: hp('30%'),
  //   alignItems: "center",
  //   resizeMode: "contain",
  // },

  xContainer: {
    position: "absolute",
    right: wp('0%'),
    top: Responsive.height(-25),
    width:Responsive.width(20),
    height:Responsive.height(20),
    resizeMode: "contain",
  },
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
