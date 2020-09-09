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
import { TrackScreen } from "./TrackScreen";
import PainCard from "./TrackingCards/PainCard";
import { TrackingStyles } from "./TrackingStyles";
import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
import {saveUserSettings} from "../helpers/SettingHelpers";
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
  onCheckedPainChange = (val) =>
   {
        this.setState({
          userSettings: {
            ...this.state.userSettings,
            enable_pain: !this.state.userSettings.enable_pain 
          },
        });
   };
   onCheckedBloodChange = () =>
   {
    this.setState({
      userSettings: {
        ...this.state.userSettings,
        enable_bleeding:!this.state.userSettings.enable_bleeding
      },
    });
   };
   onCheckedMoodChange = () =>
   {
      this.setState({
        userSettings: {
          ...this.state.userSettings,
            enable_mood:!this.state.userSettings.enable_mood
      },
    });
   };
   onCheckedDietChange =() =>
   {
        this.setState({
        userSettings: {
          ...this.state.userSettings,
            enable_diet:!this.state.userSettings.enable_diet
      },
  });
   };
   onCheckedDigestionChange =() =>
   {
        this.setState({
           userSettings: {
           ...this.state.userSettings,
          enable_digestion:!this.state.userSettings.enable_digestion
    },
});
   };
   onCheckedExerciseChange =() =>
   {
    this.setState({
      userSettings: {
      ...this.state.userSettings,
     enable_exercise:!this.state.userSettings.enable_exercise
},
});
   };
   onCheckedMedicineChange =() =>
   {
    this.setState({
      userSettings: {
      ...this.state.userSettings,
     enable_medication:!this.state.userSettings.enable_medication
},
});
   };
   onCheckedSexChange =() =>
   {
    this.setState({
      userSettings: {
      ...this.state.userSettings,
     enable_sex:!this.state.userSettings.enable_sex
},
});
   };
  ShowHideComponent = () => {
    this.setState({ show: !this.state.show });
  };

// ***************ADDED HERE************
updateUserSettings ()
{
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

componentDidMount()
{
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

render() 
{
    var isPainChecked = (this.state.userSettings && this.state.userSettings.enable_pain) || false;
    var isMoodChecked =(this.state.userSettings && this.state.userSettings.enable_mood) || false;
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
            top: hp("2%"),
            left: wp("-30"),
            fontSize: wp("7.5%"),
            fontWeight: "700",
          }}
        >
          Settings
        </Text>
        <Button
          style={{ left: wp("40%"), top: wp("3"), height: hp("5%") }}
          appearance="outline"
          onPress={() => this.props.navigation.navigate("Settings")}
        >
          Done
        </Button>
        <Divider />
        <View
          style={{
            shadowColor: "#c8c8c8",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 30,
          }}
        >
          <Card style={styles.cardContainer}>
            {/*                  
                        {this.state.show ? (
                            <Image
                                source={{
                                    uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
                                }}
                                style={{ width: 100, height: 100 }}
                            />
                        ) : null}
                        <Button title="Hide/Show Component" onPress={this.ShowHideComponent} /> */}
            <Image
              source={require("../../assets/painia.png")}
              style={{ width: 60, height: 60, left: -120 }}
            />

            <Image
              source={require("../../assets/moodia.png")}
              style={{ width: 60, height: 60, left: -120, top: 10 }}
            />

            <Image
              source={require("../../assets/bloodia.png")}
              style={{ width: 60, height: 60, left: -120, top: 20 }}
            />
            <Image
              source={require("../../assets/dietia.png")}
              style={{ width: 60, height: 60, left: -120, top: 25 }}
            />
            <Image
              source={require("../../assets/exerciseia.png")}
              style={{ width: 60, height: 60, left: -120, top: 25 }}
            />
            <Image
              source={require("../../assets/medicationia.png")}
              style={{ width: 60, height: 60, left: -120, top: 25 }}
            />
            <Image
              source={require("../../assets/digestionia.png")}
              style={{ width: 60, height: 60, left: -120, top: 25 }}
            />
            <Image
              source={require("../../assets/sexia.png")}
              style={{ width: 60, height: 60, left: -120, top: 25 }}
            />

            <Toggle
              style={styles.togglePain}
              onChange={this.onCheckedPainChange.bind(this)}
              checked={isPainChecked}
              //onChange={(value) => this.setState({painChecked: value})}
                //value = {this.state.painChecked}
            >
              {/* {`Checked: ${this.state.painChecked}`}{" "} */}
            </Toggle>
            <Toggle
              style={styles.toggleMood}
              checked={isMoodChecked}
              onChange={this.onCheckedMoodChange.bind(this)}
              //onValueChange={(value) => this.setState({moodChecked: value} )}
              //onChange={this.onCheckedChange.bind(this)}
            
              //value = {this.state.moodChecked}
            //   onValueChange={this.switchOne}
            //   value={this.state.activeSwitch === 1}
            >
              {`Checked: ${this.state.moodChecked}`}
            </Toggle>
        
            <Toggle
              style={styles.toggleBlood}
              checked={isBleedingChecked}
              //onChange={(value) => this.setState({bleedingChecked: value})}
              onChange={this.onCheckedBloodChange.bind(this)}
              // value = {this.state.bleedingChecked}
             
            >
              {/* {`Checked: ${this.state.bleedingChecked}`} */}
            </Toggle>
            <Toggle
              style={styles.toggleDiet}
              checked={isDietChecked}
              onChange={this.onCheckedDietChange.bind(this)}
             
            >
            <Text style ={{top:10,right:20,backgroundColor:'#f089'}}>DIET </Text> 
              {/* {`Checked: ${this.state.dietChecked}`} */}
            </Toggle>
            <Toggle
              style={styles.toggleExercise}
              checked={isExerciseChecked}
              onChange={this.onCheckedExerciseChange.bind(this)}
            >
              {/* {`Checked: ${this.state.exerciseChecked}`} */}
            </Toggle>

            <Toggle
              style={styles.toggleMedication}
              checked={isMedicationChecked}
              onChange={this.onCheckedMedicineChange.bind(this)}
            >
              {/* {`Checked: ${this.state.medicationChecked}`} */}
            </Toggle>
            <Toggle
              style={styles.toggleDigestion}
              checked={isDigestionChecked}
              onChange={this.onCheckedDigestionChange.bind(this)}
            >
             {/* {`Checked: ${this.state.digestionChecked}`}  */}
            </Toggle>
            <Toggle
              style={styles.toggleSex}
              checked={isSexChecked}
              onChange={this.onCheckedSexChange.bind(this)}
            >
              {/* {`Checked: ${this.state.sexChecked}`} */}
            </Toggle>

            <Button
                            style={styles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                //this.getUserSettings();
                                this.updateUserSettings(); 
                                this.props.navigation.navigate('TrackCust');
                            }}
                           
                        > Save!
                            </Button>

            {/* <Toggle style ={styles.toggleMood} checked={this.state.checked} onChange={this.onCheckedChange.bind(this)}>
                                 {`Checked: ${this.state.checked}`}
                        </Toggle>

                        <Toggle checked={this.state.checked} onChange={this.onCheckedChange.bind(this)}>
                                 {`Checked: ${this.state.checked}`}
                        </Toggle>

                        <Toggle checked={this.state.checked} onChange={this.onCheckedChange.bind(this)}>
                                 {`Checked: ${this.state.checked}`}
                        </Toggle>
                        <Toggle checked={this.state.checked} onChange={this.onCheckedChange.bind(this)}>
                                 {`Checked: ${this.state.checked}`}
                        </Toggle>
                        <Toggle checked={this.state.checked} onChange={this.onCheckedChange.bind(this)}>
                                 {`Checked: ${this.state.checked}`}
                        </Toggle>
                        <Toggle checked={this.state.checked} onChange={this.onCheckedChange.bind(this)}>
                                 {`Checked: ${this.state.checked}`}
                        </Toggle>
                        <Toggle checked={this.state.checked} onChange={this.onCheckedChange.bind(this)}>
                                 {`Checked: ${this.state.checked}`}
                        </Toggle> */}
          </Card>
        </View>
        
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
    top: hp('72%'),
    left: wp('-25%'),
    backgroundColor: "#f09874",
    borderRadius: 25,
    width: wp('80%'),

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
    top: hp("4%"),
    left: 50,
    backgroundColor: "#fff",
  },

  toggleMood: {
    position: "absolute",
    top: hp("13%"),
    left: 50,
    backgroundColor: "#fff",
  },
  toggleBlood: {
    position: "absolute",
    top: hp("23%"),
    left: 50,
    backgroundColor: "#fff",
  },
  toggleDiet: {
    position: "absolute",
    top: hp("32%"),
    left: 50,
    backgroundColor: "#fff",
  },
  toggleExercise: {
    position: "absolute",
    top: hp("39%"),
    left: 50,
    backgroundColor: "#fff",
  },
  toggleMedication: {
    position: "absolute",
    top: hp("48%"),
    left: 50,
    backgroundColor: "#fff",
  },
  toggleDigestion: {
    position: "absolute",
    top: hp("56%"),
    left: 50,
    backgroundColor: "#fff",
  },
  toggleSex: {
    position: "absolute",
    top: hp("65%"),
    left: 50,
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
    width: wp("90%"),
    borderRadius: 20,
    height: hp("80%"),
    left: wp("5"),
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
    shadowRadius: 30,
    // resizeMode: "contain"
  },
});
