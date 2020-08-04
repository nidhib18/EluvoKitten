import React from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions } from "react-native";
import { Button, Divider, Layout, TopNavigation, Card, Text } from "@ui-kitten/components";
import { TrackingStyles } from "./TrackingStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

export const SettingScreen = ({ navigation }) => {
    return (
        <Layout style={TrackingStyles.container}>
            <TopNavigation position="absolute"
                top={0}
                style={{ height: hp('9%'), width: width }} />
            <Button
                style={{ left: wp('40%'), top: wp('5.5%'), height: hp('5%') }}
                s
                appearance="outline"
                onPress={() => navigation.navigate("Home")}
            >
                Done
      </Button>
            <Divider />
            
                <Card style={styles.cardTrackingContainer}>
                    <Text style={styles.medicationText}>Tracking</Text>
                    <Text
                        style={{
                            fontSize: wp('6%'),
                            left: wp('-30%'),
                            position: "absolute",
                            top: hp('2%'),
                            color: "#000",
                            fontWeight: 'bold'
                        }}
                    >
                        Tracking
              </Text>
                </Card>

                <Card style={styles.cardNotificationContainer}>
                    <Text style={styles.medicationText}>Tracking</Text>
                    <Text
                        style={{
                            fontSize: wp('6%'),
                            left: wp('-30%'),
                            position: "absolute",
                            top: hp('2%'),
                            color: "#000",
                            fontWeight: 'bold'
                        }}
                    >
                        Notifications
              </Text>
                </Card>

                <Card style={styles.cardDetailsContainer}>
                    <Text style={styles.medicationText}>Tracking</Text>
                    <Text
                        style={{
                            fontSize: wp('6%'),
                            left: wp('-30%'),
                            position: "absolute",
                            top: hp('2%'),
                            color: "#000",
                            fontWeight: 'bold'
                        }}
                    >
                        Personal Details
              </Text>
                </Card>
           

        </Layout>
    );
};

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
        height: hp('30%'),
        top: hp('58%'),
        alignItems: "center",
        backgroundColor: "#ffff",
        // resizeMode: "contain"
    },

    cardTrackingContainer: {
        flex: 1,
        position: "absolute",
        width: wp('95%'),
        borderRadius: 20,
        height: hp('32%'),
        top: hp('10%'),
        alignItems: "center",
        backgroundColor: "#ffff",
        // resizeMode: "contain"
    },

    cardNotificationContainer: {
        flex: 1,
        position: "absolute",
        width: wp('95%'),
        borderRadius: 20,
        height: hp('32%'),
        top: hp('43%'),
        alignItems: "center",
        backgroundColor: "#ffff",
        // resizeMode: "contain"
    },

    cardDetailsContainer: {
        flex: 1,
        position: "absolute",
        width: wp('95%'),
        borderRadius: 20,
        height: hp('32%'),
        top: hp('76%'),
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
        left: wp('-28%'),
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
        left: wp('-8%'),
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
