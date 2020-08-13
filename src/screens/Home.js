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
  ListView,
  Modal
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
import { HomeStyles } from "./HomeStyles";
import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../helpers/DateHelpers";
import { FlatList } from "react-native-gesture-handler";
import { initMoodDetails } from "../models/MoodDetails";

var painSymptoms = [];
var moodSymptoms = [];
var bloodSymptoms = [];
var medicationSymptoms = [];
var dietSymptoms = [];
var digestionSymptoms = [];
var exerciseSymptoms = [];
var sexSymptoms = [];

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
      currentDate: this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD'),

      // If any data is available, then we need to display the card
      isAnyDataAvailable: false,
      // The symptom data/cards to be populated only after all symptom data has been loaded
      isAllDataLoaded: false
    };
    this.setDate = this.setDate.bind(this);
    this.getUserSymptoms = this.getUserSymptoms.bind(this);

    this.loadPainSymptomData = this.loadPainSymptomData.bind(this);
    this.loadMoodSymptomData = this.loadMoodSymptomData.bind(this);
    this.loadMedicationData = this.loadMedicationData.bind(this);
    this.loadBloodSymptomData = this.loadBloodSymptomData.bind(this);
    this.loadDietData = this.loadDietData.bind(this);
    this.loadDigestionData = this.loadDigestionData.bind(this);
    this.loadExerciseData = this.loadExerciseData.bind(this);
    this.loadSexData = this.loadSexData.bind(this);
    this.resetState = this.resetState.bind(this);

  }

  renderItem = ({ item }) => {
    // console.log("Child Id", item.childId);
    return (
      <View>
        {item.available ? (
          <View >
            {item.id == 0 ? (<View style={styles.symptomView}>
              <Image style={styles.painIcon} source={item.image}></Image>
              <Text style={styles.symptomText}>{item.name}</Text></View>) : (<></>)}

            <Text style={{ left: Responsive.width(96), top: Responsive.height(-85), color: "#8A8A8E", fontWeight: '500', fontSize: Responsive.font(13) }}>{item.levelText} {item.level}</Text>
            <Text style={styles.logText}> {item.logTime}</Text>
            <Text style={{ left: Responsive.width(96), fontSize: Responsive.font(13), top: Responsive.height(-100), color: "#8A8A8E", fontWeight: '500' }}>{item.tagText} {item.tags}</Text>

            {item.PainTag ? (
              <Text style={{
                left: Responsive.width(96), fontSize: Responsive.font(13), top: Responsive.height(-100), color: "#8A8A8E", fontWeight: '500', alignSelf: "flex-start",
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
              (<>
                <Text style={{ left: Responsive.width(96), top: Responsive.height(-132), color: "#8A8A8E", fontWeight: '500', fontSize: Responsive.font(13) }}>{item.medicationTypeText} {item.medicationType}</Text>
                <Text style={{ left: Responsive.width(96), top: Responsive.height(-132), color: "#8A8A8E", fontWeight: '500', fontSize: Responsive.font(13) }}>{item.medicationTimeText} {item.medicationTime}</Text>
                <Text style={{ left: Responsive.width(96), top: Responsive.height(-132), color: "#8A8A8E", fontWeight: '500', fontSize: Responsive.font(13) }}>{item.quantityText} {item.quantity}</Text>
                <Text style={{ left: Responsive.width(96), top: Responsive.height(-132), color: "#8A8A8E", fontWeight: '500', marginBottom: -35, }}>{item.medTagText} {item.medTags}</Text>

              </>
              )
              : (<></>)}


          </View>
        ) : (<></>)}
      </View>

    )
  }
  setDate(newDate) {
    this.resetState();
    this.setState({
      currentDate: newDate
    }, () => this.getUserSymptoms());
  }
  resetState() {
    this.setState({
      isAnyDataAvailable: false,
      isAllDataLoaded: false
    });
    painSymptoms = [];
    moodSymptoms = [];
    bloodSymptoms = [];
    medicationSymptoms = [];
    dietSymptoms = [];
    digestionSymptoms = [];
    exerciseSymptoms = [];
    sexSymptoms = [];
  }

  loadPainSymptomData(painDetails) {
    var id = 0;
    painSymptoms = [];
    painDetails.forEach((painData, index) => {
      var symptom = {
        id: id,
        name: 'Pain',
        level: painData.pain.pain_level,
        levelText: 'Pain level:',
        logTime: moment(painData.pain.occurred_date).format("hh:mm A"),
        tagText: 'Pain Type:',
        image: require("../../assets/painia.png"),
        PainTag: painData.pain.locations,
        tagLocText: 'Pain Location:',
        available: true,
        tags: painData.pain.pain_type_name,
      };
      painSymptoms.push(symptom);
      id = id + 1;
    });
  }

  loadMoodSymptomData(moodDetails) {
    var id = 0;
    moodSymptoms = [];
    moodDetails.forEach((moodData, index) => {
      var symptom = {
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
  }

  loadMedicationData(medicationDetails) {
    var id = 0;
    medicationSymptoms = [];
    medicationDetails.forEach((medicationData, index) => {
      var symptom = {
        id: id,
        name: 'Medication',
        logTime: moment(medicationData.medication.occurred_date).format("hh:mm A"),
        medTags: medicationData.medication.medication_side_effects,
        medTagText: 'Side Effect:',
        medicationTypeText: 'Medication Type:',
        medicationType: medicationData.medication.medication_type,
        medicationTimeText: 'Time Taken:',
        medicationTime: medicationData.medication.medication_time_taken,
        quantityText: 'Quantity:',
        quantity: medicationData.medication.medication_quantity,
        image: require("../../assets/medicationia.png"),
        available: true
      };
      medicationSymptoms.push(symptom);
      id = id + 1;
    });
  }
  loadBloodSymptomData(bloodDetails) {
    var id = 0;
    bloodSymptoms = [];
    bloodDetails.forEach((bloodData, index) => {
      var symptom = {
        id: id,
        name: 'Blood',
        level: bloodData.blood.bleeding_level,
        levelText: 'Blood level:',
        logTime: moment(bloodData.blood.occurred_date).format("hh:mm A"),
        tags: bloodData.blood.period_product_name,
        available: true,
        tagText: 'Period product:',
        image: require("../../assets/bloodia.png")
      };
      bloodSymptoms.push(symptom);
      id = id + 1;
    });
  }

  loadDietData(dietDetails) {
    var id = 0;
    dietSymptoms = [];
    dietDetails.forEach((dietData, index) => {
      var symptom = {
        id: id,
        name: 'Diet',
        level: dietData.diet.diet_level,
        levelText: 'Diet level:',
        logTime: moment(dietData.diet.occurred_date).format("hh:mm A"),
        tags: dietData.diet.food_type_name,
        available: true,
        tagText: 'Food:',
        image: require("../../assets/dietia.png")
      };
      dietSymptoms.push(symptom);
      id = id + 1;
    });
  }

  loadExerciseData(exerciseDetails) {
    var id = 0;
    exerciseSymptoms = [];
    exerciseDetails.forEach((exerciseData, index) => {
      var symptom = {
        id: id,
        name: 'Exercise',
        level: exerciseData.exercise.exercise_level,
        levelText: 'Exercise level:',
        logTime: moment(exerciseData.exercise.occurred_date).format("hh:mm A"),
        tags: exerciseData.exercise.exercise_type_name,
        available: true,
        tagText: 'Exercise type:',
        image: require("../../assets/exerciseia.png")
      };
      exerciseSymptoms.push(symptom);
      id = id + 1;
    });
  }

  loadDigestionData(digestionDetails) {
    var id = 0;
    digestionSymptoms = [];
    digestionDetails.forEach((digestionData, index) => {
      var symptom = {
        id: id,
        name: 'Digestion',
        level: digestionData.digestion.digestion_level,
        levelText: 'Digestion level:',
        logTime: moment(digestionData.digestion.occurred_date).format("hh:mm A"),
        tags: digestionData.digestion.bowel_symptom_name,
        available: true,
        tagText: 'Bowel symptom:',
        image: require("../../assets/digestionia.png")
      };
      digestionSymptoms.push(symptom);
      id = id + 1;
    });
  }

  loadSexData(sexDetails) {
    var id = 0;
    sexSymptoms = [];
    sexDetails.forEach((sexData, index) => {
      var symptom = {
        id: id,
        name: 'Sex',
        level: sexData.sex.sex_level,
        levelText: 'Sex level:',
        logTime: moment(sexData.sex.occurred_date).format("hh:mm A"),
        tags: sexData.sex.sexual_activity_name,
        available: true,
        tagText: 'Sexual activity:',
        image: require("../../assets/sexia.png")
      };
      sexSymptoms.push(symptom);
      id = id + 1;
    });
  }


  getUserSymptoms() {
    let userId = this.state.userDetails.user_id;
    let url = constants.USERPAIN_DEV_URL.replace("[userId]", userId).replace(
      "[occurredDate]",
      localToUtcDateTime(this.state.currentDate)
    );
    console.log("Url is", url);
    var isAnyDataAvailable = false;
    var painDetails = [];
    var moodDetails = [];
    var bloodDetails = [];
    var dietDetails = [];
    var digestionDetails = [];
    var exerciseDetails = [];
    var sexDetails = [];
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
          if (Object.keys(responseData.painRecords).length) {
            isAnyDataAvailable = true;
            painDetails = responseData.painRecords;
          }
          if (Object.keys(responseData.moodRecords).length) {
            isAnyDataAvailable = true;
            moodDetails = responseData.moodRecords;
          }
          if (Object.keys(responseData.medicationRecords).length) {
            isAnyDataAvailable = true;
            medicationDetails = responseData.medicationRecords;
          }
          if (Object.keys(responseData.bloodRecords).length) {
            isAnyDataAvailable = true;
            bloodDetails = responseData.bloodRecords;
          }
          if (Object.keys(responseData.dietRecords).length) {
            isAnyDataAvailable = true;
            dietDetails = responseData.dietRecords;
          }
          if (Object.keys(responseData.digestionRecords).length) {
            isAnyDataAvailable = true;
            digestionDetails = responseData.digestionRecords;
          }
          if (Object.keys(responseData.exerciseRecords).length) {
            isAnyDataAvailable = true;
            exerciseDetails = responseData.exerciseRecords;
          }
          if (Object.keys(responseData.sexRecords).length) {
            isAnyDataAvailable = true;
            sexDetails = responseData.sexRecords;
          }


          if (painDetails.length) this.loadPainSymptomData(painDetails);
          if (moodDetails.length) this.loadMoodSymptomData(moodDetails);
          if (medicationDetails.length) this.loadMedicationData(medicationDetails);
          if (bloodDetails.length) this.loadBloodSymptomData(bloodDetails);
          if (dietDetails.length) this.loadDietData(dietDetails);
          if (digestionDetails.length) this.loadDigestionData(digestionDetails);
          if (exerciseDetails.length) this.loadExerciseData(exerciseDetails);
          if (sexDetails.length) this.loadSexData(sexDetails);

          this.setState({
            isAnyDataAvailable: isAnyDataAvailable,
            isAllDataLoaded: true,
          });
        })
        .catch((err) => console.log(err))
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      // To load symptoms for the selected date after tracking as the home screen is already mounted and only comes into focus
      this.getUserSymptoms();
    });
    getData(constants.USERDETAILS).then((data) => {
      // Read back the user details from storage and convert to object
      this.setState({
        userDetails: JSON.parse(data),
      });
      this.getUserSymptoms();
    })
  }

  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation position="absolute" />

        <Divider />

        <View style={{ top: 230 }}>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: Responsive.font(25),
              letterSpacing: wp('0%'),
              includeFontPadding: true,
              textAlign: "left",
              fontWeight: "600",
              left: Responsive.width(80),
              top: Responsive.height(35),
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
              top: Responsive.height(70),
              height: Responsive.height(105),
              width: Responsive.width(500),
              paddingBottom: Responsive.height(70),
              //paddingTop: Responsive.height(7),
            }}
            calendarHeaderStyle={{ paddingBottom: Responsive.height(20), paddingTop: Responsive.height(27), color: "white", top: Responsive.height(-30), fontWeight: '400', fontSize: Responsive.font(14) }}
            calendarColor={"#f09874"}
            dateNumberStyle={{ color: "white", fontSize: Responsive.font(13), fontWeight: '400' }}
            dateNameStyle={{ color: "white", fontSize: Responsive.font(13), fontWeight: '400' }}
            highlightDateNumberStyle={{ color: "#f09874", fontSize: Responsive.font(13), fontWeight: '400' }}
            highlightDateNameStyle={{ color: "#f09874", fontSize: Responsive.font(13), fontWeight: '400' }}
            borderHighlightColor={{ color: "white" }}
            disabledDateNameStyle={{ color: "white" }}
            disabledDateNumberStyle={{ color: "white" }}
            iconContainer={{ flex: 0.13 }}

          />
        </View>
        {this.state.isAllDataLoaded ? (
          <>
            {this.state.isAnyDataAvailable ? (
              <>
                <View style={{ width: Responsive.width(360), height: Responsive.height(435), backgroundColor: '#f2f2f2', top: Responsive.height(250), alignSelf: "center" }}>


                  <ScrollView contentContainerStyle={{
                    justifyContent: "space-around",
                    flex: 1,
                    flexGrow: 1,
                    flexDirection: "column",
                    marginTop: Responsive.height(-435),
                    marginBottom: "-267%",
                    justifyContent: "center",
                    bottom: Responsive.height(-580),
                  }}>

                    <Card style={styles.cardContainer}>
                      <Text style={styles.cardText}>Today you experienced...</Text>

                      <FlatList
                        style={{ width: Responsive.width(400), top: Responsive.height(25), left: Responsive.width(-37) }}
                        data={painSymptoms}                      
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}
                      />



                      <FlatList
                        style={{ width: Responsive.width(400), top: Responsive.height(25), left: Responsive.width(-37) }}
                        data={moodSymptoms}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}
                      />


                      <FlatList
                        style={{ width: Responsive.width(400), top: Responsive.height(25), left: Responsive.width(-37) }}
                        data={bloodSymptoms}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}
                      />


                      <FlatList
                        style={{ width: Responsive.width(400), top: Responsive.height(25), left: Responsive.width(-37) }}
                        data={digestionSymptoms}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}
                      />


                      <FlatList
                        style={{ width: Responsive.width(400), top: Responsive.height(25), left: Responsive.width(-37) }}
                        data={exerciseSymptoms}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}
                      />


                      <FlatList
                        style={{ width: Responsive.width(400), top: Responsive.height(25), left: Responsive.width(-37) }}
                        data={medicationSymptoms}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}
                      />


                      <FlatList
                        style={{ width: Responsive.width(400), top: Responsive.height(25), left: Responsive.width(-37) }}
                        data={dietSymptoms}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}
                      />


                      <FlatList
                        style={{ width: Responsive.width(400), top: Responsive.height(25), left: Responsive.width(-37) }}
                        data={sexSymptoms}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}
                      />

                    </Card>

                  </ScrollView>

                </View>
              </>
            )
              : (
                <>
                  <View style={{ width: Responsive.width(360), height: Responsive.height(435), backgroundColor: '#f2f2f2', top: Responsive.height(250), alignSelf: "center" }}>
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
          </>
        ) :
          (
            <View style={{ width: Responsive.width(360), height: Responsive.height(435), backgroundColor: '#f2f2f2', top: Responsive.height(250), alignSelf: "center" }}>
              <ScrollView>
                <Text style={styles.cardText}>
                  Loading...
              </Text>
              </ScrollView>
            </View>
          )
        }

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
        <TouchableOpacity
        // onPress={() => this.props.navigation.navigate('Settings')}
        >
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
    height: Responsive.height(180),
    justifyContent: "center",
  },
  // ScrollContainer: {
  //   width: wp('95%'),
  // },

  // textContainer: {
  //   flex: 1,
  //   position: "absolute",
  //   top: hp('88%'),
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
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
    padding: Responsive.height(15),
    marginBottom: Responsive.height(15),
    color: "#8A8A8E",
    backgroundColor: "#ffff",
    fontWeight: 'bold',
    fontFamily: "French Script MT",
    marginRight: Responsive.width(20),
    marginLeft: Responsive.width(20),
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: '#ffff',
    textAlign: 'center',
    fontSize: Responsive.font(10),
    height: Responsive.height(100),
    //top:10
  },

  cardText: {
    flex: 1,
    left: wp('5'),
    position: "absolute",
    fontSize: Responsive.font(16),
    fontWeight: "600",
    letterSpacing: wp('0%'),
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: hp('0%'),
    top: Responsive.height(10),
  },

  symptomText: {
    flex: 1,
    position: "absolute",
    fontSize: Responsive.font(18),
    fontWeight: "600",
    letterSpacing: wp('0%'),
    justifyContent: "center",
    alignItems: "center",
    left: Responsive.width(74),
    paddingLeft: Responsive.height(2),
    top: Responsive.height(2),
  },

  logText:

  {
    fontSize: Responsive.font(12.5),
    left: Responsive.width(260),
    top: Responsive.height(-95),
    color: "#8A8A8E",
    fontWeight: '500'
  },

  painIcon: {
    position: "absolute",
    top: Responsive.height(2),
    width: Responsive.width(70),
    height: Responsive.height(70),
    left: wp('0%'),
    resizeMode: "contain",
  },
});