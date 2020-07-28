import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  TopNavigation,
  Layout,
  Divider,
  List,
  Card,
} from "@ui-kitten/components";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
//import { Value } from 'react-native-reanimated';
import { HomeStyles } from "./HomeStyles";
// import { CardList } from 'react-native-card-list';
//import { ScrollView } from 'react-native-gesture-handler';
import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import { utcToLocal,localToUtcDate,localToUtcDateTime } from "../helpers/DateHelpers";
import {getUserMood} from "../helpers/MoodHelpers";
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {initMoodDetails} from "../models/MoodDetails";
const { Width } = Dimensions.get("window");
let datesWhitelist = [
  {
    start: moment().local(),
    minDate: "1960, 06, 10",
    end: moment().local().add(20000, "days"), // total 30 years enabled

    maxDate: "2020,20,10",
  },
];
let datesBlacklist = [{ start: moment.vacationStart, end: moment.vacationEnd }];



export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageVisibility: true,
      backgroundImagePath: require("../../assets/girl.png"),
      userDetails: {},
      currentDate: moment().format("YYYY-MM-DD"),
      painDetails: { locations: [] },
      moodDetails: {},
      bloodDetails:{},
      digestionDetails:{},
      isPainDataAvailable: false,
      isMoodDataAvailable:false,
      isBloodDataAvailable:false,
      isDigestionDataAvailable:false
    };
    this.setDate = this.setDate.bind(this);
    this.getUserPain = this.getUserPain.bind(this);
    this.getUserMood = this.getUserMood.bind(this); 
    this.getUserBlood = this.getUserBlood.bind(this); 
    this.getUserDigestion = this.getUserDigestion.bind(this);
  }

  

  setDate(newDate) {
    // CalendarStrip converts the selected date to UTC format for e.g. 2020-06-15T12:00:00Z
    this.state.currentDate = utcToLocal(newDate);
    console.log("Current Date", this.state.currentDate);
    this.getUserPain();
    this.getUserMood();
    this.getUserBlood();
    this.getUserDigestion();
  }

  getUserPain() {
    let userId = this.state.userDetails.user_id;
    let url = constants.USERPAIN_DEV_URL.replace("[userId]", userId).replace(
      "[occurredDate]",
      localToUtcDateTime(this.state.currentDate)
    );
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
          // If responseData is not empty, then isPainDataAvailable = true
         // console.log(responseData);
          if (Object.keys(responseData).length) {
            this.setState({
              isPainDataAvailable: true,
              painDetails: responseData.pain,
            });
          
          } else {
            this.setState({
              isPainDataAvailable: false,
              painDetails: { locations: [] },
            });
          }
        })
        .catch((err) => console.log(err))
    );
  }
  getUserMood  ()  {
    let userId = this.state.userDetails.user_id;
    let url = constants.USERMOOD_DEV_URL.replace("[userId]", userId).replace(
      "[occurredDate]",
      localToUtcDateTime(this.state.currentDate)
    );
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
          // If responseData is not empty, then isMoodDataAvailable = true
         
          if (Object.keys(responseData).length) {
            this.setState({
              isMoodDataAvailable: true,
              moodDetails: responseData.mood,
            });
        
          } else {
            this.setState({
              isMoodDataAvailable: false,
              moodDetails:{},
             });
             
          }
        })
        .catch((err) => console.log(err))
        
    );
  }

  getUserBlood  ()  {
    let userId = this.state.userDetails.user_id;
    let url = constants.USERBLOOD_DEV_URL.replace("[userId]", userId).replace(
      "[occurredDate]",
      localToUtcDateTime(this.state.currentDate)
    );
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
          // If responseData is not empty, then isMoodDataAvailable = true
         
          if (Object.keys(responseData).length) {
            this.setState({
              isBloodDataAvailable: true,
              bloodDetails: responseData.blood,
            });
        
          } else {
            this.setState({
              isBloodDataAvailable: false,
              bloodDetails:{},
             });
             
          }
        })
        .catch((err) => console.log(err))
        
    );
  }
  getUserDigestion  ()  {
    let userId = this.state.userDetails.user_id;
    let url = constants.USERDIGESTION_DEV_URL.replace("[userId]", userId).replace(
      "[occurredDate]",
      localToUtcDateTime(this.state.currentDate)
    );
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
          // If responseData is not empty, then isMoodDataAvailable = true
         
          if (Object.keys(responseData).length) {
            this.setState({
              isDigestionDataAvailable: true,
              digestionDetails: responseData.digestion,
            });
        
          } else {
            this.setState({
              isDigestionDataAvailable: false,
              digestionDetails:{},
             });
             
          }
        })
        .catch((err) => console.log(err))
        
    );
  }
  
  componentDidMount() {
    getData(constants.USERDETAILS).then((data) => {
      // Read back the user details from storage and convert to object
      this.state.userDetails = JSON.parse(data);
      this.setState({
        userDetails: JSON.parse(data),
      });
      this.getUserPain();
      this.getUserBlood(); 
      this.getUserMood();
      this.getUserDigestion();
    });
  }

  

  
  render() {
    var isAnyDataAvailable = this.state.isMoodDataAvailable || this.state.isPainDataAvailable||this.state.isBloodDataAvailable||this.state.isDigestionDataAvailable;
    return (
      <Layout style={styles.container}>
        <TopNavigation position="absolute" />

        <Divider />

        <Text
          style={{
            color: "#FFFFFF",
            fontSize:  wp('7%'),
            //lineHeight: 30,
            letterSpacing: wp('0%'),
            includeFontPadding: true,
            textAlign: "left",
            fontWeight: "bold",
            left: wp('-10%'),
            top: wp('5%'),
          }}
        >
          How are you, {this.state.userDetails.first_name} ?{" "}
        </Text>

        <CalendarStrip
          onDateSelected={(date) => this.setDate(date)}
          markedDates={[
            {
              date: moment().markedDates,
              selectDate: moment().markedDates,
              dots: [{ key: 0, color: "red", selectedDotColor: "blue" }],
            },
            {
              onSelectDate: moment().markedDates,

              dots: [{ key: 0, color: "red", selectedDotColor: "blue" }],
            },
          ]}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "background",
            duration: 200,
            borderWidth: 1,
            highlightColor: "white",
            borderHighlightColor: "white",
          }}
          scrollable
          style={{
            top: hp('5%'),
            height:hp('20%'),
            width: wp('130%'),
            paddingTop: hp('2%'),
            paddingBottom: hp('0%'),
          }}
          calendarHeaderStyle={{ color: "white" }}
          calendarColor={"#f09874"}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: "#f09874" }}
          highlightDateNameStyle={{ color: "#f09874" }}
          borderHighlightColor={{ color: "white" }}
          disabledDateNameStyle={{ color: "white" }}
          disabledDateNumberStyle={{ color: "white" }}
          iconContainer={{ flex: 0.13 }}
        />

      {isAnyDataAvailable ? (
          <>
            { this.state.isPainDataAvailable ? (
            <Card style={styles.cardPainContainer}>
            <Text style={styles.cardText}>Today you experienced...</Text>
             <Text style={styles.painText}>Pain</Text>
              <Text
                style={{
                  left: wp('-10%'),
                  paddingTop: hp('10%'),
                  color: "#8A8A8E",
                }}
              >
                Pain Level: {this.state.painDetails.pain_level}
              </Text>


              <Image
                style={styles.painIcon}
                source={require("../../assets/painia.png")}
              />

              <Text style={{ left: wp('35%'), top: hp('-5%'), color: "#8A8A8E" }}>
                {moment(this.state.painDetails.occurred_date).format("hh:mm A")}
              </Text>

              <Text
                style={{
                  left: wp('-4%'),
                  position: "absolute",
                  paddingTop:hp('15%'),
                  color: "#8A8A8E",
                }}
              >
                {this.state.painDetails.locations.map((location, index) => {
                  let locationText =
                    location.list_item_name +
                    (index < this.state.painDetails.locations.length - 1
                      ? ", "
                      : "");
                  return locationText;
                })}
              </Text>
              <Text
                style={{
                  left: wp('-10%'),
                  paddingTop: hp('-10%'),
                  color: "#8A8A8E",
                }}
              >
                Pain Type: {this.state.painDetails.pain_type_name}
                
              </Text>  
            </Card>
            ) : (<></>)}

            { this.state.isMoodDataAvailable ? (
            <Card style={styles.cardContainer}>
              <Text style={styles.cardText}>Today you experienced...</Text>


            <Text style={styles.painText}>Mood</Text>
              <Text
                style={{
                  left: wp('-10%'),
                  paddingTop: hp('10%'),
                  color: "#8A8A8E",
                }}
              >
               
                Mood Level: {this.state.moodDetails.mood_level} 
              </Text>


              <Image
                style={styles.painIcon}
                source={require("../../assets/painia.png")}
              />

              <Text style={{ left: wp('35%'), top: hp('-5%'), color: "#8A8A8E" }}>
                {moment(this.state.moodDetails.occurred_date).format("hh:mm A")}
              </Text>

            
              <Text
                style={{
                  left: wp('-10%'),
                  paddingTop: hp('-10%'),
                  color: "#8A8A8E",
                }}
              >
                Mood Type: {this.state.moodDetails.mood_description_name}
                
              </Text>

            </Card>
            ) : (<></>)}
            { this.state.isBloodDataAvailable ? (
            <Card style={styles.cardContainer}>
              <Text style={styles.cardText}>Today you experienced...</Text>


            <Text style={styles.painText}>Blood</Text>
              <Text
                style={{
                  left: wp('-10%'),
                  paddingTop: hp('10%'),
                  color: "#8A8A8E",
                }}
              >
               
                Blood Level: {this.state.bloodDetails.bleeding_level} 
              </Text>


              <Image
                style={styles.painIcon}
                source={require("../../assets/painia.png")}
              />

              <Text style={{ left: wp('35%'), top: hp('-5%'), color: "#8A8A8E" }}>
                {moment(this.state.bloodDetails.occurred_date).format("hh:mm A")}
              </Text>

            
              <Text
                style={{
                  left: wp('-10%'),
                  paddingTop: hp('-10%'),
                  color: "#8A8A8E",
                }}
              >
                Mood Type: {this.state.bloodDetails.period_product_name}
                
              </Text>

            </Card>
            ) : (<></>)}
            { this.state.isDigestionDataAvailable ? (
            <Card style={styles.cardContainer}>
              <Text style={styles.cardText}>Today you experienced...</Text>


            <Text style={styles.painText}>Digestion</Text>
              <Text
                style={{
                  left: wp('-10%'),
                  paddingTop: hp('10%'),
                  color: "#8A8A8E",
                }}
              >
               
                Digestion Level: {this.state.digestionDetails.digestion_level} 
              </Text>


              <Image
                style={styles.painIcon}
                source={require("../../assets/painia.png")}
              />

              <Text style={{ left: wp('35%'), top: hp('-5%'), color: "#8A8A8E" }}>
                {moment(this.state.digestionDetails.occurred_date).format("hh:mm A")}
              </Text>

            
              <Text
                style={{
                  left: wp('-10%'),
                  paddingTop: hp('-10%'),
                  color: "#8A8A8E",
                }}
              >
                Bowel Symptom: {this.state.digestionDetails.bowel_symptom_name}
                
              </Text>

            </Card>
            ) : (<></>)}
           
          </>
        ) : (
          <>
            <Image
              style={HomeStyles.girlContainer}
              source={require("../../assets/girl.png")}
            />
            <Text style={HomeStyles.headerText}>
              You haven't tracked anything today!
            </Text>
          </>
        )}


        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Track", {
              currentDate: this.state.currentDate,
            })
          }
        >
          <Image
            style={HomeStyles.ovalContainer}
            source={require("../../assets/oval.png")}
          />
        </TouchableOpacity>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#f09874",
    alignItems: "center",
    height: hp('25%'),
    justifyContent: "center",
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
    width: wp('95%'),
    borderRadius: 20,
    height: hp('20%'),
    top: hp('31%'),
    alignItems: "center",
    backgroundColor: "#ffff",
    // resizeMode: "contain"
  },
  cardPainContainer: {
    flex: 1,
    position: "absolute",
    width: wp('95%'),
    borderRadius: 20,
    height: hp('20%'),
    top: hp('50%'),
    alignItems: "center",
    backgroundColor: "#ffff",
    // resizeMode: "contain"
  },
  cardSmallContainer: {
    flex: 1,
    position: "absolute",
    width: wp('95%'),
    borderRadius: 20,
    height: hp('12%'),
    top: hp('32%'),
    alignItems: "center",
    backgroundColor: "#ffff",
    // resizeMode: "contain"
  },
  cardExercise: {
    flex: 1,
    position: "absolute",
    width: wp('95%'),
    borderRadius: 20,
    height: hp('12%'),
    top: hp('45%'),
    alignItems: "center",
    backgroundColor: "#ffff",
    // resizeMode: "contain"
  },
  cardText: {
    flex: 1,
    position: "absolute",
    fontSize: hp('3%'),
    fontWeight: "bold",
    letterSpacing: wp('0%'),
    justifyContent: "center",
    alignItems: "center",
    left:  wp('-28%'),
    paddingLeft: hp('2%'),
    paddingTop: hp('3%'),
  },
  medicationText: {
    flex: 1,
    position: "absolute",
    fontSize: hp('3%'),
    fontWeight: "bold",
    letterSpacing: wp('0%'),
    justifyContent: "center",
    alignItems: "center",
    left:  wp('-40%'),
    paddingLeft: hp('2%'),
    paddingTop: hp('3%'),
  },
  painText: {
    flex: 1,
    position: "absolute",
    fontSize: hp('2.5%'),
    fontWeight: "bold",
    letterSpacing: wp('0%'),
    justifyContent: "center",
    alignItems: "center",
    left:  wp('-8%'),
    paddingLeft: hp('2%'),
    paddingTop: hp('9%'),
  },
  painIcon: {
    position: "absolute",
    top: hp('3.5%'),
    width: wp('20%'),
    height: hp('20%'),
    left: wp('-28%'),
    resizeMode: "contain",
  },
});