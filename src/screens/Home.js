import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  TopNavigation,
  Layout,
  Divider,
  List,
  Card,
} from "@ui-kitten/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
//import { Value } from 'react-native-reanimated';
import { HomeStyles } from "./HomeStyles";
// import { CardList } from 'react-native-card-list';
//import { ScrollView } from 'react-native-gesture-handler';
import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../helpers/DateHelpers";
import { FlatList } from "react-native-gesture-handler";
import { initMoodDetails } from "../models/MoodDetails";


//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
var painSymptoms= [];
var moodSymptoms= [];
var bloodSymptoms=[]; 
var medicationSymptoms = [];
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

const extractKey = ({ id }) => id.toString()

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageVisibility: true,
      backgroundImagePath: require("../../assets/girl.png"),
      userDetails: {},
      currentDate: moment().format("YYYY-MM-DD"),
      painDetails: [{ locations: [] }],
      moodDetails: [{}],
      medicationDetails:[{}], 
      bloodDetails:[{}],
      isAnyDataAvailable: false,
      isAllDataLoaded: false
    };
    this.setDate = this.setDate.bind(this);
    this.getUserPain = this.getUserPain.bind(this);

    this.loadPainSymptomData = this.loadPainSymptomData.bind(this);
    this.loadMoodSymptomData = this.loadMoodSymptomData.bind(this);
    this.loadMedicationData = this.loadMedicationData.bind(this);
    this.loadBloodSymptomData=this.loadBloodSymptomData.bind(this);

    this.resetState = this.resetState.bind(this);
   
  }

  renderItem = ({ item }) => {
    return (
      <View >
        {item.available ? (
          <View >
            {item.id == 0 ? (<View style={styles.symptomView}>
            <Image style={styles.painIcon} source={item.image}></Image>
            <Text style={styles.symptomText}>{item.name}</Text></View>) : (<></>)} 
          
            <Text style={{ left: wp('27%'), top: hp('-12%'), color: "#8A8A8E", fontWeight: '500' }}>{item.levelText} {item.level}</Text>
            <Text style={styles.logText}> {item.logTime}</Text>
            <Text style={{ left: wp('27%'), top: hp('-14%'), color: "#8A8A8E", fontWeight: '500' }}>{item.tagText} {item.tags}</Text>
           
            {item.PainTag ? (
              <Text style={{
                left: wp('27%'), top: hp('-14%'), color: "#8A8A8E", fontWeight: '500', alignSelf: "flex-start",
                flexDirection: "row",
              }}>{item.tagLocText} {item.PainTag.map((location, index) => {
                let locationText =
                  location.list_item_name +
                  (index < item.PainTag.length - 1
                    ? ", "
                    : "");
                return locationText;
              })}
              </Text>
            ) : (<></>)}
            {item.medicationTypeText ? 
              ( <>
                <Text style={{ left: wp('27%'), top: hp('-14%'), color: "#8A8A8E", fontWeight: '500' }}>{item.medicationTypeText} {item.medicationType}</Text>
                <Text style={{ left: wp('27%'), top: hp('-14%'), color: "#8A8A8E", fontWeight: '500' }}>{item.medicationTimeText} {item.medicationTime}</Text>
                </>
              ) 
              : (<></>)}


            </View>
       ) : (<></>)}
      </View>

    )
  }
  setDate(newDate) 
  {
    this.resetState();
    // CalendarStrip converts the selected date to UTC format for e.g. 2020-06-15T12:00:00Z
    console.log("SELECTED DATE", newDate);
    console.log(localToUtcDateTime(newDate));
    let userId = this.state.userDetails.user_id;
    let url = constants.USERPAIN_DEV_URL.replace("[userId]", userId).replace( 
      "[occurredDate]",
      localToUtcDateTime(newDate)
    );
    console.log("Url is", url);
    var isAnyDataAvailable = false;
    var painDetails = [];
    var moodDetails = [];
    var bloodDetails =[];
    var medicationDetails = [];

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
          console.log("Completed API call");
          if (Object.keys(responseData.painRecords).length) 
          {
            isAnyDataAvailable = true;
            painDetails = responseData.painRecords;
          } 
          else {
            painDetails = [{ locations: []}];
          }

          if (Object.keys(responseData.moodRecords).length) 
          {
            isAnyDataAvailable = true;
            moodDetails = responseData.moodRecords;
          } 
          else 
          {
            moodDetails = [];
          }

          if (Object.keys(responseData.medicationRecords).length) {
            isAnyDataAvailable = true;
            medicationDetails = responseData.medicationRecords;
            } 
            else 
            {
              medicationDetails = [];
            }
          if (Object.keys(responseData.bloodRecords).length) 
            {
              isAnyDataAvailable = true;
              bloodDetails = responseData.bloodRecords;
            } 
          else 
          {
              bloodDetails = [];
          }

          this.setState({
            isAnyDataAvailable: isAnyDataAvailable,
            painDetails: painDetails,
            moodDetails: moodDetails,
            medicationDetails: medicationDetails,
            bloodDetails:bloodDetails
          });

          if (painDetails.length) this.loadPainSymptomData();
          if (moodDetails.length) this.loadMoodSymptomData();
          if (medicationDetails.length) this.loadMedicationData();
          if  (bloodDetails.length)this.loadBloodSymptomData();
          this.setState({
            isAllDataLoaded: true,
            currentDate: (newDate)
          });
        })
        .catch((err) => console.log(err))
    );
  }

  resetState()
  {
    this.setState({
        painDetails: [{ locations: [] }],
        moodDetails: [{}],
        medicationDetails:[{}], 
        bloodDetails:[{}],
        isAnyDataAvailable: false,
        isAllDataLoaded: false
      });
  }

  loadPainSymptomData() {
    console.log("Loading Pain Data...");
    var id = 0;
    painSymptoms = [];
    this.state.painDetails.forEach((painData, index) => {
      var symptom =  {
                id: id,
                name: 'Pain',
                level: painData.pain.pain_level,
                levelText: 'Pain level:',
                logTime: moment(painData.pain.occurred_date).format("hh:mm A"),
                tagText: 'Pain Type:',
                image: require("../../assets/painia.png"),
                PainTag: painData.pain.locations,
                available: true,
                tags: painData.pain.pain_type_name,
            };
      painSymptoms.push(symptom);
      id = id + 1;
    });
    console.log("Completed loading pain symptom data");
  }

  loadMoodSymptomData()
  {
    var id = 0;
    moodSymptoms = [];
    console.log("Loading Mood Data...");
    this.state.moodDetails.forEach((moodData, index) => {
      var symptom =  {
          id: id,
          name: 'Mood',
          level: moodData.mood.mood_level,
          levelText: 'Mood level:',
          logTime: moment(moodData.mood.occurred_date).format("hh:mm A"),
          tags: moodData.mood.mood_description_name,
          available: true,
          tagText: 'Mood Type:',
          image: require("../../assets/moodia.png")
        };
        moodSymptoms.push(symptom);
        id = id + 1;
    });
    console.log("Completed loading mood symptom data");
    }

    loadMedicationData () 
    {
        var id = 0;
        medicationSymptoms = [];
        console.log("Loading Meds Data...");
        this.state.medicationDetails.forEach((medicationData, index) => {
            var symptom =  {
                id: id,
                name: 'Medication',
                logTime:moment(medicationData.medication.occured_date).format("hh:mm A"),
                tags:medicationData.medication.medication_side_effects,
                tagText:'Side Effect:',
                medicationTypeText: 'Medication Type:',
	              medicationType:medicationData.medication.medication_type,
	              medicationTimeText: 'Time Taken:',
	              medicationTime: medicationData.medication.medication_time_taken,
	              levelText: 'Quantity:',
                level: medicationData.medication.medication_quantity,
                image: require("../../assets/medication.png"),
                available: true
                
                };
            medicationSymptoms.push(symptom);
            id = id + 1;
        });
        console.log("Completed loading meds symptom data");
    }
    loadBloodSymptomData()
    {
      var id = 0;
      bloodSymptoms = [];
      console.log("Loading Blood Data...");
      this.state.bloodDetails.forEach((bloodData, index) => {
        var symptom =  {
            id: id,
            name: 'Blood',
            level: bloodData.blood.bleeding_level,
            levelText: 'Blood level:',
            logTime: moment( bloodData.blood.occurred_date).format("hh:mm A"),
            tags:  bloodData.blood.period_product_name,
            available: true,
            tagText: 'Period product:',
            image: require("../../assets/bloodia.png")
          };
          bloodSymptoms.push(symptom);
          id = id + 1;
    });
    console.log("Completed loading blood symptom data");
    }


  getUserPain() {
 
  }
  
  componentWillMount() {
    getData(constants.USERDETAILS).then((data) => {
      // Read back the user details from storage and convert to object
      this.state.userDetails = JSON.parse(data);
      this.setState({
        userDetails: JSON.parse(data),
      });
      //this.getUserPain();
  })
}

  render() {
    //var isAnyDataAvailable = this.state.isMoodDataAvailable || this.state.isPainDataAvailable || this.state.isBloodDataAvailable || this.state.isDigestionDataAvailable || this.state.isExerciseDataAvailable || this.state.isSexDataAvailable || this.state.isDietDataAvailable|| this.state.isMedicationDataAvailable;
    //var isAllDataLoaded = this.state.isMoodDataLoaded && this.state.isPainDataLoaded && this.state.isMedicationDataLoaded;
    console.log("RENDER ALL DATA LOADED?", this.state.isAllDataLoaded);
    console.log("RENDER PAIN SMPTOMS", painSymptoms);
    console.log("RENDER MOOD SMPTOMS", moodSymptoms);
    console.log("RENDER MEDS SMPTOMS", medicationSymptoms);
    console.log("RENDER MEDS SMPTOMS", bloodSymptoms);
    return (
      <Layout style={styles.container}>
        <TopNavigation position="absolute" />

        <Divider />

        <View style={{ top: 230 }}>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: wp('7%'),
              //lineHeight: 30,
              letterSpacing: wp('0%'),
              includeFontPadding: true,
              textAlign: "left",
              fontWeight: "bold",
              left: wp('17%'),
              top: wp('10%'),
            }}
          >
            How are you, {this.state.userDetails.first_name}?{" "}
          </Text>

          <CalendarStrip
            onDateSelected={(date) => this.setDate(date)}
            markedDates={[
              {
                date: moment().markedDates,
                selectDate: moment().markedDates,
                dots: [{ key: 0, color: "white", selectedDotColor: "white" }],
              },
              {
                onSelectDate: moment().markedDates,

                dots: [{ key: 0, color: "white", selectedDotColor: "white" }],
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
              top: hp('8%'),
              height: hp('15%'),
              width: wp('130%'),
              // paddingTop: hp('2%'),
              paddingBottom: hp('5.2%'),
            }}
            calendarHeaderStyle={{ color: "white", top: hp('0'), fontWeight: '400' }}
            calendarColor={"#f09874"}
            dateNumberStyle={{ color: "white", fontSize: wp('3.4'), fontWeight: '400' }}
            dateNameStyle={{ color: "white", fontSize: wp('3.4'), fontWeight: '400' }}
            highlightDateNumberStyle={{ color: "#f09874", fontSize: wp('3.4'), fontWeight: '400' }}
            highlightDateNameStyle={{ color: "#f09874", fontSize: wp('3.4'), fontWeight: '400' }}
            borderHighlightColor={{ color: "white" }}
            disabledDateNameStyle={{ color: "white" }}
            disabledDateNumberStyle={{ color: "white" }}
            iconContainer={{ flex: 0.13 }}

          />
        </View>
        {this.state.isAnyDataAvailable ? (
          <>
            <View style={{ width: wp('100'), height: 500, backgroundColor: '#f2f2f2', top: 262, alignContent: "center" }}>
              <ScrollView contentContainerStyle={{
                justifyContent: "space-around",
                flex: 1,
                flexGrow: 1,
                flexDirection: "column",
                marginTop: "-42%",
                marginBottom: "-267%",
                justifyContent: "center",
                bottom: hp('-45%'),
              }}>

                <Card style={styles.cardContainer}>
                  {true ?  
                    (
                        <>
                        <Text style={styles.cardText}>Today you experienced...</Text>
                        
                        <FlatList
                            style={{ width: 400, top: 25, left: -37 }}
                            data={painSymptoms}
                            renderItem={this.renderItem}
                            keyExtractor={extractKey}
                        />
                        <FlatList
                            style={{ width: 400, top: 25, left: -37 }}
                            data={moodSymptoms}
                            renderItem={this.renderItem}
                            keyExtractor={extractKey}
                        />
                        <FlatList
                            style={{ width: 400, top: 25, left: -37 }}
                            data={medicationSymptoms}
                            renderItem={this.renderItem}
                            keyExtractor={extractKey}
                        />

                        <FlatList
                            style={{ width: 400, top: 25, left: -37 }}
                            data={bloodSymptoms}
                            renderItem={this.renderItem}
                            keyExtractor={extractKey}
                        />    
                        </>
                    ) : 
                    (<><Text style={styles.cardText}>Loading...</Text></>)}
                  
                </Card>
              </ScrollView>
            </View>
          </>
        ) : (
            <>
              <View style={{ width: wp('100'), height: 500, backgroundColor: '#f2f2f2', top: -231, alignContent: "center", marginTop: 500, marginBottom: -500 }}>
                <ScrollView>
                  <Image
                    style={HomeStyles.girlContainer}
                    source={require("../../assets/girl.png")}
                  />
                  <Text style={HomeStyles.headerText}>
                    You haven't tracked anything today!
            </Text>
                </ScrollView>
              </View>
            </>
          )}
        <Image
          style={HomeStyles.tabContainer}
          source={require("../../assets/bottomtab.png")}
        />
        <TouchableOpacity >
          <Image
            style={HomeStyles.careplan}
            source={require("../../assets/careplan.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Insights')}>
          <Image
            style={HomeStyles.insights}
            source={require("../../assets/insights.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image
            style={HomeStyles.learn}
            source={require("../../assets/learn.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
          <Image
            style={HomeStyles.settings}
            source={require("../../assets/settings.png")}
          />
        </TouchableOpacity>

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
    backgroundColor: "#f09874",
    alignItems: "center",
    height: hp('25%'),
    justifyContent: "center",
  },
  ScrollContainer: {
    width: wp('95%'),
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
    width: wp('90%'),
    borderRadius: 20,
    flexDirection: "row",
    // height: hp('40%'),
    alignSelf: "flex-start",
    top: hp('-20%'),
    alignItems: "center",
    left: wp('5'),
    backgroundColor: "#ffff",
    borderBottomColor: '#ffffff',
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#ffffff',
    backgroundColor: '#ffffff',
    shadowColor: '#c8c8c8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },
  symptomView: {
    
    padding: 15,
    marginBottom:25,
    color: "#8A8A8E",
    backgroundColor: "#ffff",
    fontWeight: 'bold',
    fontFamily: "French Script MT",
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffff',
    textAlign: 'center',
    fontSize: 10,
    height: 100
  },
  cardSmallContainer: {
    flex: 1,
    position: "absolute",
    width: wp('90%'),
    borderRadius: 20,
    height: hp('12%'),
    top: hp('-18%'),
    left: wp('5'),
    alignItems: "center",
    backgroundColor: "#ffff",
    borderBottomColor: '#ffffff',
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#ffffff',
    backgroundColor: '#ffffff',
    shadowColor: '#c8c8c8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },
  cardSContainer: {
    flex: 1,
    position: "absolute",
    width: wp('90%'),
    borderRadius: 20,
    height: hp('12%'),
    top: hp('70%'),
    left: wp('5'),
    alignItems: "center",
    backgroundColor: "#ffff",
    borderBottomColor: '#ffffff',
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#ffffff',
    backgroundColor: '#ffffff',
    shadowColor: '#c8c8c8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },

  cardText: {
    flex: 1,
    left: wp('5'),
    position: "absolute",
    fontSize: hp('2.6%'),
    fontWeight: "bold",
    letterSpacing: wp('0%'),
    justifyContent: "center",
    alignItems: "center",

    paddingLeft: hp('0%'),
    top: hp('1%'),
  },
  medicationText: {
    flex: 1,
    position: "absolute",
    fontSize: hp('3%'),
    fontWeight: "bold",
    letterSpacing: wp('0%'),
    justifyContent: "center",
    alignItems: "center",
    left: wp('-40%'),
    paddingLeft: hp('2%'),
    paddingTop: hp('3%'),
  },
  symptomText: {
    flex: 1,
    position: "absolute",
    fontSize: hp('2.5%'),
    fontWeight: "bold",
    letterSpacing: wp('0%'),
    justifyContent: "center",
    alignItems: "center",
    left: wp('18%'),
    paddingLeft: hp('2%'),
    top: hp('1%'),
  },

  logText:
  
    {
      left: wp('73%'),
      top: hp('-13%'),
      color: "#8A8A8E",
      fontWeight: '500'
    },
  
  painIcon: {
    position: "absolute",
    top: hp('-3.5%'),
    width: wp('20%'),
    height: hp('20%'),
    left: wp('0%'),
    resizeMode: "contain",
  },
});