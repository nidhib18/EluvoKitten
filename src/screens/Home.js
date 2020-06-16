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
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
//import { Value } from 'react-native-reanimated';
import { HomeStyles } from "./HomeStyles";
// import { CardList } from 'react-native-card-list';
//import { ScrollView } from 'react-native-gesture-handler';
import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import { utcToLocal } from "../helpers/DateHelpers";
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

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

// 1 day disabled

//     //picture: require("../../assets/dots.png"),
//     content: <Text>Bedroom in Arles</Text>
//   }
// ]

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageVisibility: true,
      backgroundImagePath: require("../../assets/girl.png"),
      userDetails: {},
      currentDate: moment().format("YYYY-MM-DD"),
      painDetails: { locations: []},
      isPainDataAvailable: false
    };
    this.setDate = this.setDate.bind(this);
    this.getUserPain = this.getUserPain.bind(this);
    // Get pain details
    //this.setState({ painDetails: JSON.parse(getUserPain())   })
  }

  //  const b = new Home ();

  setDate(newDate) {
    // CalendarStrip converts the selected date to UTC format for e.g. 2020-06-15T12:00:00Z
    this.state.currentDate = utcToLocal(newDate);
    console.log("Current Date", this.state.currentDate);
    this.getUserPain();
  }

  getUserPain () {
    let userId = this.state.userDetails.user_id;
    let url = constants.USERPAIN_DEV_URL.replace("[userId]", userId).replace(
      "[occurredDate]",
      this.state.currentDate
    );
    console.log("Url is", url);
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
          console.log(responseData);
          if (Object.keys(responseData).length)
          {
            this.setState({
              isPainDataAvailable: true,
              painDetails : responseData.pain
            });
          }
          else
          {
            this.setState({
              isPainDataAvailable: false,
              painDetails: { locations: []}
            });
          }
        })
        .catch((err) => console.log(err))
    );
  };
  componentDidMount()
  {
    getData(constants.USERDETAILS).then((data) => {
      // Read back the user details from storage and convert to object
      this.state.userDetails = JSON.parse(data);
      this.setState({
        userDetails: JSON.parse(data),
      });
      this.getUserPain();
    });
  }


  // changeImgaeVisibility = () => {
  //   if(this.state.imageVisibility){
  //       this.setState({imageVisibility: false, backgroundImagePath: null})
  //   }else{
  //       this.setState({imageVisibility: true, backgroundImagePath: require("../../assets/girl.png")})
  //   }
  //   }
  // componentDidMount = () => {
  //   const data = json.stringify(painDetails)
  //   this.setState({ data })
  // }
  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation position="absolute" />

        <Divider />

        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 28,
            lineHeight: 30,
            letterSpacing: -0.24,
            includeFontPadding: true,
            textAlign: "left",
            fontWeight: "bold",
            left: -40,
            top: 10,
          }}>How are you, {this.state.userDetails.first_name} ? </Text>

        <CalendarStrip
          onDateSelected={(date) => this.setDate(date)}
          markedDates={[
            {
              date: moment().markedDates,
              selectDate: moment().markedDates,
              dots: [{ key: 0, color: "red", selectedDotColor: "blue" }],
            },
            {
              onSelectDate:moment().markedDates,

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
            top: 50,
            height: 100,
            width: 500,
            paddingTop: 10,
            paddingBottom: -10,
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

        {this.state.isPainDataAvailable ?
          ( 
            <>
            <Card style={styles.cardSmallContainer}>
              <Text style={styles.cardText}>Take Ginet</Text>
            </Card>
            <Card style={styles.cardContainer}>
              <Text style={styles.cardText}>Today you experienced...</Text>
              <Text>Today ....,Pain Level: {this.state.painDetails.pain_level}</Text>
                       
                
              
             <Text>{moment(this.state.painDetails.occurred_date).format("hh:mm A")}</Text>
              
              <Text>{this.state.painDetails.locations.map((location, index) => { 
                  let locationText = location.pain_location + (index < this.state.painDetails.locations.length-1 ? ", " : "");
                  return locationText 
                })}</Text>


            </Card>
            </>
           
          ) :
          (
            <>
              <Image style={HomeStyles.girlContainer} source={require('../../assets/girl.png')} />
              <Text style={HomeStyles.headerText}>You haven't tracked anything today!</Text>
            </>
          )
        }

       

        <TouchableOpacity
         onPress={() => this.props.navigation.navigate("TrackT",{ currentDate: this.state.currentDate })}>
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
    height: 200,
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
    position: "absolute",
    top: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flex: 1,
    position: "absolute",
    width: 400,
    borderRadius: 20,
    height: 242,
    top: 390,
    alignItems: "center",
    backgroundColor: "#ffff",
    // resizeMode: "contain"
  },

  cardSmallContainer: {
    flex: 1,
    position: "absolute",
    width: 400,
    borderRadius: 20,
    height: 64,
    top: 260,
    alignItems: "center",
    backgroundColor: "#ffff",
    // resizeMode: "contain"
  },

  cardText: {
    flex: 1,
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: -0.32,
    lineHeight: 20,
    justifyContent: "center",
    alignItems: "center",
    left: -100,
    paddingLeft: 10,
    paddingTop: 30,
  },
});
