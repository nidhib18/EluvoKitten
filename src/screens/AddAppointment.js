
// import React from "react";
// import { SafeAreaView, Image, StyleSheet, Dimensions, Text, View } from "react-native";
// import { Button, Divider, Layout, TopNavigation, Card } from "@ui-kitten/components";
// import { ImageStyles } from "./ImageStyles";

// const { width, height } = Dimensions.get("window");
// import { TrackScreen } from './TrackScreen'
// import PainCard from "./TrackingCards/PainCard";
// import Responsive from "react-native-lightweight-responsive";
import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Divider, Layout, TopNavigation, Button, Input } from "@ui-kitten/components";
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

// import { mapListItemsToTags } from "../../helpers/TagHelpers"

const { width: vw } = Dimensions.get('window');
// moment().format('YYYY/MM/DD')


export default class AddAppointment extends Component {
 
  state = {
    selectedDay: {
      [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
        'DD'
      )}`]: {
        selected: true,
        selectedColor: '#f09874',
      },
    },
    appointment_date:"",
    appointment_type: "",
    appointment_with: "",
    appointment_location: "",
    appointment_notes:"",
    userDetails:{},
    appointmentDetails:initAppointmentDetails(0,  moment().format('YYYY-MM-DD')) ,
    currentDate: this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD'),   
    currentDay: moment().format(),
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
    //.saveAppointmentDetails = this.saveAppointmentDetails.bind(this)
  
  };
  

  // constructor(props) {
  //   super(props);
  //     this.state ={
     
  //     };
      
  // }
    getAppointments () {
  
    let url = constants.GETAPPOINTMENT_DEV_URL;
          getData(constants.JWTKEY).then((jwt) =>
              fetch(url, {
                  //calling API
                  method: "GET",
                  headers: {
                      Authorization: "Bearer" + jwt, //Passing this will authorize the user
                  },
              })
                  .then((response) => response.json())
                  // .then((responseData) => {
                  // let medicationSideEffects = [];//getting all possible paintype tags from the database  //{} is an object [] an array a value
                  // medicationSideEffects = mapListItemsToTags(responseData);
                      
                  //     this.setState({ medicationSideEffects: medicationSideEffects });
                  // })
                  .catch((err) => console.log(err))
          );
      };

      
      saveAppointmentDetails() {

      // Add the saved med level
      let userId = this.state.userDetails.user_id;
      let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
      // Add medication side effects 
      // let medicationSideEffects = null ;
      // if (this.state.selectedMedicationSideEffects.length > 0)
      // medicationSideEffects = this.state.selectedMedicationSideEffects[0]; 

      let appointment = { 
          user_id: userId,
          appointment_date:this.state.appointment_date,
          appointment_type: this.state.appointment_type,
          appointment_with: this.state.appointment_with,
          appointment_location: this.state.appointment_location,
          appointment_notes:this.state.appointment_notes,
          occurred_date: localToUtcDateTime(occurredDate),
          
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
                  //console.log(response.json());
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
       this.getAppointments(); 
            
   })
  //  .then((data) => {
  //      getData(constants.USERSETTINGS).then((data) => {
  //          // Read back the user settings from storage and convert to object
  //          console.log ("****USER SETTINGS in medication card****" ,data);
  //          this.setState({
  //            userSettings: JSON.parse(data),
  //          });
  //      });
  //     });
}

//
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = e => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      visibleHeight:
        Dimensions.get('window').height - e.endCoordinates.height - 30,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      visibleHeight: Dimensions.get('window').height,
    });
  };

  handleAlarmSet = () => {
    const { isAlarmSet } = this.state;
    this.setState({
      isAlarmSet: !isAlarmSet,
    });
  };

  synchronizeCalendar = async value => {
    const { navigation } = this.props;
    const { createNewCalendar } = navigation.state.params;
    const calendarId = await createNewCalendar();
    try {
      const createEventAsyncRes = await this._addEventsToCalendar(calendarId);
      this.setState(
        {
          createEventAsyncRes,
        },
        () => {
          this._handleCreateEventData(value);
        }
      );
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  _addEventsToCalendar = async calendarId => {
    const { taskText, notesText, alarmTime } = this.state;
    const event = {
      title: taskText,
      notes: notesText,
      startDate: moment(alarmTime)
        .add(0, 'm')
        .toDate(),
      endDate: moment(alarmTime)
        .add(5, 'm')
        .toDate(),
      timeZone: Localization.timezone,
    };

    try {
      const createEventAsyncRes = await Calendar.createEventAsync(
        calendarId.toString(),
        event
      );

      return createEventAsyncRes;
    } catch (error) {
      console.log(error);
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleCreateEventData = async value => {
    const {
      state: {
        currentDay,
        taskText,
        notesText,
        isAlarmSet,
        alarmTime,
        createEventAsyncRes,
      },
      props: { navigation },
    } = this;
    const { updateCurrentTask, currentDate } = navigation.state.params;
    const creatTodo = {
      key: uuid(),
      date: `${moment(currentDay).format('YYYY')}-${moment(currentDay).format(
        'MM'
      )}-${moment(currentDay).format('DD')}`,
      todoList: [
        {
          key: uuid(),
          title: taskText,
          notes: notesText,
          alarm: {
            time: alarmTime,
            isOn: isAlarmSet,
            createEventAsyncRes,
          },
          color: `rgb(${Math.floor(
            Math.random() * Math.floor(256)
          )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
            Math.random() * Math.floor(256)
          )})`,
        },
      ],
      markedDot: {
        date: currentDay,
        dots: [
          {
            key: uuid(),
            color: 'white',
            selectedDotColor: 'white',
          },
        ],
      },
    };

    await value.updateTodo(creatTodo);
    await updateCurrentTask(currentDate);
    navigation.navigate('Home');
  };

  _handleDatePicked = date => {
    const { currentDay } = this.state;
    const selectedDatePicked = currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute);

    this.setState({
      alarmTime: newModifiedDay,
    });

    this._hideDateTimePicker();
  };

  render() {
    appointment_date= this.state.appointment_date || "";
    appointment_type= this.state.appointment_type || "",
    appointment_with= this.state.appointment_with || "",
    appointment_location= this.state.appointment_location|| "",
    appointment_notes = this.state.appointment_notes || ""
   
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
                     this.saveAppointmentDetails();
                     }}
                 >
                     Save
                
             </Button>
             <Text style={{ left: wp('34%'), top: wp('4'), color:'white', fontWeight:'500', fontSize:Responsive.font(16) }}>Add appointment</Text>
             <Button
                  style={{ left: wp('-2%'), top: wp('-2'), width:hp('14%') }}

                     appearance="outline"
                     onPress={() =>  this.props.navigation.navigate("Select")}
                 >
                     Cancel
                
             </Button>
             
             
                <Divider />
      <Context.Consumer>
        {value => (
          <>
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              mode="time"
            />

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
                    <CalendarList
                      style={{
                        width: 350,
                        height: 350,
                      }}
                      current={currentDay}
                      minDate={moment().format()}
                      horizontal
                      pastScrollRange={0}
                      pagingEnabled
                      calendarWidth={350}
                      onDayPress={day => {
                        this.setState({
                          selectedDay: {
                            [day.dateString]: {
                              selected: true,
                              selectedColor: '#f09874',
                            },
                          },
                          currentDay: day.dateString,
                          alarmTime: day.dateString,
                        });
                      }}
                      monthFormat="yyyy MMMM"
                      hideArrows
                      markingType="simple"
                      theme={{
                        selectedDayBackgroundColor: '#f09874',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: 'white',
                        backgroundColor: '#eaeef7',
                        calendarBackground: '#eaeef7',
                        textDisabledColor: '#d9dbe0',
                      }}
                      markedDates={selectedDay}
                    />
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
                      <View style={styles.readBook}>
                        <Text style={{ textAlign: 'center', fontSize: 14, width:90, color:'white', fontWeight:'500' }}>
                        Gynecologist
                        </Text>
                      </View>
                      <View style={styles.design}>
                        <Text style={{textAlign: 'center', fontSize: 14, color:'white', fontWeight:'500' }}>
                          Physio
                        </Text>
                      </View>
                      <View style={styles.learn}>
                        <Text style={{textAlign: 'center', fontSize: 14, color:'white', fontWeight:'500' }}>
                          Social meeting
                        </Text>
                      </View>
                    </View>
                    <Text style={{fontWeight:'500', top:40}} >Practitioner</Text>
                    <Input
                        style={{
                          height: 25,
                          fontSize: 19,
                          marginTop: 3,
                          backgroundColor: '#FBFBFB',
                          top:50
                        }}
                      onChangeText={(value) => this.setState({appointment_with: value })}
                      value={appointment_with}
                      placeholder='Practitioner name' 
                      placeholderTextColor='#8A8A8E'
                     
                    />
                    <Text style={{fontWeight:'500', top:80}} >Location</Text>
                    <Input
                        style={{
                          height: 25,
                          fontSize: 19,
                          marginTop: 3,
                          backgroundColor: '#FBFBFB',
                          top:80
                        }}
                      onChangeText={(value) => this.setState({appointment_location: value })}
                      value={appointment_location}
                      placeholder='Location'
                      placeholderTextColor='#8A8A8E'
                     
                    />
                    {/* <View style={styles.notesContent} /> */}
                    <View>
                      {/* <Text style={styles.notes}>Notes</Text> */}
                      <Text style={{fontWeight:'500', top:110}} >Notes</Text>
                      <Input
                        style={{
                          height: 55,
                          fontSize: 19,
                          marginTop: 3,
                          backgroundColor: '#FBFBFB',
                          top:115
                        }}
                        onChangeText={(value) => this.setState({appointment_notes: value })}
                        value={appointment_notes}
                        // placeholder="Enter notes about the task."
                      />
                    </View>
                    {/* <View style={styles.seperator} /> */}
                    <View>
                      {/* <Text
                        style={{
                          color: '#9CAAC4',
                          fontSize: 16,
                          fontWeight: '600',
                        }}
                      >
                        Times
                      </Text> */}
                      <Text style={{fontWeight:'500', top:120}}>Time</Text>
                      <TouchableOpacity
                        onPress={() => this._showDateTimePicker()}
                        style={{
                          height: 35,
                          marginTop: 3,
                          top:125,
                          
                        }}
                      >
                      
                        <Text style={{ fontSize: 19, }}>
                          {moment(alarmTime).format('h:mm A')}
                        </Text>
                      </TouchableOpacity>
                      <Text style={{fontWeight:'500', top:130}}>Reminder</Text>
                    </View>
                    {/* <View style={styles.seperator} /> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View>
                        {/* <Text
                          style={{
                            color: '#9CAAC4',
                            fontSize: 16,
                            fontWeight: '600',
                          }}
                        >
                          Alarm
                        </Text> */}
                        <View
                          style={{
                            height: 25,
                            marginTop: 3,
                            top:120
                          }}
                        >
                          <Text style={{ fontSize: 19 , top:15}}>
                            {moment(alarmTime).format('h:mm A')}
                          </Text>
                        </View>
                      </View>
                      <Switch
                      style={{top:138}}
                        value={isAlarmSet}
                        onValueChange={this.handleAlarmSet}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    disabled={taskText === ''}
                    style={[
                      styles.createTaskButton,
                      {
                        borderRadius:25,
                        width:350,
                        backgroundColor:
                          taskText === ''
                            ? '#f09874'
                            : '#f09874',
                      },
                    ]}
                    onPress={async () => {
                      if (isAlarmSet) {
                        await this.synchronizeCalendar(value);
                      }
                      if (!isAlarmSet) {
                        this._handleCreateEventData(value);
                      }
                     
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
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
//====================================================================================================================
// export default class AddAppointment extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             show: false,
//             PainCard:false
//         };
//     }
//     ShowHideComponent = () => {
//             console.log(state);
//             this.setState({ show:!this.state.show });
//         // } else {
//         //     this.setState({ show: true });
//         // }
//     };
//     render() {
//         return (
//             <Layout style={styles.mainContainer}>

// <TopNavigation position="absolute"
//                     top={0}
//                      style={{ height: hp('10%'), width: width }} />
//                  {/* <Text style={{ top: hp('2%'), left: wp('-30'), fontSize: wp('7.5%'), fontWeight: '700' }}>Settings</Text> */}
//                  <Button
//                   style={{ left: wp('80%'), top: wp('14'),  width:hp('12%') }}

//                      appearance="outline"
//                      onPress={() => this.props.navigation.navigate("Settings")}
//                  >
//                      Save
                
//              </Button>
//              <Text style={{ left: wp('34%'), top: wp('4'), color:'white', fontWeight:'500', fontSize:Responsive.font(16) }}>Add appointment</Text>
//              <Button
//                   style={{ left: wp('-2%'), top: wp('-2'), width:hp('14%') }}

//                      appearance="outline"
//                      onPress={() => this.props.navigation.navigate("Settings")}
//                  >
//                      Cancel
                
//              </Button>
             
             
//                 <Divider />
//                 <View style={{
//                     shadowColor: '#c8c8c8',
//                     shadowOffset: { width: 0, height: 2 },
//                     shadowOpacity: 0.8,
//                     shadowRadius: 30,
//                 }}>
//                     <Card style={styles.cardContainer}>

//                     <Text style={{ left: wp('-20%'), top: wp('4'), color:'black', fontWeight:'500', fontSize:Responsive.font(16) }}> Appointment Details</Text>

                       
//                     </Card>
//                 </View>


//             </Layout>
//         );
//     };
// }
// const styles = StyleSheet.create({
//         container: {
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "#fbfbfb",
//             height: hp('14'),
//         },
//         signBtnContainer: {
//             position: "absolute",
//             width: wp('95%'),
//             height: hp('7%'),
//             borderRadius: 24,
//             top: hp('85%'),
//             backgroundColor: "#fff",
//             includeFontPadding: true,
//             paddingVertical: 5,
//         },
    
//         loginBtnContainer: {
//             position: "absolute",
//             width: wp('95%'),
//             height: hp('7%'),
//             borderRadius: 24,
//             top: hp('75%'),
//             backgroundColor: "white",
//             includeFontPadding: true,
//             paddingVertical: 5,
//         },
//         cardContainer: {
//             flex: 1,
//             position: "absolute",
//             width: wp('90%'),
//             borderRadius: 20,
//             height: hp('80%'),
//             left: wp('5'),
//             top: hp('3%'),
//             alignItems: "center",
//             backgroundColor: "#ffff",
//             borderBottomColor: '#ffffff',
//             borderTopColor: '#ffffff',
//             borderLeftColor: '#ffffff',
//             borderRightColor: '#ffffff',
//             backgroundColor: '#ffffff',
//             shadowColor: '#c8c8c8',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.8,
//             shadowRadius: 30,
//             // resizeMode: "contain"
//         },
    
//     });

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
