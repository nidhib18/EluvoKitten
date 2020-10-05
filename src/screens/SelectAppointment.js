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
export default class SelectAppointment extends React.Component {
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
                    
                      }}
                  >
                      Save
                 
              </Button>
              <Text style={{ left: wp('34%'), top: wp('4'), color:'white', fontWeight:'500', fontSize:Responsive.font(16) }}>Select appointment</Text>
              <Button
                   style={{ left: wp('-2%'), top: wp('-2'), width:hp('14%') }}
 
                      appearance="outline"
                      onPress={() =>  this.props.navigation.navigate("HTwo")}
                  >
                      Cancel
                 
              </Button>
              
              
                 <Divider />
                 <View  style={{
            width: width,
            height: Responsive.height(673),
            backgroundColor: "#f2f2f2",
            top: Responsive.height(43),
            alignContent: "center",
            shadowColor: "#c8c8c8",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 30,
          }}>
     <ScrollView contentContainerStyle={{
              justifyContent: "center",
              
              flexGrow: 1,
              flexDirection: "column",
              marginTop: Responsive.height(830),
              marginBottom: Responsive.height(-1600),
              justifyContent: "center",
              bottom: Responsive.height(200),
              top: Responsive.height(-1050),
              left: Responsive.height(1),
              shadowColor: "#c8c8c8",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 30,
            }}>
                
         { this.state.appointmentDetails.map((appointment, i)=>{
          return<Card style={{
                   backgroundColor:'#ffff',
                    top:Responsive.height(-140),
                    height:hp('40%'),
                    marginBottom:hp('-15%'),
                    width:Responsive.width(310),
                    borderRadius:Responsive.width(20),
                    flexDirection: "row",
                    alignSelf: "center",
                    alignItems: "center",
                    backgroundColor: "#ffff",
                    borderBottomColor: "#ffffff",
                    borderTopColor: "#ffffff",
                    borderLeftColor: "#ffffff",
                    borderRightColor: "#ffffff",
                    backgroundColor: "#ffffff",
                    }}>
            <View>
             <Button
             
                   style={{ left: Responsive.width(225), top:Responsive.height(50),  width:Responsive.width(60),  height:Responsive.height(10), backgroundColor: "rgba(118, 118, 128, 0.12)",borderTopRightRadius:20, borderBottomLeftRadius:20, borderTopLeftRadius:20, borderBottomRightRadius:20, }}
                    onPress={() => {this.props.navigation.navigate("Edit", {appointmentId: appointment.appointment_id});
                      }}
                  >Edit                
             </Button>
             </View>
             <Text style={{
                  left: Responsive.width(-2),
                 // paddingTop: hp('10%'),
                  top:Responsive.height(10),
                  fontSize:Responsive.font(16),
                  fontWeight:'500',
                 
                  color: "black"}}>{appointment.appointment_type}</Text> 
              <Text
                style={{
                  left: Responsive.width(-2),
                  paddingTop: hp('10%'),
                  color: "#8A8A8E",
                  top:Responsive.height(-50),
                }}
              >Practitioner name : {appointment.appointment_with}</Text>

              <Text style={{
                  left: Responsive.width(-2),
                  paddingTop: hp('10%'),
                  top:Responsive.height(-110),
                  color: "#8A8A8E"}}>Location: {appointment.appointment_location}
                
              </Text>
              <Text style={{ top:Responsive.height(-110), color:"rgba(118, 118, 128, 0.12)",fontSize: Responsive.font(20)}}>________________________</Text>
              <Text style={{
                  left: Responsive.width(-2),
                  top:Responsive.height(-170),
                  paddingTop: hp('10%'),
                  color: "#8A8A8E"}}>Notes {appointment.appointment_notes}</Text> 
            
              
            </Card>

           
           
         })} 
         </ScrollView>
         </View>
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
          
          
        });
        