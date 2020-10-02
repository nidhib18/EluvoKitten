import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
} from "react-native";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Card,
  Toggle,
} from "@ui-kitten/components";
import { ImageStyles } from "./ImageStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
import Constants from 'expo-constants';
import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import {saveUserSettings} from "../helpers/SettingHelpers";
import {
  utcToLocal,
  localToUtcDate,
  localToUtcDateTime,
} from "../helpers/DateHelpers"
import Responsive from "react-native-lightweight-responsive";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
export default class EditAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      userDetails: {},
      appointmentDetails:[],
      
      currentDate:
        (this.props &&
          this.props.route &&
          this.props.route.params &&
          this.props.route.params.currentDate) ||
        moment().format("YYYY-MM-DD"),
    
      // If any data is available, then we need to display the card
      isAnyDataAvailable: false,
      isAnyAppointmentAvailable:false,
    };

    this.getAllAppointments = this.getAllAppointments.bind(this);

  }
  
  
  // constructor() {
    //     super();
    //     this.state = {
    //       show: false,
    //       PainCard: false,
    //       activeSwitch: null,
    //       userDetails: {},
    //       userSettings: {}
    //     };
    //   }


    getAllAppointments()
    {
      let userId = this.state.userDetails.user_id;
      let url = constants.GETALLAPPOINTMENTS_DEV_URL.replace("[userId]", userId)
        console.log ("All the Appointments as a list URL"+url);
        var isAnyAppointmentAvailable = false;  
        var appointmentDetails = [];
        getData(constants.JWTKEY).then((jwt) =>
          fetch(url, {
            //calling API
            method: "GET",
            headers: {
              Authorization: "Bearer " + jwt, //Passing this will authorize the user
            },
          })
            .then((response) => response.json())
            .then((responseData) => {
              console.log("Completed appointment API call");
              if (responseData.length) {
                isAnyAppointmentAvailable = true;
                appointmentDetails = responseData;
                console.log("Appointment", appointmentDetails);
              }
  
              this.setState({
                isAnyAppointmentAvailable:isAnyAppointmentAvailable,
                appointmentDetails:appointmentDetails
              });
              
            })
            .catch((err) => console.log(err))
           
        
        );
  }

  async componentDidMount() {
    //await saveUserDetails(this.state.username);
    console.log("Get user details")
    getData(constants.USERDETAILS).then((data) => {
      // Read back the user details from storage and convert to object
      this.setState({
        userDetails: JSON.parse(data),
        }, () => {
          this.getAllAppointments();
        });
    })
    
  }
render()
{
  console.log("Appointment Details in render",this.state.appointmentDetails);

  this.state.appointmentDetails.map(function(appointment, i){

    console.log(appointment.appointment_with);
  })
  // console.log("Appointment Details Practitioner",this.state.appointmentDetails[1].appointment_with);
  
  

  return (
  
  <Layout style={styles.mainContainer}>

  <TopNavigation position="absolute"
                      top={0}
                      style={{ height: hp('10%'), width: width }} />
                  {/* <Text style={{ top: hp('2%'), left: wp('-30'), fontSize: wp('7.5%'), fontWeight: '700' }}>Settings</Text> */}
                  <Button
                   style={{ left: wp('80%'), top: wp('14'),  width:hp('12%') }}
 
                      appearance="outline"
                      onPress={() => {
                      //this.props.navigation.navigate("HTwo")
                      //this.setMedicationVisible(!this.state.medicationVisible)
                     
                      }}
                  >
                      Save
                 
              </Button>
              <Text style={{ left: wp('34%'), top: wp('4'), color:'white', fontWeight:'500', fontSize:Responsive.font(16) }}>Select appointment</Text>
              <Button
                   style={{ left: wp('-2%'), top: wp('-2'), width:hp('14%') }}
 
                      appearance="outline"
                      onPress={() =>  this.props.navigation.navigate("Select")}
                  >
                      Cancel
                 
              </Button>
              
              
                 <Divider />
        <ScrollView>
                
         { this.state.appointmentDetails.map((appointment, i)=>{
          return<Card style={{backgroundColor:'#ffff',height:hp('40%'),marginBottom:hp('-15%'),width:hp('45%'), borderRadius:Responsive.width(10),
    flexDirection: "row",
    alignSelf: "center",
    // top: Responsive.height(-125),
    alignItems: "center",
    //left: wp('5'),
    backgroundColor: "#ffff",
    borderBottomColor: "#ffffff",
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#ffffff",
    backgroundColor: "#ffffff",
    shadowColor: "#c8c8c8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 30,}}>
             {/* <Card.Title>APPOINTMENT</Card.Title>  
             <Card.Divider/>    */}
             <Button
                   style={{ left: wp('70%'), top: wp('30%'),  width:hp('5%'),  backgroundColor: "#f08974",
            borderRadius:5,appearance:"outline"}}
 
                      
                      onPress={() => {
                      //this.props.navigation.navigate("HTwo")
                      //this.setMedicationVisible(!this.state.medicationVisible)
                      this.props.navigation.navigate("Track");
                      }}
                  >
                      Edit
                 
              </Button>
             <Text style={{
                  left: wp('-5%'),
                  paddingTop: hp('10%'),
                  top:wp('-20%'),
                  color: "#8A8A8E"}}>Appointment Type {appointment.appointment_type}</Text> 
              <Text
                style={{
                  left: wp('-5%'),
                  paddingTop: hp('10%'),
                  color: "#8A8A8E",
                  top:wp('-30%')
                }}
              >Practitioner name : {appointment.appointment_with}</Text>

              <Text style={{
                  left: wp('-5%'),
                  paddingTop: hp('10%'),
                  top:wp('-50%'),
                  color: "#8A8A8E"}}>Location: {appointment.appointment_location}
                
              </Text>
              <Text style={{ top:wp('-50%')}}>___________________________</Text>
              <Text style={{
                  left: wp('-5%'),
                  top:wp('-70%'),
                  paddingTop: hp('10%'),
                  color: "#8A8A8E"}}>Notes {appointment.appointment_notes}</Text> 
            
              
            </Card>

           
           
         })} 
         </ScrollView>
                </Layout>
 )}}

        const styles = StyleSheet.create({
          createTaskButton: {
            width: 252,
            height: 48,
            alignSelf: 'center',
            marginTop: 40,
            borderRadius: 5,
            justifyContent: 'center',
          },
          // seperator: {
          //   height: 0.5,
          //   width: '100%',
          //   backgroundColor: '#979797',
          //   alignSelf: 'center',
          //   marginVertical: 20,
          // },
          notes: {
            color: '#9CAAC4',
            fontSize: 16,
            fontWeight: '600',
          },
          notesContent: {
            height: 0.5,
            width: '100%',
            backgroundColor: '#979797',
            alignSelf: 'center',
            marginVertical: 20,
          },
          learn: {
            height: 23,
            width: 51,
            backgroundColor: '#F8D557',
            justifyContent: 'center',
            borderRadius: 5,
            top:18,
          },
          design: {
            height: 23,
            width: 59,
            backgroundColor: '#F3A878',
            justifyContent: 'center',
            borderRadius: 5,
            marginRight: 7,
            top:18,
          },
          readBook: {
            height: 23,
            width: 83,
            backgroundColor: '#F09874',
            justifyContent: 'center',
            borderRadius: 5,
            marginRight: 7,
            width:90,
            top:18
          },

          trackButton: {
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            top:wp('-10%'),
            left: wp('-25%'),
            backgroundColor: "#f09874",
            borderRadius:5,
            width: wp('30%'),
        
          },

          textContainer: {
            flex: 1,
            position: "absolute",
            top: hp('88%'),
            justifyContent: "center",
            alignItems: "center",
          },
          cardContainer: {
            
            flex: 1,
    position: "absolute",
    width: Responsive.width(330),
    borderRadius: Responsive.width(20),
    flexDirection: "row",
    alignSelf: "center",
    top: Responsive.height(-125),
    alignItems: "center",
    //left: wp('5'),
    backgroundColor: "#ffff",
    borderBottomColor: "#ffffff",
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#ffffff",
    backgroundColor: "#ffffff",
    shadowColor: "#c8c8c8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
          },

          cardText: {
            flex: 1,
        
            left: Responsive.width(10),
            position: "absolute",
            fontSize: Responsive.font(16),
            fontWeight: "bold",
            letterSpacing: wp("0%"),
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: hp("0%"),
            top: Responsive.height(7),
          },

          symptomText: {
            flex: 1,
            position: "absolute",
            fontSize: Responsive.font(18),
            fontWeight: "bold",
            letterSpacing: wp("0%"),
            justifyContent: "center",
            alignItems: "center",
            left: Responsive.width(74),
            paddingLeft: Responsive.height(2),
            paddingBottom: Responsive.height(-20),
            top: Responsive.height(2),
          },
          title: {
            height: 25,
           
            borderLeftWidth: 1,
            paddingLeft: 8,
            fontSize: 19,
            backgroundColor: '#FBFBFB'
          },
          taskContainer: {
            height: 600,
            width: 367,
            alignSelf: 'center',
            borderRadius: 20,
            shadowColor: '#2E66E7',
            backgroundColor: '#ffffff',
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowRadius: 20,
            shadowOpacity: 0.2,
            elevation: 5,
            padding: 22,
          },
          calenderContainer: {
            marginTop: 30,
            width: 350,
            height: 350,
            alignSelf: 'center',
          },
          newTask: {
            alignSelf: 'center',
            fontSize: 20,
            width: 120,
            height: 25,
            textAlign: 'center',
          },
          backButton: {
            flexDirection: 'row',
            marginTop: 60,
            width: '100%',
            alignItems: 'center',
          },
          container: {
            flex: 1,
            top:10,
            paddingTop: Constants.statusBarHeight,
            //backgroundColor: '#fbfbfb',
          },
        });
        