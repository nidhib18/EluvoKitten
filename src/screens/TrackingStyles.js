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
    right: wp('0%'),
    resizeMode: "contain",
  },
  slider: {
    top: hp('7%'),
    width: wp('80%'),
    height: hp('20.81%'),
    flex: 1,
    left: -10,
    backgroundColor: '#FFF'
  },

  bloodButton: {
    position: "absolute",
    top: hp('30.5%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-25%'),
    resizeMode: "contain",
  },

  digestionButton: {
    position: "absolute",
    top: hp('30%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-50%'),
    resizeMode: "contain",
  },

  exerciseButton: {
    position: "absolute",
    top: hp('30%'),
    width: wp('20%'),
    height: hp('20.81%'),
    right: wp('-75%'),
    resizeMode: "contain",
  },

  medicationButton: {
    position: "absolute",
    top: hp('30%'),
    width: wp('20%'),
    height: hp('20.81%'),
    right: wp('-100%'),
    resizeMode: "contain",
  },

  dietButton: {
    position: "absolute",
    top: hp('28.5%'),
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-127%'),
    resizeMode: "contain",

  },
  dietText: {
    color: '#96969a',
    textAlign: 'left',
    top: hp('45%'),
    left: wp('114%'),
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
    width: wp('22%'),
    height: hp('20.81%'),
    right: wp('-150%'),
    resizeMode: "contain",

  },
  sexText: {
    color: '#96969a',
    textAlign: 'left',
    top: hp('45%'),
    left: wp('131.6%'),
    fontSize: wp('2.7%'),
    fontWeight: 'bold'
  },

  saveButton: {
    position: "absolute",
    top: hp('28.5%'),
    width: wp('20%'),
    height: hp('20.81%'),
    right: wp('-175%'),
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
    // borderBottomColor:'#ffffff',
    // borderTopColor:'#ffffff',
    // borderLeftColor:'#ffffff',
    // borderRightColor:'#ffffff',
    backgroundColor: '#ffffff'
  },
  symptomText: {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: wp('8%')
  }
  ,
  tagStyle: {
    alignSelf: "center",
    fontSize: 12,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    height: 32,
    margin: 2,
    color: "white",
    backgroundColor: "#f09874",
    //borderRadius: 25,
    borderTopEndRadius:15,
        borderBottomEndRadius:15,
        borderTopLeftRadius:15,
        borderTopRightRadius:15
        
  },

  tag: {
    alignSelf: 'center',
    fontSize: 12,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    height: 32,
    margin: 2,
    backgroundColor: '#EBF1FD',
    borderBottomEndRadius:15,
    borderTopEndRadius:15,
    borderBottomEndRadius:15,
    borderTopLeftRadius:15,
    borderTopRightRadius:15
   
},

  
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfbfb",
  },
};
