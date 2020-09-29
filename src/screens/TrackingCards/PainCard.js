import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TrackingStyles } from "../TrackingStyles";
import { Image, Dimensions, TouchableOpacity,TouchableWithoutFeedback, Slider, View, StyleSheet } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import moment from "moment";
import TagSelector from 'react-native-tag-selector';
import { storeData, getData } from "../../helpers/StorageHelpers";
import { constants } from "../../resources/Constants";
import { initPainDetails } from "../../models/PainDetails";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../../helpers/DateHelpers";
import { mapListItemsToTags } from "../../helpers/TagHelpers"
import {saveUserSettings} from "../../helpers/SettingHelpers";
import Responsive from 'react-native-lightweight-responsive';
//const { width } = Dimensions.get('window');




export default class PainCard extends React.Component {
  

    constructor(props) {
        super(props);
        this.state = { painVisible: false };
    
        this.state = {
            selectedTags: [], //user selected pain locations
            painValue: 0,
            userSettings: {},
            selectedPainTypes: [],  //user selected pain type value 
            minValue: 0,
            maxValue: 5,
            userDetails: {},
            painDetails: initPainDetails(0, moment().format('YYYY-MM-DD')),
            painTypes: [],  //all possible pain types from list item
            painLocations: [], // all possible pain locations from list item
          
            currentDate: this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD')    
        };
        this.savePainDetails = this.savePainDetails.bind(this);

    }

    setPainVisible(visible) {
        this.setState({ painVisible: visible });
    }

    getPainLocations() {

        let url = constants.PAINLOCATIONS_DEV_URL;
        console.log("Url is", url);
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
                    let painLocations = [];
                    painLocations = mapListItemsToTags(responseData);
                    console.log("Locations", painLocations);
                    this.setState({ painLocations: painLocations });
                })
                .catch((err) => console.log(err))
        );
    };
    getPainTypes() {
        let url = constants.PAINTYPE_DEV_URL;
       
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
                    let painTypes = [];//getting all possible paintype tags from the database  //{} is an object [] an array a value
                    painTypes = mapListItemsToTags(responseData);
                    
                    this.setState({ painTypes: painTypes });
                })
                .catch((err) => console.log(err))
        );
    };
    
    savePainDetails() {
     
       
            // Add the saved pain level
            let userId = this.state.userDetails.user_id;
            let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
            // Add pain locations
            let locations = [];
            let painType = null;
      
            this.state.selectedTags.map(tag => {
                let location = {location_id: tag };
                locations.push(location);
            });
          
            if (this.state.selectedPainTypes.length > 0)
                painType = this.state.selectedPainTypes[0]; 
          

            let pain = { //sending to the database,if pain type value = 0 then don't send it to the database as it means the user didnt select any tags
                user_id: userId,
                pain_level: this.state.painValue,
                pain_type : painType, 
                occurred_date: localToUtcDateTime(occurredDate),
                locations: locations
            };
           
            let url = constants.ADDUSERPAIN_DEV_URL;
            getData(constants.JWTKEY).then((jwt) =>
                fetch(url, {
                    //calling API
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + jwt, //Passing this will authorize the user
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pain)
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
           this.getPainTypes();
           this.getPainLocations();
       })
       .then((data) => {
        getData(constants.USERSETTINGS).then((data) => {
            // Read back the user settings from storage and convert to object
            console.log ("****USER SETTINGS in pain card****" ,data);
            this.setState({
              userSettings: JSON.parse(data),
            });
        });
       });
   }
//    ****************ADDED HERE**************
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
    // componentWillMount() //after Ui has been uploaded 
    //  {
    //     getData(constants.GETUSERSETTINGS_DEV_URL).then((enable_pain) => {
    //         // Read back the user details from storage and convert to object
    //         this.state.userDetails = JSON.parse(enable_pain);
    //         this.setState({
    //             userDetails: JSON.parse(enable_pain),
    //         });
    //         this.getUserSettings();
    //     });
    // }
    render() {
       
        let painLevel = 0
        
        let painLocations = this.state.painLocations || [];
        let painTypes = this.state.painTypes || [] ; // get all the possible value from the list item , if not then empty array .
    
        let isPainEnabled = (this.state.userSettings && this.state.userSettings.enable_pain) || false;
        console.log("In render get user settings - Enable Pain", this.state.userSettings.enable_pain);
        console.log("Is Pain Enabled", isPainEnabled);
        return (

            <Layout>
                {isPainEnabled ? (
                    <>
                    <TouchableWithoutFeedback onPress={() => {
                        this.setPainVisible(true);
                    }}>
                        <Image
                            style={TrackingStyles.painButton}
                            source={require('../../../assets/pain.png')}
                        />
                    </TouchableWithoutFeedback>
                    </>
                )
                : (<></>)
                }


                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.painVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Pain </Text>

                        <TouchableWithoutFeedback onPress={() => {
                            this.setPainVisible(!this.state.painVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableWithoutFeedback>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(15), fontSize: Responsive.font(15), fontWeight: '500' }}>How much pain did you have today? </Text>

                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={painLevel}
                            onValueChange={val => this.setState({ painValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>No Pain </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.painValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>The Worst Pain </Text>
                        </View>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(75), fontSize: Responsive.font(15), fontWeight: '500' }}>Where is your pain located?</Text>

                        <View style={{top: Responsive.height(90), left: Responsive.width(-5) }}>


                            <TagSelector

                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}

                                maxHeight={70}
                                tags={painLocations}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />

                        </View>

                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(145), fontSize: Responsive.font(15), fontWeight: '400' }}>What type of pain was it?</Text>
                        <View style={{ top: Responsive.height(150), left: Responsive.width(-5), width:Responsive.width(350) }}>
                        <TagSelector
                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={painTypes} //source
                                onChange={(selected) => this.setState({ selectedPainTypes: selected })}
                            />
                        </View>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'

                            onPress={() => {
                                this.setPainVisible(!this.state.painVisible);
                                this.savePainDetails();
                            }}> Save!
                            </Button>

                    </Card>
                </Modal>


            </Layout >


        );
    };
}

const styles = StyleSheet.create({
    sliderStyle: {
        alignSelf: 'center',
        top: Responsive.height(38),
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
        fontWeight: '500',
        top: Responsive.height(52),
        fontSize:Responsive.font(13)
    },
    colorPeach: {
        color: '#f09874',
        fontWeight: '500',
        top: Responsive.height(52),
        fontSize:Responsive.font(13)

    },
}
);