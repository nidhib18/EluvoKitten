import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Divider, Layout, TopNavigation, Button, Input, Datepicker } from "@ui-kitten/components";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import Constants from 'expo-constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'uuid';
import { Context } from './Context';
import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import { initAppointmentDetails } from "../models/AppointmentDetails";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../helpers/DateHelpers";
import Responsive from 'react-native-lightweight-responsive';

const { width: vw } = Dimensions.get('window');

export default class AddAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: {
            [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
                'DD'
            )}`]: {
                selected: true,
                selectedColor: '#f09874',
            },
            },
            appointment_date: new Date(),
            appointment_type: "",
            appointment_with: "",
            appointment_location: " ",
            appointment_notes:"",
            userDetails:{},
            appointmentDetails: initAppointmentDetails(0,  moment().format('YYYY-MM-DD')) ,
            taskText: '',
            notesText: '',
            keyboardHeight: 0,
            visibleHeight: Dimensions.get('window').height,
            isAlarmSet: false,
            alarmTime: moment().format(),
            isDateTimePickerVisible: false,
            timeType: '',
            creatTodo: {},
            createEventAsyncRes: '',
            minDate: new Date(2019, 0, 1),
            maxDate: new Date(2070,0,1)
        };
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        let appointmentDate = new Date(newDate);
        this.setState({ appointment_date: appointmentDate });
    }
      
    saveAppointmentDetails() {

      // Add the saved med level
      let userId = this.state.userDetails.user_id;
      let appointment = { 
          user_id: userId,
          appointment_date:this.state.appointment_date,
          appointment_type: this.state.appointment_type,
          appointment_with: this.state.appointment_with,
          appointment_location: this.state.appointment_location,
          appointment_notes:this.state.appointment_notes     
      };
     
      let url = constants.ADDAPPOINTMENT_DEV_URL;
      getData(constants.JWTKEY).then((jwt) =>
          fetch(url, {
              //calling API
              method: "POST",
              headers: {
                  Authorization: "Bearer " + jwt, //Passing this will authorize the user
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(appointment)
            })
            .then((response) => {
                alert("Saved Successfully")
                return response.json();
            })
        );
    }   
  
    componentDidMount() //after Ui has been uploaded 
    {
        getData(constants.USERDETAILS).then((data) => {
            // Read back the user details from storage and convert to object
            this.state.userDetails = JSON.parse(data);
            this.setState({
                userDetails: JSON.parse(data),
            });                   
        })  

          
        
        
    }



    render() {

        appointment_date= this.state.appointment_date || new Date();
        console.log("DATE FECHA FORMAT",appointment_date)
        appointment_type= this.state.appointment_type || "";
        appointment_with= this.state.appointment_with || "";
        appointment_location= this.state.appointment_location|| "";
        appointment_notes = this.state.appointment_notes || "";
   
        const {
          state: {
            selectedDay,
            currentDay,
            taskText,
            visibleHeight,
            notesText,
            isAlarmSet,
            alarmTime,
            isDateTimePickerVisible,
          },
          props: { navigation },
        } = this;

        return (
            <Layout style={styles.mainContainer}>

            <TopNavigation position="absolute" top={0} style={{ height: hp('10%'), width: width }} />
            <Button style={{ left: wp('80%'), top: wp('14'),  width:hp('12%') }}
                appearance="outline"
                onPress={() => {
                    this.saveAppointmentDetails();
            }}> Save
            </Button>
            <Text style={{ left: wp('34%'), top: wp('4'), color:'white', fontWeight:'500', fontSize:Responsive.font(16) }}>Add appointment</Text>
            <Button style={{ left: wp('-2%'), top: wp('-2'), width:hp('14%') }} appearance="outline"
                     onPress={() =>  this.props.navigation.navigate("HTwo")}>
                     Cancel
            </Button>
            <Divider />
      <Context.Consumer>
        {value => (
          <>
           

            <View style={styles.container}>
              <View
                style={{
                  height: visibleHeight,
                }}
              >
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: 150, bottom:-500, top:-20
                  }}
                >
                  
                  <View style={styles.calenderContainer}>
                    
                  </View>
                  <View style={styles.taskContainer}>
                  <Text style={{fontWeight:'500'}} >Appointment Type</Text>
                  <Input
                        style={{
                          height: 25,
                          fontSize: 19,
                          marginTop: 3,
                          backgroundColor: '#FBFBFB',
                          top:10
                        }}
                      onChangeText={(value) => this.setState({ appointment_type: value })}
                      value={appointment_type}
                      placeholder='E.g. Gynecologist'
                      placeholderTextColor='#8A8A8E'
                      color='#8A8A8E'
                      
                      
                     
                    />
                    
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#BDC6D8',
                        marginVertical: 10,
                        top:20
                      }}
                    >
                      Suggestion
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.gyne}>
                        <Text style={{ textAlign: 'center', fontSize: 14, width:90, color:'white', fontWeight:'500' }}>
                        Gynecologist
                        </Text>
                      </View>
                      <View style={styles.physio}>
                        <Text style={{textAlign: 'center', fontSize: 14, color:'white', fontWeight:'500' }}>
                          Physio
                        </Text>
                      </View>
                      <View style={styles.social}>
                        <Text style={{textAlign: 'center', fontSize: 14, color:'white', fontWeight:'500' }}>
                          Social meeting
                        </Text>
                      </View>
                    </View>
                    <Text style={{fontWeight:'500',top:40}}>Practitioner</Text>
                  <Input
                        style={{
                          height: 25,
                          fontSize: 19,
                          marginTop: 3,
                          backgroundColor: '#FBFBFB',
                          top:50
                        }}
                      onChangeText={(value) => this.setState({ appointment_with: value })}
                      value={appointment_with}
                      color='#8A8A8E'
                      placeholder='E.g.Practitoner'
                      placeholderTextColor='#8A8A8E'/>
                      
                    <Text style={{fontWeight:'500', top:80}}>Location</Text>
                    <Input
                        style={{
                          height:-40,
                          fontSize: 19,
                          marginTop: 3,
                          backgroundColor: '#FBFBFB',
                          top:80
                        }}
                      onChangeText={(value) => this.setState({appointment_location: value })}
                      value={appointment_location}
                      placeholder='E.g.Location'
                      placeholderTextColor='#8A8A8E'
                      color='#8A8A8E'
                      
                      
                     
                    />

                <Text style={{fontWeight:'500', top:80}} >Notes</Text>
                    <Input
                        
                        style={{
                          
                          height:-40,
                          fontSize: 19,
                          marginTop: 3,
                          backgroundColor: '#FBFBFB',
                          top:90,
                          // hitSlop:{top: 90, bottom: 100}
                        }}
                      onChangeText={(value) => this.setState({ appointment_notes: value })}
                      value={appointment_notes}
                      placeholder='E.g.Notes'
                      placeholderTextColor='#8A8A8E'
                      color='#8A8A8E'
                      
                      
                     
                    />
                   
                   

                   <Text style={{fontWeight:'500', top:Responsive.height(100)}} >Date</Text>
                      <Datepicker
                        style={styles.datepicker}
                        date={appointment_date}
                        onSelect={this.setDate}
                        accessoryRight={this.DateIcon}
                        //label="Date of Birth"
                        min={this.state.minDate}
                        max={this.state.maxDate}
                        // max = n
                        placeholder="dd/mm/yyyy"
                      />
                    
                    
                   
                    {/* <View style={styles.seperator} /> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      
                      
                    </View>
                  </View>
                  <TouchableOpacity
                    disabled={taskText === ''}
                    style={[
                      styles.createTaskButton,
                      {
                        borderRadius:25,
                        width:350,
                        top:-450,

                        backgroundColor:
                          taskText === ''
                            ? '#f09874'
                            : '#f09874',
                      },
                    ]}
                    onPress={() => {
                    this.saveAppointmentDetails();
            }}>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                        top:1
                      }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
            
          </>
          
        )}
        
      </Context.Consumer>
      </Layout>
      
    );
  }
}


const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  
  notes: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
  },
  datepicker: {
    width:Responsive.width(280),
    height:Responsive.height(48),
    position: "absolute",
    top:Responsive.height(390),
    borderRadius: Responsive.height(24),
    left:Responsive.width(20)
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  social: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
    top:18,
  },
  physio: {
    height: 23,
    width: 59,
    backgroundColor: '#F3A878',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
    top:18,
  },
  gyne: {
    height: 23,
    width: 83,
    backgroundColor: '#F09874',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
    width:90,
    top:18
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
    top:-330
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