import React, { Component } from 'react';
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
import {v4 as uuid} from "uuid";
import { Context } from './Context';


const { width: vw } = Dimensions.get('window');
// moment().format('YYYY/MM/DD')

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  notes: {
    color: '#f09874',
    fontSize: 16,
    fontWeight: '600',
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#f09874',
    alignSelf: 'center',
    marginVertical: 20,
  },
  meetfriend: {
    height: 23,
    width: 90,
    backgroundColor: '#f09874',
    justifyContent: 'center',
    borderRadius: 5,
  },
  exercise: {
    height: 23,
    width: 75,
    backgroundColor: '#f09874',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  appointment: {
    height: 23,
    width: 100,
    backgroundColor: '#f09874',
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
    color: '#f09874',
  },
  taskContainer: {
    height: 400,
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
  calenderContainer: {
    marginTop: 30,
    width: 350,
    height: 350,
    alignSelf: 'center',
    color: '#f09874',
   
    
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center',
    color: '#f09874',
  },

  backButton: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
    
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f09874',
    
  },
});

export default class CreateTask extends Component {
  state = {
    selectedDay: {
      [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
        'DD'
      )}`]: {
        selected: true,
        selectedColor: '#2E66E7',
      },
    },
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
  };

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
            color: '#f09874',
            selectedDotColor: '#f09874',
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

      
      <Context.Consumer>
        {value => (
          <>
            <DateTimePicker
              isVisible={false}
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
                    paddingBottom: 100,
                  }}
                >
                  <View style={styles.backButton}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Home')}
                      style={{ marginRight: vw / 2 - 120, marginLeft: 20 }}
                    >
                      <Image
                        style={{ height: 25, width: 40 }}
                        source={require('../../assets/back.png')}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    <Text style={styles.newTask}>New Task</Text>
                  </View>
                  <View style={styles.calenderContainer}>
                    <CalendarList
                      style={{
                        width: 327,
                        height: 350,
                        borderRadius: 20,
                        alignSelf: 'center',
                        backgroundColor: '#ffffff',
                        
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
                              selectedColor: '#2E66E7',
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
                        selectedDayBackgroundColor: '#2E66E7',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#2E66E7',
                        backgroundColor: '#eaeef7',
                        calendarBackground: '#eaeef7',
                        textDisabledColor: '#d9dbe0',
                      }}
                      markedDates={selectedDay}
                    />
                  </View>
                  <View style={styles.taskContainer}>
                    <TextInput
                      style={styles.title}
                      onChangeText={text => this.setState({ taskText: text })}
                      value={taskText}
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
                      <View style={styles.appointment}>
                        <Text style={{ textAlign: 'center', fontSize: 14 }}>
                          Appointment
                        </Text>
                      </View>
                      <View style={styles.exercise}>
                        <Text style={{ textAlign: 'center', fontSize: 14 }}>
                          Exercise
                        </Text>
                      </View>
                      <View style={styles.meetfriend}>
                        <Text style={{ textAlign: 'center', fontSize: 14 }}>
                          Social
                        </Text>
                      </View>
                    </View>
                    <View style={styles.notesContent} />
                    <View>
                      <Text style={styles.notes}>Notes</Text>
                      <TextInput
                        style={{
                          height: 25,
                          fontSize: 19,
                          marginTop: 3,
                        }}
                        onChangeText={text =>
                          this.setState({ notesText: text })
                        }
                        value={notesText}
                        placeholder="Enter notes about the task."
                      />
                    </View>
                    <View style={styles.seperator} />
                    <View>
                      <Text
                        style={{
                          color: '#f09874',
                          fontSize: 16,
                          fontWeight: '600',
                        }}
                      >
                        Time
                      </Text>
                      <TouchableOpacity
                        onPress={() => this._showDateTimePicker()}
                        style={{
                          height: 25,
                          marginTop: 3,
                        }}
                      >
                        <Text style={{ fontSize: 19 }}>
                          {moment(alarmTime).format('h:mm A')}
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
                            color: '#f09874',
                            fontSize: 16,
                            fontWeight: '600',
                          }}
                        >
                          Add to your calendar
                        </Text>
                        <View
                          style={{
                            height: 25,
                            marginTop: 3,
                          }}
                        >
                          <Text style={{ fontSize: 19 }}>
                            {moment(alarmTime).format('h:mm A')}
                          </Text>
                        </View>
                      </View>
                      <Switch
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
                        backgroundColor: '#f09874',
                          
                      },
                    ]}
                    onPress={async () => {
                      if (isAlarmSet) {
                        alert("Added successfully");
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
                      ADD YOUR TASK
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </Context.Consumer>
    );
  }
}