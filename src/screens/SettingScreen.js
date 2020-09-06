import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Card,
  Text,
} from "@ui-kitten/components";
import { TrackingStyles } from "./TrackingStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
//import { Value } from 'react-native-reanimated';
import { HomeStyles } from "./HomeStyles";
import { Auth } from "aws-amplify";
import { FlatList } from "react-native-gesture-handler";
import Responsive from "react-native-lightweight-responsive";
const extractKey = ({ id }) => id.toString();

export default class SettingScreen extends React.Component {
  handleSignOut = () => {
    Auth.signOut()
      .then(() => this.props.navigation.navigate("Welcome"))
      .catch((err) => console.log(err));
  };
  render() {
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
              marginBottom: Responsive.height(-1800),
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
                    source={require("../../assets/pain.png")}
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
                    source={require("../../assets/pain.png")}
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
                <View style={{left:Responsive.width}}>
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
                      top: Responsive.height(-10),                      color: "#DFDFE0",
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
                      justifyContent:'center'
                      
                    }}
                    source={require("../../assets/pain.png")}
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
            
          </ScrollView>

          {/* <Image
            style={styles.tabContainers}
            source={require("../../assets/bottomtab.png")}
          />
          <View style={{ top: hp("-50%"), left: wp("50") }}>
            <TouchableOpacity>
              <Image
                style={HomeStyles.careplan}
                source={require("../../assets/careplan.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Insights")}
            >
              <Image
                style={HomeStyles.insights}
                source={require("../../assets/insights.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={HomeStyles.learn}
                source={require("../../assets/learn.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings")}
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
          </View> */}
        </View>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
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
    paddingLeft:Responsive.width(10),
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

  // tabContainers: {
  //   flex: 1,
  //   position: "absolute",
  //   width: wp("150%"),
  //   height: hp("9%"),
  //   top: hp("77%"),
  //   left: wp("0%"),
  //   alignItems: "center",
  // },
});
