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
    painTags = [
        {
            id: 'Stomach',
            name: 'Stomach'
        },
        {
            id: 'Abdominal',
            name: 'Abdominal'
        },
        {
            id: 'Gut',
            name: 'Gut'
        },
        {
            id: 'Left Side',
            name: 'Left Side'
        },
        {
            id: 'Right Side',
            name: 'Right Side'
        },
        {
            id: 'Back',
            name: 'Back'
        },

    ];

    painTypeTags = [
        {
            id: 'Sharp',
            name: 'Sharp'
        },
        {
            id: 'Dull',
            name: 'Dull'
        },
        {
            id: 'Throbbing',
            name: 'Throbbing'
        },

    ]

    constructor(props) {
        super(props);
        this.state = { painVisible: false };
        //const { currentDate } = this.props.route.params;
        //console.log("Navigation", this.props.route);
        this.state = {
            selectedTags: [],
            painValue: 0,
            minValue: 0,
            maxValue: 5,
            userDetails: {},
            painDetails: initPainDetails(0, moment().format('YYYY-MM-DD')),
            painLocations: [],
            isPainDataAvailable: false,
            currentDate: moment().format('YYYY-MM-DD')// / this.props.route.params.CurrentDate    
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
    getUserPain = (route) => {

        let userId = this.state.userDetails.user_id;
        let currentDate = this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD');

        let url = constants.USERPAIN_DEV_URL.replace("[userId]", userId).replace(
            "[occurredDate]",
            localToUtcDateTime(currentDate)
        );
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
                    // If responseData is not empty, then isPainDataAvailable = true
                    console.log("PAIN CARD Get User Pain Respnse", responseData);
                    if (Object.keys(responseData).length) {
                        this.setState({
                            isPainDataAvailable: true,
                            painDetails: responseData,
                            painValue: responseData.pain.pain_level,
                            currentDate: currentDate
                        });
                    }
                    else {
                        this.setState({
                            isPainDataAvailable: false,
                            painDetails: initPainDetails(userId, currentDate),
                            painValue: 0,
                            currentDate: currentDate
                        });
                    }
                })
                .catch((err) => console.log(err))
        );
    };
    savePainDetails() {
        if (!this.state.isPainDataAvailable) {
            // Add the saved pain level
            let userId = this.state.userDetails.user_id;
            let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
            // Add pain locations
            let locations = [];
            console.log("selected tags", this.state.selectedTags);
            this.state.selectedTags.map(tag => {
                let location = { location_id: tag };
                locations.push(location);
            });
            let pain = {
                user_id: userId,
                pain_level: this.state.painValue,
                occurred_date: localToUtcDateTime(occurredDate),
                locations: locations
            };
            console.log("Saving", pain);
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
                        console.log(response.json());
                        return response.json();
                    })

            );
        }
        else {
            alert("Update not implemented yet.");
        }
    }
    componentDidMount() {

        getData(constants.USERDETAILS).then((data) => {
            // Read back the user details from storage and convert to object
            this.state.userDetails = JSON.parse(data);
            this.setState({
                userDetails: JSON.parse(data),
            });
            this.getUserPain();
            this.getPainLocations();
        });
    }
    render() {
        let painLevel = this.state.painDetails && this.state.painDetails.pain && this.state.painDetails.pain.pain_level || 0;
        let painLocations = this.state.painLocations || [];
        let selectedPainLocations = [];
        if (this.state.painDetails && this.state.painDetails.pain && this.state.painDetails.pain.locations) {
            selectedPainLocations = mapListItemsToTags(this.state.painDetails.pain.locations);
            console.log(selectedPainLocations)
        }

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => {
                    this.setPainVisible(true);
                }}>
                    <Image
                        style={TrackingStyles.painButton}
                        source={require('../../../assets/pain.png')}
                    />
                </TouchableOpacity>

                <Modal visible={this.state.painVisible}>
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
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('2%'), fontSize: wp('4%') }}>How much pain did you have today? </Text>

                        <Slider
                            style={TrackingStyles.slider}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={painLevel}
                            onValueChange={val => this.setState({ painValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>{this.state.minValue} </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.painValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>{this.state.maxValue} </Text>
                        </View>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('11%'), fontSize: wp('4%') }}>Where is your pain located?</Text>
                        <View style={{ top: hp('10%'), left: wp('5%') }}>
                            <Text> Selected: {selectedPainLocations.map(tag => `${tag} `)} </Text>
                            <TagSelector
                                selectedTagStyle={TrackingStyles.tagStyle}
                                maxHeight={70}
                                tags={painLocations}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('12%'), fontSize: wp('4%') }}>What type of pain did you experience?</Text>
                        <View style={{ top: hp('14%'), left: wp('5%') }}>
                            <TagSelector

                                selectedTagStyle={TrackingStyles.tagStyle}
                                maxHeight={hp('20%')}
                                tags={this.painTypeTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
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


            </Layout>


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
    colorGrey: {
        color: '#d3d3d3',
        top: hp('9%')
    },
    colorPeach: {
        color: '#f09874',
        top: hp('9%')

    }
});