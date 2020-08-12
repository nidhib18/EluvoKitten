import React from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions, TouchableOpacity, View, } from "react-native";
import { Button, Divider, Layout, TopNavigation, Card, Text } from "@ui-kitten/components";
import { TrackingStyles } from "./TrackingStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
//import { Value } from 'react-native-reanimated';
import { HomeStyles } from "./HomeStyles";
import { FlatList } from "react-native-gesture-handler";
const extractKey = ({ id }) => id.toString()

export default class SettingScreen extends React.Component {
    // renderItem = ({ item, onPress }) => {
    //     return (

    //         <TouchableOpacity  >
    //             <View style={{
    //                 padding: 1,

    //             }}>

    //                 <Text style={{ left: wp('8.5%'), top: hp('-1.5%'), color: "#000", fontWeight: '500', fontSize: wp('4.5%'), }}>{item.customizeText} </Text>
    //                 <Text style={{ left: wp('8.5%'), top: hp('-0.8%'), color: "#8A8A8E", fontWeight: '500' }}>{item.customizeSubText} </Text>
    //                 <Text style={{ left: wp('8.5%'), top: hp('-1%'), color: "#DFDFE0", fontWeight: '500' }}>________________________________________________</Text>
    //                 <Image style={{ left: wp('80.5%'), top: hp('-8%'), height: 17, width: 17 }} source={item.image}></Image>


    //             </View>
    //         </TouchableOpacity>

    //     )
    // }
    render() {
        // const TrackingOptions = [
        //     {
        //         id: '1',
        //         customizeText: 'Customise trackers',
        //         customizeSubText: 'Edit which things you are tracking',
        //         image: require("../../assets/goto.png"),
        //         navigateTo: this.props.navigation.navigate('CustomiseTrack')

        //     },
        //     {
        //         id: '2',
        //         customizeText: 'Cycle settings',
        //         customizeSubText: 'Edit cycle Length and period reminders',
        //         image: require("../../assets/goto.png")

        //     },

        // ];
        return (
            <Layout style={styles.container}>
                <TopNavigation position="absolute"
                    top={0}
                    style={{ height: hp('14%'), width: width }} />
                <Text style={{ top: hp('5%'), left: wp('-30'), fontSize: wp('7.5%'), fontWeight: '700' }}>Settings</Text>
                <Button
                    style={{ left: wp('40%'), top: wp('0'), height: hp('5%') }}
                    
                    appearance="outline"
                    onPress={() => this.props.navigation.navigate("Home")}
                >
                    Done
                </Button>
                <Divider />
                <View style={{ width: wp('100'), height: 673, backgroundColor: '#f2f2f2', top: 350, alignContent: "center" }}>
                    <ScrollView contentContainerStyle={{
                        justifyContent: "space-around",
                        flex: 1,
                        flexGrow: 1,
                        flexDirection: "column",
                        marginTop: "-42%",
                        marginBottom: "-267%",
                        justifyContent: "center",
                        bottom: hp('-45%'),
                        top: hp('10'),
                        left: wp('4.5')
                    }}>

                        <Card style={styles.cardTrackingContainer}>
                            {/* <Text style={styles.medicationText}>Tracking</Text> */}

                            {/* <FlatList
                                style={{ paddingTop: 20, width: 400, top: 25, left: -37 }}
                                data={TrackingOptions}
                                renderItem={this.renderItem}
                                keyExtractor={extractKey}
                                scrollEnabled={false}
                            /> */}
                            <Text
                                style={{ top: 5, color: '#000', left: wp('-1%'), fontSize: wp('6%'), fontWeight: '600', height: 30, marginBottom: -10 }}
                            >
                                Tracking
                            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("TrackCust")} >
                            <Text style={{ left: wp('0%'), top: hp('3%'), color: "#000", fontWeight: '500', fontSize: wp('4.5%'), }}>Customise trackers</Text>
                            <Text style={{ left: wp('0%'), top: hp('3.5%'), color: "#8A8A8E", fontWeight: '500',fontSize: wp('4%') }}>Edit which things you are tracking </Text>
                            <Text style={{ left: wp('0%'), top: hp('3%'), color: "#DFDFE0", fontWeight: '300', }}>_________________________________________________</Text>
                            <Image style={{ left: wp('73.5%'), top: hp('-4.5%'), height: 17, width: 17 }} source={require("../../assets/goto.png")}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <Text style={{ left: wp('0%'), top: hp('2%'), color: "#000", fontWeight: '500', fontSize: wp('4.5%'), }}>Cycle settings</Text>
                            <Text style={{ left: wp('0%'), top: hp('2.5%'), color: "#8A8A8E", fontWeight: '500',fontSize: wp('4%') }}>Edit cycle Length and period reminders</Text>
                            <Text style={{ left: wp('0%'), top: hp('2%'), color: "#DFDFE0", fontWeight: '300' }}>_________________________________________________</Text>
                            <Image style={{ left: wp('73.5%'), top: hp('-3%'), height: 17, width: 17 }} source={require("../../assets/goto.png")}></Image>
                            </TouchableOpacity>
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
                    </ScrollView>
                    <Image
                        style={styles.tabContainers}
                        source={require("../../assets/bottomtab.png")}
                    />
                    <View style={{ top: hp('-50%'), left: wp('50') }}>
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

                    </View>
                </View>

            </Layout>

        );
    };
}
const styles = StyleSheet.create({

    container: {
        backgroundColor: "#f09874",
        alignItems: "center",
        backgroundColor: "#fbfbfb",
        height: hp('14'),
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
    },

    cardTrackingContainer: {


        flex: 1,
        position: "absolute",
        width: wp('90%'),
        borderRadius: 20,
        flexDirection: "row",
        height: hp('28%'),
        alignSelf: "flex-start",
        top: hp('16%'),
        alignItems: "center",

        backgroundColor: "#ffff",
    },

    cardNotificationContainer: {
        flex: 1,
        position: "absolute",
        width: wp('90%'),
        borderRadius: 20,
        height: hp('28%'),
        top: hp('46%'),
        alignItems: "center",
        backgroundColor: "#ffff",
    },

    cardDetailsContainer: {
        flex: 1,
        position: "absolute",
        width: wp('90%'),
        borderRadius: 20,
        height: hp('28%'),
        top: hp('76%'),
        alignItems: "center",
        backgroundColor: "#ffff",
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
    tabContainers: {
        flex: 1,
        position: "absolute",
        width: wp('150%'),
        height: hp('9%'),
        top: hp('77%'),
        left: wp('0%'),
        alignItems: "center",

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
