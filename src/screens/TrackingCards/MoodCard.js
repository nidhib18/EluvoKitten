import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity,TouchableWithoutFeedback, Slider, StyleSheet, View } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagSelector from 'react-native-tag-selector';
const { width } = Dimensions.get('window');
import moment from "moment";
import { storeData, getData } from "../../helpers/StorageHelpers";
import { constants } from "../../resources/Constants";
import { initPainDetails } from "../../models/PainDetails";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../../helpers/DateHelpers";
import { mapListItemsToTags } from "../../helpers/TagHelpers"
import { initMoodDetails } from '../../models/MoodDetails';
export default class MoodCard extends React.Component {

   
    constructor(props) {
        super(props);
        this.state = { moodVisible: false };
        this.state = {
            selectedTags: [],
            moodValue: 0,
            selectedMoodDescription: [], 
            moodDescriptions:[],
            minValue: 0,
            maxValue: 5,
            userSettings: {},
            userDetails:{}, 
            moodDetails: initMoodDetails(0,  moment().format('YYYY-MM-DD')) ,
            currentDate: this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD')     

        };
        this.saveMoodDetails = this.saveMoodDetails.bind(this);
    }
    setMoodVisible(visible) {
        this.setState({ moodVisible: visible });
    }
    getMoodDescriptions() {
        let url = constants.MOODDESCRIPTION_DEV_URL;
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
                    let moodDescriptions = [];//getting all possible tags from the database
                    moodDescriptions = mapListItemsToTags(responseData);
                    
                    this.setState({ moodDescriptions: moodDescriptions });
                })
                .catch((err) => console.log(err))
        );
    };
    getUserSettings ()
    { 
      let userId = this.state.userDetails.user_id;
      let url = constants.GETUSERSETTINGS_DEV_URL.replace("[userId]", userId);
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
    
  }
        )
      )
    }
    componentDidMount() //after Ui has been uploaded 
     {
        getData(constants.GETUSERSETTINGS_DEV_URL).then(( enable_mood) => {
            // Read back the user details from storage and convert to object
            this.state.userDetails = JSON.parse(enable_mood);
            this.setState({
                userDetails: JSON.parse(enable_mood),
            });
            this.getUserSettings();
        });
    }
    saveMoodDetails() {
    
            // Add the saved mood level
            let userId = this.state.userDetails.user_id;
            let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
            // Add pain locations
            let moodDescription = null;
            if (this.state.selectedMoodDescription.length > 0)
            
                moodDescription = this.state.selectedMoodDescription[0]; 
       

            let mood = { //sending to the database,if value = 0 then don't send it to the database as it means the user didnt select any tags
                user_id: userId,
                mood_level: this.state.moodValue,
                mood_description :moodDescription, 
                occurred_date: localToUtcDateTime(occurredDate),
                
            };
           
           
            let url = constants.ADDUSERMOOD_DEV_URL;
            getData(constants.JWTKEY).then((jwt) =>
                fetch(url, {
                    //calling API
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + jwt, //Passing this will authorize the user
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(mood)
                })
                    .then((response) => {
                        return response.json();
                    })
            );
    
    }

    componentDidMount() //after Ui has been uploaded 
     {
        getData(constants.USERDETAILS).then((data) => {
            // Read back the user details from storage and convert to object
            this.state.userDetails = JSON.parse(data);
            this.setState({
                userDetails: JSON.parse(data),
            });
            this.getMoodDescriptions();
            
        })
        .then((data) => {
            getData(constants.USERSETTINGS).then((data) => {
                // Read back the user settings from storage and convert to object
                console.log ("****USER SETTINGS in mood card****" ,data);
                this.setState({
                  userSettings: JSON.parse(data),
                });
            });
           });
    }

    getUserSettings ()
    { 
      let userId = this.state.userDetails.user_id;
      let url = constants.GETUSERSETTINGS_DEV_URL.replace("[userId]", userId);
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
    
  }
        )
      )
    }

    render() {
        let moodLevel =  0;
        let moodDescriptions = this.state.moodDescriptions || [] ; // get all the possible value from the list item , if not then empty array .
        let isMoodEnabled = (this.state.userSettings && this.state.userSettings.enable_mood) || false;
        return (
            <Layout>
              {isMoodEnabled ? (
                    <>
                <TouchableWithoutFeedback onPress={() => { this.setMoodVisible(true); }}>
                    <Image
                        style={TrackingStyles.moodButton}
                        source={require('../../../assets/mood.png')}
                    />
                </TouchableWithoutFeedback>
                </>
                )
                : (<>
                    <Image
                      style={TrackingStyles.moodButton}
                      source={require("../../../assets/moodbw.png")}
                    />
                </>)
                }

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.moodVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Mood </Text>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setMoodVisible(!this.state.moodVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableWithoutFeedback>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(15), fontSize: Responsive.font(15), fontWeight: '400' }}>How do you feel today? </Text>
                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={moodLevel}
                            onValueChange={val => this.setState({ moodValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>No Change</Text>
                            <Text style={styles.colorPeach}>
                                {this.state.moodValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>Worst Mood </Text>
                        </View>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(70), fontSize: Responsive.font(15), fontWeight: '400' }}>Add more detail: </Text>
                        <View style={{ top: Responsive.height(80), left: Responsive.width(-10)}}>
                            <TagSelector

                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={moodDescriptions}
                                onChange={(selected) => this.setState({ selectedMoodDescription: selected })}
                            />
                        </View>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setMoodVisible(!this.state.moodVisible);
                                this.saveMoodDetails();    
                            }} > Save!
                            </Button>
                    </Card>
                </Modal>
            </Layout>


        );
    };
}
const styles = StyleSheet.create({

    sliderStyle: {
        alignSelf: 'center',
        top: Responsive.height(28),
        flex: 1,
        width: Responsive.width(292),
        height: Responsive.height(52),
        padding: Responsive.width(17),
        backgroundColor: '#FFF'

    },
    textCon: {
        width: Responsive.width(292),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    colorGrey: {
        color: '#8A8A8E',
        fontWeight: '400',
        top: Responsive.height(52),
        fontSize:Responsive.font(13)
    },
    colorPeach: {
        color: '#f09874',
        fontWeight: '400',
        top: Responsive.height(52),
        fontSize:Responsive.font(13)

    },
});