import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableWithoutFeedback
} from "react-native";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Card,
  Toggle,
} from "@ui-kitten/components";
import { HomeStyles } from "./HomeStyles";
import { ImageStyles } from "./ImageStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
import { TrackScreen } from "./TrackScreen";
import PainCard from "./TrackingCards/PainCard";
import { TrackingStyles } from "./TrackingStyles";
import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import { saveUserSettings } from "../helpers/SettingHelpers";
import Responsive from "react-native-lightweight-responsive";

export default class CustomiseTracking extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      PainCard: false,
      activeSwitch: null,
      userDetails: {},
      userSettings: {}
    };
  }
  onCheckedPainChange = (val) => {
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        enable_pain: !this.state.userSettings.enable_pain
      },
    });
  };
  onCheckedBloodChange = () => {
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        enable_bleeding: !this.state.userSettings.enable_bleeding
      },
    });
  };
  onCheckedMoodChange = () => {
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        enable_mood: !this.state.userSettings.enable_mood
      },
    });
  };
  onCheckedDietChange = () => {
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        enable_diet: !this.state.userSettings.enable_diet
      },
    });
  };
  onCheckedDigestionChange = () => {
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        enable_digestion: !this.state.userSettings.enable_digestion
      },
    });
  };
  onCheckedExerciseChange = () => {
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        enable_exercise: !this.state.userSettings.enable_exercise
      },
    });
  };
  onCheckedMedicineChange = () => {
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        enable_medication: !this.state.userSettings.enable_medication
     
      },
    });
  };
  onCheckedSexChange = () => {
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        enable_sex: !this.state.userSettings.enable_sex
      },
    });
  };
  ShowHideComponent = () => {
    this.setState({ show: !this.state.show });
  };

  // ***************ADDED HERE************
  updateUserSettings() {
    let url = constants.UPDATEUSERSETTINGS_DEV_URL;
    let setting = this.state.userSettings;

    getData(constants.JWTKEY).then((jwt) =>
      fetch(url, {
        //calling API
        method: "PUT",
        headers: {
          Authorization: "Bearer " + jwt, //Passing this will authorize the user
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(setting)
      })
        .then((response) => {
          // Update the saved settings 
          saveUserSettings(this.state.userDetails.user_id);
        })
    );

  }
  functionCombined() {
    this.functionOne();
    this.functionTwo();
  }

  componentDidMount() {
    getData(constants.USERDETAILS).then((data) => {
      // Read back the user details from storage and convert to object
      this.setState({
        userDetails: JSON.parse(data)
      });
    })
      .then((data) => {
        getData(constants.USERSETTINGS).then((data) => {
          // Read back the user settings from storage and convert to object
          this.setState({
            userSettings: JSON.parse(data),
          });
        })
      });
  }
  handleSignUp = () => {


  }

  render() {
    var isPainChecked = (this.state.userSettings && this.state.userSettings.enable_pain) || false;
    var isMoodChecked = (this.state.userSettings && this.state.userSettings.enable_mood) || false;
    var isBleedingChecked = (this.state.userSettings && this.state.userSettings.enable_bleeding) || false;
    var isDietChecked = (this.state.userSettings && this.state.userSettings.enable_diet) || false;
    var isDigestionChecked = (this.state.userSettings && this.state.userSettings.enable_digestion) || false;
    var isExerciseChecked = (this.state.userSettings && this.state.userSettings.enable_exercise) || false;
    var isMedicationChecked = (this.state.userSettings && this.state.userSettings.enable_medication) || false;
    var isSexChecked = (this.state.userSettings && this.state.userSettings.enable_sex) || false;
    return (
      <Layout style={styles.mainContainer}>
        <TopNavigation
          position="absolute"
          top={0}
          style={{ height: hp("14%"), width: width }}
        />
        <Text
          style={{
            top: Responsive.height(45),
            left: Responsive.width(10),
            fontSize: Responsive.font(26),
            fontWeight: "700",
            color: 'white'
          }}
        >
          Customise
        </Text>
        <Button
          style={{ left: Responsive.width(140), top: Responsive.height(10) }}
          appearance="outline"
          onPress={() => this.props.navigation.navigate("HTwo")}
        >
          Done
        </Button>
        {/* <Divider /> */}
        {/* <View
          style={{
            shadowColor: "#c8c8c8",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 30,
          }}
        > */}
        <View
          style={{
            width: width,
            height: Responsive.height(673),
            backgroundColor: "#f2f2f2",
            top: Responsive.height(43),
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
              marginTop: Responsive.height(830),
              marginBottom: Responsive.height(-1100),
              justifyContent: "center",
              bottom: Responsive.height(200),
              top: Responsive.height(-820),
              left: Responsive.height(1),
              shadowColor: "#c8c8c8",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 30,
            }}
          >
            <Card style={styles.cardContainer}>

              <Image
                source={require("../../assets/painia.png")}
                style={{ resizeMode: 'contain', width: Responsive.width(60), height: Responsive.height(60), left: Responsive.width(-95) }}
              />

              <Image
                source={require("../../assets/moodia.png")}
                style={{ resizeMode: 'contain', width: Responsive.width(60), height: Responsive.height(60), left: Responsive.width(-95), top: Responsive.height(10) }}
              />

              <Image
                source={require("../../assets/bloodia.png")}
                style={{ resizeMode: 'contain', width: Responsive.width(60), height: Responsive.height(60), left: Responsive.width(-95), top: 20 }}
              />
              <Image
                source={require("../../assets/dietia.png")}
                style={{ resizeMode: 'contain', width: Responsive.width(60), height: Responsive.height(70), left: Responsive.width(-95), top: 25 }}
              />
              <Image
                source={require("../../assets/exerciseia.png")}
                style={{ resizeMode: 'contain', width: Responsive.width(65), height: Responsive.height(70), left: Responsive.width(-95), top: 25 }}
              />
              <Image
                source={require("../../assets/medicationia.png")}
                style={{ resizeMode: 'contain', width: Responsive.width(60), height: Responsive.height(60), left: Responsive.width(-95), top: 25 }}
              />
              <Image
                source={require("../../assets/digestionia.png")}
                style={{ resizeMode: 'contain', width: Responsive.width(60), height: Responsive.height(60), left: Responsive.width(-95), top: 25 }}
              />
              <Image
                source={require("../../assets/sexia.png")}
                style={{ resizeMode: 'contain', width: Responsive.width(60), height: Responsive.height(55), left: Responsive.width(-93), top: 25 }}
              />
              <Text style={{ top: Responsive.height(-477), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(-10) }}>Pain</Text>
              <Switch
                style={styles.togglePain}
                onValueChange={this.onCheckedPainChange.bind(this)}
                value={isPainChecked}
                trackColor={{ false: "#767577", true: "#f09874" }}
                thumbColor={isPainChecked ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#8A8A8E"
              >  
              </Switch>
              <Text style={{ top: Responsive.height(-433), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(-10) }}>Mood</Text>
              <Switch
                style={styles.toggleMood}
                value={isMoodChecked}
                onValueChange={this.onCheckedMoodChange.bind(this)}
                trackColor={{ false: "#767577", true: "#f09874" }}
                thumbColor={isMoodChecked ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#8A8A8E"

              >
              </Switch>

              <Text style={{ top: Responsive.height(-385), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(-10) }}>Blood</Text>
              <Switch
                style={styles.toggleBlood}
                value={isBleedingChecked}
                onValueChange={this.onCheckedBloodChange.bind(this)}
                trackColor={{ false: "#767577", true: "#f09874" }}
                thumbColor={isBleedingChecked ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#8A8A8E"

              >
              </Switch>
              <Text style={{ top: Responsive.height(-337), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(-10) }}>Diet</Text>
              <Switch
                style={styles.toggleDiet}
                value={isDietChecked}
                onValueChange={this.onCheckedDietChange.bind(this)}
                trackColor={{ false: "#767577", true: "#f09874" }}
                thumbColor={isDietChecked ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#8A8A8E"

              >
              </Switch>
              <Text style={{ top: Responsive.height(-290), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(-10) }}>Exercise</Text>
              <Switch
                style={styles.toggleExercise}
                value={isExerciseChecked}
                onValueChange={this.onCheckedExerciseChange.bind(this)}
                trackColor={{ false: "#767577", true: "#f09874" }}
                thumbColor={isExerciseChecked ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#8A8A8E"
              >
              </Switch>
              <Text style={{ top: Responsive.height(-250), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(-10) }}>Medication</Text>
              <Switch
                style={styles.toggleMedication}
                value={isMedicationChecked}
                onValueChange={this.onCheckedMedicineChange.bind(this)}
                trackColor={{ false: "#767577", true: "#f09874" }}
                thumbColor={isMedicationChecked ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#8A8A8E"
              >
              </Switch>
              <Text style={{ top: Responsive.height(-210), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(-10) }}>Digestion</Text>
              <Switch
                style={styles.toggleDigestion}
                value={isDigestionChecked}
                onValueChange={this.onCheckedDigestionChange.bind(this)}
                trackColor={{ false: "#767577", true: "#f09874" }}
                thumbColor={isDigestionChecked ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#8A8A8E"
              >
              </Switch>
              <Text style={{ top: Responsive.height(-170), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(-10) }}>Sex</Text>
              <Switch
                style={styles.toggleSex}
                value={isSexChecked}
                onValueChange={this.onCheckedSexChange.bind(this)}
                trackColor={{ false: "#767577", true: "#f09874" }}
                thumbColor={isSexChecked ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#8A8A8E"
              >
              
              </Switch>

              <Button
                style={styles.trackButton}
                appearance='outline'
                onPress={() => {
             
                  this.updateUserSettings();

                  this.props.navigation.navigate('TrackCust');

                }}

              > Save!
                            </Button>

            </Card>
          </ScrollView>
          
        </View>
        <Image
          style={HomeStyles.tabContainer}
          source={require("../../assets/bottomtab.png")}
        />
    
          <TouchableWithoutFeedback>
            <Image
              style={HomeStyles.insightcareplan}
              source={require("../../assets/careplan.png")}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("Insights")}
          >
            <Image
              style={HomeStyles.insightinsights}
              source={require("../../assets/insights.png")}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback  onPress={() => this.props.navigation.navigate("Learn")}>
            <Image
              style={HomeStyles.insightlearn}
              source={require("../../assets/learn.png")}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("HTwo")}
          >
            <Image
              style={HomeStyles.insightsettings}
              source={require("../../assets/settings.png")}
            />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate("Track", {
                currentDate: this.state.currentDate,
              })
            }
          >
            <Image
              style={HomeStyles.ovalContainerInsights}
              source={require("../../assets/oval.png")}
            />
          </TouchableWithoutFeedback>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    height: hp("14"),
  },
  trackButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: Responsive.height(540),
    left: Responsive.width(-65),
    backgroundColor: "#f09874",
    borderRadius: 25,
    width: Responsive.width(280),

  },
  signBtnContainer: {
    position: "absolute",
    width: wp("95%"),
    height: hp("7%"),
    borderRadius: 24,
    top: hp("85%"),
    backgroundColor: "#fff",
    includeFontPadding: true,
    paddingVertical: 5,
  },

  togglePain: {
    position: "absolute",
    top: Responsive.height(30),
    left: Responsive.height(120),
    backgroundColor: "#fff",
  },

  toggleMood: {
    position: "absolute",
    top: Responsive.height(100),
    left: Responsive.height(120),
    backgroundColor: "#fff",
  },
  toggleBlood: {
    position: "absolute",
    top: Responsive.height(170),
    left: Responsive.height(120),
    backgroundColor: "#fff",
  },
  toggleDiet: {
    position: "absolute",
    top: Responsive.height(230),
    left: Responsive.height(120),
    backgroundColor: "#fff",
  },
  toggleExercise: {
    position: "absolute",
    top: Responsive.height(300),
    left: Responsive.height(120),
    backgroundColor: "#fff",
  },
  toggleMedication: {
    position: "absolute",
    top: Responsive.height(365),
    left: Responsive.height(120),
    backgroundColor: "#fff",
  },
  toggleDigestion: {
    position: "absolute",
    top: Responsive.height(430),
    left: Responsive.height(120),
    backgroundColor: "#fff",
  },
  toggleSex: {
    position: "absolute",
    top: Responsive.height(485),
    left: Responsive.height(120),
    backgroundColor: "#fff",
  },

  loginBtnContainer: {
    position: "absolute",
    width: wp("95%"),
    height: hp("7%"),
    borderRadius: 24,
    top: hp("75%"),
    backgroundColor: "white",
    includeFontPadding: true,
    paddingVertical: 5,
  },
  cardContainer: {
    flex: 1,
    position: "absolute",
    width: Responsive.width(320),
    borderRadius: 20,
    height: Responsive.height(600),
    left: Responsive.height(16),
    top: hp("5%"),
    alignItems: "center",
    backgroundColor: "#ffff",
    borderBottomColor: "#ffffff",
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#ffffff",
    backgroundColor: "#ffffff",
    shadowColor: "#c8c8c8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
});
