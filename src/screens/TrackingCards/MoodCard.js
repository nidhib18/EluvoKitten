import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider, StyleSheet, View } from 'react-native';
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

    moodTags = [
        {
            id: 'Calm',
            name: 'Calm'
        },
        {
            id: 'Happy',
            name: 'Happy'
        },
        {
            id: 'Greatful',
            name: 'Greatful'
        },
        {
            id: 'Excited',
            name: 'Excited'
        },
        {
            id: 'Irritable',
            name: 'Irritable'
        },
        {
            id: 'Sad',
            name: 'Sad'
        },
        {
            id: ' Stressed',
            name: 'Stressed'
        },
        {
            id: 'Overwhelmed',
            name: 'Overwhelmed'
        },
        {
            id: 'Anxious',
            name: 'Anxious'
        },
        {
            id: 'Depressed',
            name: 'Depressed'
        },


    ]
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
            userDetails:{}, 
            moodDetails: initMoodDetails(0,  moment().format('YYYY-MM-DD')) ,
            isMoodDataAvailable: false,
            currentDate: moment().format('YYYY-MM-DD')// / this.props.route.params.CurrentDate    

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
                    let moodDescriptions = [];//getting all possible paintype tags from the database  //{} is an object [] an array a value
                    moodDescriptions = mapListItemsToTags(responseData);
                    
                    this.setState({ moodDescriptions: moodDescriptions });
                })
                .catch((err) => console.log(err))
        );
    };

    getUserMood = (route) => {
        let userId = this.state.userDetails.user_id;
        let currentDate = this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD');
        let url = constants.USERMOOD_DEV_URL.replace("[userId]", userId).replace(
            "[occurredDate]",
            localToUtcDateTime(currentDate)
        );
        console.log ("URL FOR GETMOOD",url);
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
                    //("MOOD CARD Get User Mood Response", responseData);
                    if (Object.keys(responseData).length) {
                        console.log ("*YES data*",responseData);
                        this.setState({
                            isMoodDataAvailable: true,
                            moodDetails: responseData,
                            moodValue: responseData.mood.mood_level,
                            currentDate: currentDate
                        });
                    }
                    else {
                        console.log ("*No data*");
                        this.setState({
                            isMoodDataAvailable: false,
                            moodDetails: initMoodDetails(userId, currentDate),
                            moodValue: 0,
                            currentDate: currentDate
                        });
                    }
                })
                .catch((err) => console.log(err))
        );
        console.log ("Chechi discussed",this.state.isMoodDataAvailable);
    };

    saveMoodDetails() {
      
        if (!this.state.isMoodDataAvailable) {
            // Add the saved mood level
            let userId = this.state.userDetails.user_id;
            let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
            // Add pain locations
            let moodDescription = null ;
            
            
            // this.state.selectedTags.map(tag => {
            //     let location = {location_id: tag };
            //     locations.push(location);
            // });
            
            
            if (this.state.selectedMoodDescription.length > 0)
                moodDescription = this.state.selectedMoodDescription[0]; 
       

            let mood = { //sending to the database,if pian type value = 0 then don't send it to the database as it means the user didnt select any tags
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
                        //console.log(response.json());
                        return response.json();
                    })
            );
        }
        else {
           
            alert("Update not implemented yet.");
        }
    }

    componentDidMount() //after Ui has been uploaded 
     {
        getData(constants.USERDETAILS).then((data) => {
            // Read back the user details from storage and convert to object
            this.state.userDetails = JSON.parse(data);
            this.setState({
                userDetails: JSON.parse(data),
            });
            this.getUserMood();
            this.getMoodDescriptions();
            
        });
    }



    render() {
        let moodLevel = this.state.moodDetails && this.state.moodDetails.mood && this.state.moodDetails.mood.mood_level || 0;
        console.log("***RENDER MOOD LEVEL***",moodLevel)
        
        let moodDescriptions = this.state.moodDescriptions || [] ; // get all the possible value from the list item , if not then empty array .
        let selectedMoodDescriptions = [];
      
        if (this.state.moodDetails && this.state.moodDetails.mood && this.state.moodDetails.mood.mood_description) {
            selectedMoodDescriptions = mapListItemsToTags([{list_item_id: this.state.moodDetails.mood.mood_description,list_item_name:"Depressed"}]);
        }
        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setMoodVisible(true); }}>
                    <Image
                        style={TrackingStyles.moodButton}
                        source={require('../../../assets/mood.png')}
                    />
                </TouchableOpacity>

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.moodVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Mood </Text>
                        <TouchableOpacity onPress={() => {
                            this.setMoodVisible(!this.state.moodVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('1%'), fontSize: wp('4%'), fontWeight:'500' }}>How do you feel today? </Text>
                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={this.state.value}
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
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('13%'), fontSize: wp('4%'),fontWeight:'500' }}>Add more detail: </Text>
                        <View style={{ top: hp('17%'), left: wp('-2%') }}>
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
                            }} > Track!
                            </Button>
                    </Card>
                </Modal>
            </Layout>


        );
    };
}

const styles = StyleSheet.create({

    sliderStyle: {

        top: hp('5%'),
        flex: 1,
        width: wp('80%'),
        height: hp('20.81%'),
        padding: wp('2.5%'),
        backgroundColor: '#FFF'

    },
    textCon: {
        width: wp('80%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    colorGrey: {
        color: '#8A8A8E',
        top: hp('8%'),
        fontWeight:'500'

    },
    colorPeach: {
        color: '#f09874',
        top: hp('8%'),
        fontWeight:'500'

    }
});