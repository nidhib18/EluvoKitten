import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
 
  Dimensions,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import { Auth } from "aws-amplify";
import Constants from 'expo-constants';
import { removeData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import {
    Button,
    Divider,
    Layout,
    TopNavigation,
    Card,
    Text
  } from "@ui-kitten/components";
import CalendarStrip from 'react-native-calendar-strip';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Context } from './Context';
import { Task } from './Task';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
const styles = StyleSheet.create({
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTask: {
    position: 'absolute',
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: '#2E66E7',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E66E7',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  updateButton: {
    backgroundColor: '#2E66E7',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
  },
  sepeerator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
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
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    height: 475,
    width: 327,
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
  container: {
    backgroundColor: "#f09874",
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    height: hp("14"),
  },

  cardTrackingContainer: {
    flex: 1,
    position: "absolute",
    width: Responsive.width(325),
    borderRadius: 20,
    flexDirection: "row",
    height: Responsive.height(280),
    //alignSelf: "flex-start",
    bottom: Responsive.height(1040),
    alignItems: "center",
    paddingTop: Responsive.height(25),
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
    top:-1570
  },

  // cardNotificationContainer: {
  //   flex: 1,
  //   position: "absolute",
  //   width: wp("90%"),
  //   borderRadius: 20,
  //   height: hp("28%"),
  //   top: hp("76%"),
  //   alignItems: "center",
  //   backgroundColor: "#ffff",
  // },

  cardDetailsContainer: {
    flex: 1,
    paddingLeft: Responsive.width(10),
    position: "absolute",
    width: Responsive.width(325),
    borderRadius: 20,
    top: Responsive.height(420),
    width: Responsive.width(325),
    height: Responsive.height(200),
    bottom: Responsive.height(2000),
    //alignItems: "center",
    backgroundColor: "#ffff",
    borderBottomColor: "#ffffff",
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#ffffff",
    backgroundColor: "#ffffff",
  },
  cardAppointmentsContainer: {
    flex: 1,
    top: Responsive.height(180),
    paddingLeft: Responsive.width(10),
    position: "absolute",
    width: Responsive.width(325),
    borderRadius: 20,
    width: Responsive.width(325),
    height: Responsive.height(200),
    bottom: Responsive.height(2000),
    //alignItems: "center",
    backgroundColor: "#ffff",
    borderBottomColor: "#ffffff",
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#ffffff",
    backgroundColor: "#ffffff",
  },


});

export default class HomeTwo extends Component {
  state = {
    datesWhitelist: [
      {
        start: moment(),
        end: moment().add(365, 'days'), // total 4 days enabled
      },
    ],
    todoList: [],
    markedDate: [],
    currentDate: `${moment().format('YYYY')}-${moment().format(
      'MM'
    )}-${moment().format('DD')}`,
    isModalVisible: false,
    selectedTask: null,
    isDateTimePickerVisible: false,
  };

  componentWillMount() {
    this._handleDeletePreviousDayTask();
  }
  handleSignOut = () => {
        Auth.signOut()
          .then(() => {
            removeData(constants.USERDETAILS).then(() => this.props.navigation.navigate("Welcome"));
            
          })
          .catch((err) => console.log(err));
      };
  _handleDeletePreviousDayTask = async () => {
    const { currentDate } = this.state;
    try {
      const value = await AsyncStorage.getItem('TODO');

      if (value !== null) {
        const todoList = JSON.parse(value);
        const todayDate = `${moment().format('YYYY')}-${moment().format(
          'MM'
        )}-${moment().format('DD')}`;
        const checkDate = moment(todayDate);
        await todoList.filter(item => {
          const currDate = moment(item.date);
          const checkedDate = checkDate.diff(currDate, 'days');
          if (checkedDate > 0) {
            item.todoList.forEach(async listValue => {
              try {
                await Calendar.deleteEventAsync(
                  listValue.alarm.createEventAsyncRes.toString()
                );
              } catch (error) {
                console.log(error);
              }
            });
            return false;
          }
          return true;
        });

        // await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        this._updateCurrentTask(currentDate);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _handleModalVisible = () => {
    const { isModalVisible } = this.state;
    this.setState({
      isModalVisible: !isModalVisible,
    });
  };

  _updateCurrentTask = async currentDate => {
    try {
      const value = await AsyncStorage.getItem('TODO');
      if (value !== null) {
        const todoList = JSON.parse(value);
        const markDot = todoList.map(item => item.markedDot);
        const todoLists = todoList.filter(item => {
          if (currentDate === item.date) {
            return true;
          }
          return false;
        });
        if (todoLists.length !== 0) {
          this.setState({
            markedDate: markDot,
            todoList: todoLists[0].todoList,
          });
        } else {
          this.setState({
            markedDate: markDot,
            todoList: [],
          });
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const { selectedTask } = this.state;
    const prevSelectedTask = { ...selectedTask };
    const selectedDatePicked = prevSelectedTask.alarm.time;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute);

    prevSelectedTask.alarm.time = newModifiedDay;
    this.setState({
      selectedTask: prevSelectedTask,
    });

    this._hideDateTimePicker();
  };

  handleAlarmSet = () => {
    const { selectedTask } = this.state;
    const prevSelectedTask = { ...selectedTask };
    prevSelectedTask.alarm.isOn = !prevSelectedTask.alarm.isOn;
    this.setState({
      selectedTask: prevSelectedTask,
    });
  };

  _updateAlarm = async () => {
    const { selectedTask } = this.state;
    const calendarId = await this._createNewCalendar();
    const event = {
      title: selectedTask.title,
      notes: selectedTask.notes,
      startDate: moment(selectedTask.alarm.time)
        .add(0, 'm')
        .toDate(),
      endDate: moment(selectedTask.alarm.time)
        .add(5, 'm')
        .toDate(),
      timeZone: Localization.timezone,
    };

    if (selectedTask.alarm.createEventAsyncRes === '') {
      try {
        const createEventAsyncRes = await Calendar.createEventAsync(
          calendarId.toString(),
          event
        );
        const updateTask = { ...selectedTask };
        updateTask.alarm.createEventAsyncRes = createEventAsyncRes;
        this.setState({
          selectedTask: updateTask,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Calendar.updateEventAsync(
          selectedTask.alarm.createEventAsyncRes.toString(),
          event
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  _deleteAlarm = async () => {
    const { selectedTask } = this.state;
    console.log(selectedTask.alarm);

    try {
      await Calendar.deleteEventAsync(selectedTask.alarm.createEventAsyncRes);

      const updateTask = { ...selectedTask };
      updateTask.alarm.createEventAsyncRes = '';
      this.setState({
        selectedTask: updateTask,
      });
    } catch (error) {
      console.log(error);
    }
  };

  _getEvent = async () => {
    const { selectedTask } = this.state;

    if (selectedTask.alarm.createEventAsyncRes) {
      try {
        await Calendar.getEventAsync(
          selectedTask.alarm.createEventAsyncRes.toString()
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  _findCalendars = async () => {
    const calendars = await Calendar.getCalendarsAsync();

    return calendars;
  };

  _createNewCalendar = async () => {
    const calendars = await this._findCalendars();
    const newCalendar = {
      title: 'test',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#2196F3',
      sourceId:
        Platform.OS === 'ios'
          ? calendars.find(cal => cal.source && cal.source.name === 'Default')
              .source.id
          : undefined,
      source:
        Platform.OS === 'android'
          ? {
              name: calendars.find(
                cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
              ).source.name,
              isLocalAccount: true,
            }
          : undefined,
      name: 'test',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount:
        Platform.OS === 'android'
          ? calendars.find(
              cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
            ).ownerAccount
          : undefined,
    };

    let calendarId = null;

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar);
    } catch (e) {
      Alert.alert(e.message);
    }

    return calendarId;
  };

  render() {
    const {
      state: {
        datesWhitelist,
        markedDate,
        todoList,
        isModalVisible,
        selectedTask,
        isDateTimePickerVisible,
        currentDate,
      },
      props: { navigation },
    } = this;

    return (
        <Layout style={styles.container}>
        <TopNavigation
          position="absolute"
          top={0}
          style={{ height: Responsive.height(90), width: width }}
        />
        <Text
          style={{
            top: Responsive.height(35),
            left: Responsive.width(-100),
            fontSize: Responsive.font(30),
            fontWeight: "700",
          }}
        >
          Settings
        </Text>
        <Button
          style={{
            left: Responsive.width(150),
            top: Responsive.width(-5),
            height: Responsive.height(40),
            width: Responsive.width(140),
          }}
          appearance="outline"
          onPress={() => this.props.navigation.navigate("Home")}
        >
          Done
        </Button>
        <Divider />
        <View
          style={{
            width: width,
            height: Responsive.height(673),
            backgroundColor: "#f2f2f2",
            top: Responsive.height(-3),
            alignContent: "center",
            shadowColor: "#c8c8c8",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 30,
          }}
        >
          <ScrollView
          
            contentContainerStyle={{
              justifyContent: "center",
              flex: 1,
              flexGrow: 1,
              flexDirection: "column",
              marginTop: Responsive.height(100),
              marginBottom: Responsive.height(-1900),
              justifyContent: "center",
              bottom: Responsive.height(200),
              top: Responsive.height(55),
              left: wp("4.5"),
              shadowColor: "#c8c8c8",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 30,
              
            }}
          >
            <View style>
              <Card disabled={true} style={styles.cardTrackingContainer}>
                <Text
                  style={{
                    paddingBottom: Responsive.height(50),
                    top: Responsive.height(-15),
                    color: "#000",
                    left: Responsive.width(1),
                    fontSize: Responsive.font(24),
                    fontWeight: "600",
                    height: Responsive.height(30),
                    marginBottom: Responsive.height(-10),
                  }}
                >
                  Tracking
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("TrackCust")}
                >
                  <Text
                    style={{
                      left: wp("0%"),
                      top: Responsive.height(-10),
                      color: "#000",
                      fontWeight: "500",
                      fontSize: Responsive.font(16),
                    }}
                  >
                    Customise trackers
                  </Text>
                  <Text
                    style={{
                      left: wp("0%"),
                      top: Responsive.height(-5),
                      color: "#8A8A8E",
                      fontWeight: "500",
                      fontSize: Responsive.font(16),
                    }}
                  >
                    Edit which things you are tracking{" "}
                  </Text>
                  <Text
                    style={{
                      left: wp("0%"),
                      top: Responsive.height(3),
                      color: "#DFDFE0",
                      fontWeight: "300",
                      fontSize: Responsive.font(16),
                    }}
                  >
                    ______________________________________
                  </Text>
                  <Image
                    style={{
                      left: Responsive.width(280),
                      top: Responsive.height(-75),
                      height: Responsive.height(21),
                      width: Responsive.width(21),
                      resizeMode: "contain",
                    }}
                    source={require("../../assets/goto.png")}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      left: wp("0%"),
                      top: Responsive.height(10),
                      color: "#000",
                      fontWeight: "500",
                      fontSize: Responsive.font(16),
                    }}
                  >
                    Cycle settings
                  </Text>
                  <Text
                    style={{
                      left: wp("0%"),
                      top: Responsive.height(17),
                      color: "#8A8A8E",
                      fontWeight: "500",
                      fontSize: Responsive.font(16),
                    }}
                  >
                    Edit cycle Length and period reminders
                  </Text>
                  <Text
                    style={{
                      left: wp("0%"),
                      top: Responsive.height(10),
                      color: "#DFDFE0",
                      fontWeight: "300",
                      fontSize: Responsive.font(16),
                    }}
                  >
                    ______________________________________
                  </Text>
                  <Image
                    style={{
                      left: Responsive.width(280),
                      top: Responsive.height(-60),
                      height: Responsive.height(21),
                      width: Responsive.width(21),
                      resizeMode: "contain",
                    }}
                    source={require("../../assets/goto.png")}
                  ></Image>
                </TouchableOpacity>
              </Card>
            </View>
            {/* <Card style={styles.cardNotificationContainer}>
              <Text style={styles.medicationText}>Tracking</Text>
              <Text
                style={{
                  fontSize: wp("6%"),
                  left: wp("-30%"),
                  position: "absolute",
                  top: hp("2%"),
                  color: "#000",
                  fontWeight: "bold",
                }}
              >
                Notifications
              </Text>
            </Card> */}

            <Card style={styles.cardDetailsContainer}>
              <Text style={styles.medicationText}>Tracking</Text>
              <View style={{ left: Responsive.width }}>
                <Text
                  style={{
                    justifyContent: "flex-start",
                    paddingBottom: Responsive.height(50),
                    top: Responsive.height(-15),
                    color: "#000",
                    left: Responsive.width(-10),
                    fontSize: Responsive.font(24),
                    fontWeight: "600",
                    height: Responsive.height(30),
                    marginBottom: Responsive.height(-10),
                  }}
                >
                  Personal Details
                </Text>

              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Reset")}
              >
                <Text
                  style={{
                    left: Responsive.width(-8),
                    top: Responsive.height(-8),
                    color: "#000",
                    fontWeight: "500",
                    fontSize: Responsive.font(16),
                  }}
                >
                  Login
                  </Text>
                <Text
                  style={{
                    left: Responsive.width(-8),
                    top: Responsive.height(-8),
                    color: "#8A8A8E",
                    fontWeight: "500",
                    fontSize: Responsive.font(16),
                  }}
                >
                  Change your password{" "}
                </Text>
                <Text
                  style={{
                    left: Responsive.width(-8),
                    top: Responsive.height(-10),
                    color: "#DFDFE0",
                    fontWeight: "300",
                    fontSize: Responsive.font(16)
                  }}
                >
                  ______________________________________
                  </Text>
                <Image
                  style={{
                    left: Responsive.width(280),
                    top: Responsive.height(-60),
                    height: Responsive.height(17),
                    width: Responsive.width(17),
                    resizeMode: "contain",
                    justifyContent: 'center'

                  }}
                  source={require("../../assets/goto.png")}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleSignOut}>
                <Text
                  style={{
                    left: Responsive.width(-8),
                    top: Responsive.height(-8),
                    color: "#000",
                    fontWeight: "500",
                    fontSize: Responsive.font(16)
                  }}
                >
                  Sign out{" "}
                </Text>

                <Text
                  style={{
                    left: Responsive.width(-8),
                    top: Responsive.height(-17),
                    color: "#DFDFE0",
                    fontWeight: "300",
                    fontSize: Responsive.font(16)
                  }}
                >
                  ________________________________________
                  </Text>

              </TouchableOpacity>
            </Card>
            <Card style={styles.cardAppointmentsContainer}>
              <Text style={{
                paddingBottom: Responsive.height(50),
                top: Responsive.height(5),
                color: "#000",
                left: Responsive.width(-10),
                fontSize: Responsive.font(24),
                fontWeight: "600",
                marginBottom: Responsive.height(-10),
              }}>Appointments</Text>
              <TouchableOpacity
               onPress={() =>
                  navigation.navigate('AddApp', {
                    updateCurrentTask: this._updateCurrentTask,
                    currentDate,
                    createNewCalendar: this._createNewCalendar,
                  })
                }
              
                >
                <Text style={{
                  paddingBottom: Responsive.height(50),
                  top: Responsive.height(-20),
                  color: "#000",
                  left: Responsive.width(-10),
                  fontSize: Responsive.font(16),
                  fontWeight: "600",
                  marginBottom: Responsive.height(-10),
                }}>Add new appointment</Text>
                <Image
                  style={{
                    left: Responsive.width(260),
                    top: Responsive.height(-80),
                    height: Responsive.height(17),
                    width: Responsive.width(17),
                    resizeMode: "contain",
                    justifyContent: 'center'

                  }}
                  source={require("../../assets/goto.png")}
                ></Image>
              </TouchableOpacity>

              <Text
                style={{
                  left: Responsive.width(-8),
                  top: Responsive.height(-70),
                  color: "#DFDFE0",
                  fontWeight: "300",
                  fontSize: Responsive.font(16)
                }}
              >
                ________________________________________
                  </Text>
            <TouchableOpacity  onPress={() =>
                  navigation.navigate('Edit')
                }>
              <Text style={{
                paddingBottom: Responsive.height(50),
                top: Responsive.height(-50),
                color: "#000",
                left: Responsive.width(-10),
                fontSize: Responsive.font(16),
                fontWeight: "600",
                marginBottom: Responsive.height(-10),
              }}>Edit an existing appointment</Text>
              <Image
                style={{
                  left: Responsive.width(260),
                  top: Responsive.height(-100),
                  height: Responsive.height(17),
                  width: Responsive.width(17),
                  resizeMode: "contain",
                  justifyContent: 'center'

                }}
                source={require("../../assets/goto.png")}
              ></Image>
              </TouchableOpacity>
            </Card>
            
            
          </ScrollView>
          </View>
      <Context.Consumer>
        {value => (
          <>
            {selectedTask !== null && (
              <Task isModalVisible={isModalVisible}>
                <DateTimePicker
                  isVisible={isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode="time"
                />
               
                  <TextInput
                    style={styles.title}
                    onChangeText={text => {
                      const prevSelectedTask = { ...selectedTask };
                      prevSelectedTask.title = text;
                      this.setState({
                        selectedTask: prevSelectedTask,
                      });
                    }}
                    value={selectedTask.title}
                    placeholder="What do you need to do?"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#BDC6D8',
                      marginVertical: 10,
                    }}
                  >
                    Suggestion
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.readBook}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        Read book
                      </Text>
                    </View>
                    <View style={styles.design}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        Design
                      </Text>
                    </View>
                    <View style={styles.learn}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>
                        Learn
                      </Text>
                    </View>
                  </View>
                  <View style={styles.notesContent} />
                  <View>
                    <Text
                      style={{
                        color: '#9CAAC4',
                        fontSize: 16,
                        fontWeight: '600',
                      }}
                    >
                      Notes
                    </Text>
                    <TextInput
                      style={{
                        height: 25,
                        fontSize: 19,
                        marginTop: 3,
                      }}
                      onChangeText={text => {
                        const prevSelectedTask = { ...selectedTask };
                        prevSelectedTask.notes = text;
                        this.setState({
                          selectedTask: prevSelectedTask,
                        });
                      }}
                      value={selectedTask.notes}
                      placeholder="Enter notes about the task."
                    />
                  </View>
                  <View style={styles.sepeerator} />
                  <View>
                    <Text
                      style={{
                        color: '#9CAAC4',
                        fontSize: 16,
                        fontWeight: '600',
                      }}
                    >
                      Times
                    </Text>
                    <TouchableOpacity
                      onPress={() => this._showDateTimePicker()}
                      style={{
                        height: 25,
                        marginTop: 3,
                      }}
                    >
                      <Text style={{ fontSize: 19 }}>
                        {moment(selectedTask.alarm.time).format('h:mm A')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.seperator} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: '#9CAAC4',
                          fontSize: 16,
                          fontWeight: '600',
                        }}
                      >
                        Alarm
                      </Text>
                      <View
                        style={{
                          height: 25,
                          marginTop: 3,
                        }}
                      >
                        <Text style={{ fontSize: 19 }}>
                          {moment(selectedTask.alarm.time).format('h:mm A')}
                        </Text>
                      </View>
                    </View>
                    <Switch
                      value={selectedTask.alarm.isOn}
                      onValueChange={this.handleAlarmSet}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={async () => {
                        this._handleModalVisible();
                        if (selectedTask.alarm.isOn) {
                          await this._updateAlarm();
                        } else {
                          await this._deleteAlarm();
                        }
                        await value.updateSelectedTask({
                          date: currentDate,
                          todo: selectedTask,
                        });
                        this._updateCurrentTask(currentDate);
                      }}
                      style={styles.updateButton}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}
                      >
                        UPDATE
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        this._handleModalVisible();
                        this._deleteAlarm();
                        await value.deleteSelectedTask({
                          date: currentDate,
                          todo: selectedTask,
                        });
                        this._updateCurrentTask(currentDate);
                      }}
                      style={styles.deleteButton}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}
                      >
                        DELETE
                      </Text>
                    </TouchableOpacity>
                  </View>
               
              </Task>
            )}
            <View
              style={{
                flex: 1,
                paddingTop: Constants.statusBarHeight,
              }}
            >
              {/* <CalendarStrip
                ref={ref => {
                  this.calenderRef = ref;
                }}
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{
                  type: 'background',
                  duration: 200,
                  highlightColor: '#ffffff',
                }}
                style={{
                  height: 150,
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
                calendarHeaderStyle={{ color: '#000000' }}
                dateNumberStyle={{ color: '#000000', paddingTop: 10 }}
                dateNameStyle={{ color: '#BBBBBB' }}
                highlightDateNumberStyle={{
                  color: '#fff',
                  backgroundColor: '#2E66E7',
                  marginTop: 10,
                  height: 35,
                  width: 35,
                  textAlign: 'center',
                  borderRadius: 17.5,
                  overflow: 'hidden',
                  paddingTop: 6,
                  fontWeight: '400',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                highlightDateNameStyle={{ color: '#2E66E7' }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey', paddingTop: 10 }}
                datesWhitelist={datesWhitelist}
                iconLeft={require('../../assets/left-arrow.png')}
                iconRight={require('../../assets/right-arrow.png')}
                iconContainer={{ flex: 0.1 }}
                markedDates={markedDate}
                onDateSelected={date => {
                  const selectedDate = `${moment(date).format('YYYY')}-${moment(
                    date
                  ).format('MM')}-${moment(date).format('DD')}`;
                  this._updateCurrentTask(selectedDate);
                  this.setState({
                    currentDate: selectedDate,
                  });
                }}
              /> */}
              {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddApp', {
                    updateCurrentTask: this._updateCurrentTask,
                    currentDate,
                    createNewCalendar: this._createNewCalendar,
                  })
                }
                style={styles.viewTask}
              >
                <Image
                  source={require('../../assets/plus.png')}
                  style={{
                    height: 30,
                    width: 30,
                    top: Responsive.height(620),
                  }}
                />
              </TouchableOpacity> */}
              <View
                style={{
                  width: '100%',
                  height: Dimensions.get('window').height - 170,
                }}
              >
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: 40,
                  }}
                >
                  {todoList.map(item => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState(
                          {
                            selectedTask: item,
                            isModalVisible: true,
                          },
                          () => {
                            this._getEvent();
                          }
                        );
                      }}
                      key={item.key}
                      style={styles.taskListContent}
                    >
                      <View
                        style={{
                          marginLeft: 13,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <View
                            style={{
                              height: 12,
                              width: 12,
                              borderRadius: 6,
                              backgroundColor: item.color,
                              marginRight: 8,
                            }}
                          />
                          <Text
                            style={{
                              color: '#554A4C',
                              fontSize: 20,
                              fontWeight: '700',
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginLeft: 20,
                            }}
                          >
                            <Text
                              style={{
                                color: '#BBBBBB',
                                fontSize: 14,
                                marginRight: 5,
                              }}
                            >{`${moment(item.alarm.time).format(
                              'YYYY'
                            )}/${moment(item.alarm.time).format('MM')}/${moment(
                              item.alarm.time
                            ).format('DD')}`}</Text>
                            <Text
                              style={{
                                color: '#BBBBBB',
                                fontSize: 14,
                              }}
                            >
                              {item.notes}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          height: 80,
                          width: 5,
                          backgroundColor: item.color,
                          borderRadius: 5,
                        }}
                      />
                    </TouchableOpacity>
                  ))}
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