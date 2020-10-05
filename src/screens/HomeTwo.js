import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { Auth } from "aws-amplify";
import { HomeStyles } from "./HomeStyles";
import {
    Button,
    Divider,
    Layout,
    TopNavigation,
    Card,
    Text
  } from "@ui-kitten/components";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
const styles = StyleSheet.create({
  
  cardTrackingContainer: {
    flex: 1,
    position: "absolute",
    width: Responsive.width(325),
    borderRadius: 20,
    flexDirection: "row",
    height: Responsive.height(180),
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
    top:Responsive.height(-1370)
  },
  cardDetailsContainer: {
    flex: 1,
    paddingLeft: Responsive.width(10),
    position: "absolute",
    width: Responsive.width(325),
    borderRadius: 20,
    top: Responsive.height(330),
    width: Responsive.width(325),
    height: Responsive.height(200),
    bottom: Responsive.height(2000),
    backgroundColor: "#ffff",
    borderBottomColor: "#ffffff",
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#ffffff",
    backgroundColor: "#ffffff",
  },
  cardAppointmentsContainer: {
    flex: 1,
    top: Responsive.height(90),
    paddingLeft: Responsive.width(10),
    position: "absolute",
    width: Responsive.width(325),
    borderRadius: 20,
    width: Responsive.width(325),
    height: Responsive.height(200),
    bottom: Responsive.height(2000),
    backgroundColor: "#ffff",
    borderBottomColor: "#ffffff",
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#ffffff",
    backgroundColor: "#ffffff",
  },


});

export default class HomeTwo extends Component {
  handleSignOut = () => {Auth.signOut().then(() => this.props.navigation.navigate("Welcome")).catch((err) => console.log(err));  };
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
            left: Responsive.width(10),
            fontSize: Responsive.font(30),
            fontWeight: "700",
          }}
        >
          Settings
        </Text>
        <Button
          style={{
            left: Responsive.width(250),
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
              bottom: Responsive.height(100),
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
              <View style={{top:-20}}>
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
                    _________________________
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
                </View>
               
              </Card>
            </View>
           
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
                  _____________________
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
                  ________________________
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
                this.props.navigation.navigate('AddApp')
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
                __________________________
                  </Text>
                  <TouchableOpacity  onPress={() =>
                  this.props.navigation.navigate('Select')
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
     
      <Image
          style={HomeStyles.tabContainer}
          source={require("../../assets/bottomtab.png")}
        />
    
          <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate("Home")}>
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