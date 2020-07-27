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
    top: hp('28%'),
    width: wp('20%'),
    height: hp('20.81%'),
    right: wp('25%'),
    resizeMode: "contain",
  },

  moodButton: {
    position: "absolute",
    top: hp('30%'),
    width: wp('20%'),
    height: hp('20.81%'),
    right: wp('3%'),
    resizeMode: "contain",
  },
  
  bloodButton: {
    position: "absolute",
    top: hp('30.5%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-18%'),
    resizeMode: "contain",
  },

  digestionButton: {
    position: "absolute",
    top: hp('30%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-39%'),
    resizeMode: "contain",
  },

  exerciseButton: {
    position: "absolute",
    top: hp('30%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-60.5%'),
    resizeMode: "contain",
  },

  medicationButton: {
    position: "absolute",
    top: hp('30%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-82.5%'),
    resizeMode: "contain",
  },

  dietButton: {
    position: "absolute",
    top: hp('28.5%'),
    width: wp('24.5%'),
    height: hp('20.81%'),
    right: wp('-106%'),
    resizeMode: "contain",

  },
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

  sexButton: {
    position: "absolute",
    top: hp('28.5%'),
    width: wp('23%'),
    height: hp('20.81%'),
    right: wp('-128.5%'),
    resizeMode: "contain",

  },
  appointmentButton: {
    position: "absolute",
    top: hp('-80%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-9%'),
    resizeMode: "contain",

  },
  appointmentText: {
    position: "absolute",
    top: hp('24%'),
    right: wp('43.5%'),
    resizeMode: "contain",
    fontWeight: 'bold',
    color: '#96969a',
    textAlign: 'left',
    fontSize: wp('2.7%'),


  },
  sexText: {
    color: '#96969a',
    textAlign: 'left',
    top: hp('45.5%'),
    left: wp('109.6%'),
    fontSize: wp('2.7%'),
    fontWeight: 'bold'
  },

  smallSaveText: {
    color: '#96969a',
    textAlign: 'left',
    top: hp('45.5%'),
    left: wp('118.5%'),
    fontSize: wp('2.7%'),
    fontWeight: 'bold'
  },

  saveButton: {
    position: "absolute",
    top: hp('28.5%'),
    width: wp('20%'),
    height: hp('20.81%'),
    right: wp('-149%'),
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

  doneButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: hp('70'),
    left: wp('5%'),
    width: wp('80%'),
  },
  girlSaveContainer: {
    left: wp('-3.5%'),
    height: hp('40%'),
    width: wp('85%'),
    top: -80,
  },

  saveText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: wp('8%'),
    top: hp('45%'),
  },
  saveLogText: {
    color: "black",
    textAlign: "center",
    fontSize: wp('3.5%'),
    top: hp('45%'),
    color: "#B3B3B3",
  },

  cardStyle: {
    top: hp('-4%'),
    width: wp('90%'),
    height: hp('71'),
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
    fontSize: wp('6.5%')
  },
  
  tag: {
    justifyContent: "left",
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 8,
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    borderRadius: 18,
    height: 35,
    color: '#8A8A8E',
    fontWeight:'500',
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
     
  },
  tagSelected: {
    justifyContent: "left",
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 2,
    color: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    height: 35,
    borderRadius: 18,
    fontWeight:'500',
    backgroundColor: '#f09874',
    

  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfbfb",
  },

  doctorContainer: {
    flex: 1,
    position: "absolute",
    width: wp('105%'),
    height: hp('50%'),
    top: hp('30%'),
    alignItems: "center",
    resizeMode: "contain",
  },

  xContainer: {
    position: "absolute",
    right: wp('0%'),
    top: hp('-5%'),
    width: wp('5%'),
    height: hp('5%'),
    resizeMode: "contain",
  },
  docContainer: {
    position: "absolute",
    right: wp('75%'),
    top: hp('10%'),
    width: wp('9%'),
    height: hp('9%'),
    resizeMode: "contain",
  },

  clinicContainer: {
    position: "absolute",
    right: wp('75%'),
    top: hp('30%'),
    width: wp('8%'),
    height: hp('8%'),
    resizeMode: "contain",
  },

  timeContainer: {
    position: "absolute",
    right: wp('75%'),
    top: hp('20%'),
    width: wp('8%'),
    height: hp('8%'),
    resizeMode: "contain",
  },
};
