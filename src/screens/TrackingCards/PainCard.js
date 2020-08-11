import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TrackingStyles } from "../TrackingStyles";
import { Image, Dimensions, TouchableOpacity, Slider, View, StyleSheet } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import moment from "moment";
import TagSelector from 'react-native-tag-selector';
import { storeData, getData } from "../../helpers/StorageHelpers";
import { constants } from "../../resources/Constants";
import { initPainDetails } from "../../models/PainDetails";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../../helpers/DateHelpers";
import { mapListItemsToTags } from "../../helpers/TagHelpers"
const { width } = Dimensions.get('window');



export default class PainCard extends React.Component {
  

    constructor(props) {
        super(props);
        this.state = { painVisible: false };
    
        this.state = {
            selectedTags: [], //user selected pain locations
            painValue: 0,
            selectedPainTypes: [],  //user selected pain type value 
            minValue: 0,
            maxValue: 10,
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
        });
    }
    render() {
       
        let painLevel = 0
        
        let painLocations = this.state.painLocations || [];
        let painTypes = this.state.painTypes || [] ; // get all the possible value from the list item , if not then empty array .
    
        return (

            <Layout style={TrackingStyles.container}
            >
                <TouchableOpacity onPress={() => {
                    this.setPainVisible(true);
                }}>
                    <Image
                        style={TrackingStyles.painButton}
                        source={require('../../../assets/pain.png')}
                    />
                </TouchableOpacity>

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.painVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Pain </Text>

                        <TouchableOpacity onPress={() => {
                            this.setPainVisible(!this.state.painVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('2%'), fontSize: wp('4%'), fontWeight: '500' }}>How much pain did you have today? </Text>

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
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('13%'), fontSize: wp('4%'), fontWeight: '500' }}>Where is your pain located?</Text>

                        <View style={{ top: hp('14%'), left: wp('-2%') }}>

                            <TagSelector

                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}

                                maxHeight={70}
                                tags={painLocations}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />

                        </View>

                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('18%'), fontSize: wp('4%'), fontWeight: '500' }}>What type of pain was it?</Text>
                        <View style={{ top: hp('21%'), left: wp('-2%') }}>
                            <TagSelector
                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={hp('20%')}
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
                            }}> Track!
                            </Button>

                    </Card>
                </Modal>


            </Layout >


        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    textCon: {
        width: wp('80%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sliderStyle: {

        top: hp('5%'),
        flex: 1,
        width: wp('80%'),
        height: hp('20.81%'),
        padding: wp('3.5%'),
        backgroundColor: '#FFF'
    },
    colorGrey: {
        color: '#8A8A8E',
        top: hp('9%'),
        fontWeight: '500'
    },
    colorPeach: {
        color: '#f09874',
        top: hp('9%'),
        fontWeight: '500'

    }
});