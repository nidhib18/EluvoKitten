import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider, StyleSheet, View } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import TagSelector from 'react-native-tag-selector';
import { TrackingStyles } from "../TrackingStyles";
import moment from "moment";
import { storeData, getData } from "../../helpers/StorageHelpers";
import { constants } from "../../resources/Constants";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../../helpers/DateHelpers";
import { mapListItemsToTags } from "../../helpers/TagHelpers"
import { initBloodDetails } from '../../models/BloodDetails';



const { width } = Dimensions.get('window');

export default class BloodCard extends React.Component {
    bloodTags = [
        {
            id: 'Pad',
            name: 'Pad'
        },
        {
            id: 'Tampon',
            name: 'Tampon'
        },
        {
            id: 'MoonCup',
            name: 'Moon Cup'
        }
    ]
    constructor(props) {
        super(props);
        this.state = { bloodVisible: false };
        this.state = {
            selectedTags: [],
            bloodValue: 0,
            minValue: 0,
            maxValue: 5,
            selectedPeriodProduct: [],
            periodProducts: [], // moodDescriptions:[],
            userDetails: {},
            bloodDetails: initBloodDetails(0, moment().format('YYYY-MM-DD')),
            isBloodDataAvailable: false,
            currentDate: moment().format('YYYY-MM-DD')// / this.props.route.params.CurrentDate    
        };
        this.saveBloodDetails = this.saveBloodDetails.bind(this);
    }
    setBloodVisible(visible) {
        this.setState({ bloodVisible: visible });
    }
    getPeriodProducts() {
        let url = constants.PERIODPRODUCT_DEV_URL;
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
                    let periodProducts = [];//getting all possible paintype tags from the database  //{} is an object [] an array a value
                    periodProducts = mapListItemsToTags(responseData);

                    this.setState({ periodProducts: periodProducts });
                })
                .catch((err) => console.log(err))
        );
    };

    getUserBlood = (route) => {
        let userId = this.state.userDetails.user_id;
        let currentDate = this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD');
        let url = constants.USERBLOOD_DEV_URL.replace("[userId]", userId).replace(
            "[occurredDate]",
            localToUtcDateTime(currentDate)
        );

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
                            isBloodDataAvailable: true,
                            bloodDetails: responseData,
                            bloodValue: responseData.blood.bleeding_level,
                            currentDate: currentDate
                        });
                    }
                    else {
                        console.log ("*No data*");
                        this.setState({
                            isBloodDataAvailable: false,
                            bloodDetails: initBloodDetails(userId, currentDate),
                            bloodValue: 0,
                            currentDate: currentDate
                        });
                    }
                })
                .catch((err) => console.log(err))
        );
        console.log ("Chechi discussed",this.state.isBloodDataAvailable);
    };
    saveBloodDetails() {

        if (!this.state.isBloodDataAvailable) {
            // Add the saved mood level
            let userId = this.state.userDetails.user_id;
            let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
            // Add pain locations
            let periodProduct = null;


            // this.state.selectedTags.map(tag => {
            //     let location = {location_id: tag };
            //     locations.push(location);
            // });


            if (this.state.selectedPeriodProduct.length > 0)
                periodProduct = this.state.selectedPeriodProduct[0];


            let blood = { //sending to the database,if pian type value = 0 then don't send it to the database as it means the user didnt select any tags
                user_id: userId,
                bleeding_level: this.state.bloodValue,
                period_product: periodProduct,
                occurred_date: localToUtcDateTime(occurredDate),

            };


            let url = constants.ADDUSERBLOOD_DEV_URL;
            getData(constants.JWTKEY).then((jwt) =>
                fetch(url, {
                    //calling API
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + jwt, //Passing this will authorize the user
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(blood)
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
            this.getUserBlood();
            this.getPeriodProducts();
        });
    }

    render() {
        let bloodLevel = this.state.bloodDetails && this.state.bloodDetails.blood && this.state.bloodDetails.blood.bleeding_level || 0;


        let periodProducts = this.state.periodProducts || []; // get all the possible value from the list item , if not then empty array .
        let selectedPeriodProduct = [];

        if (this.state.bloodDetails && this.state.bloodDetails.blood && this.state.bloodDetails.blood.period_product) {
            selectedPeriodProduct = mapListItemsToTags([{ list_item_id: this.state.bloodDetails.blood.period_product, list_item_name: "Pad" }]);


        }

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setBloodVisible(true); }}>
                    <Image
                        style={TrackingStyles.bloodButton}
                        source={require('../../../assets/blood.png')}
                    />
                </TouchableOpacity>

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.bloodVisible}>

                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Bleeding</Text>
                        <TouchableOpacity onPress={() => {
                            this.setBloodVisible(!this.state.bloodVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={this.state.value}
                            onValueChange={val => this.setState({ bloodValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        //thumbImage={require('../../../assets/slider.png')}


                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>No Bleeding </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.bloodValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>Heavy </Text>
                        </View>

                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('-4'), fontSize: wp('4%'), fontWeight: '500' }}>Did you have any bleeding today?</Text>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('16'), fontSize: wp('4%'), fontWeight: '500' }}>Did you use any of the following?</Text>
                        <View style={{ top: hp('20%'), left: wp('-2%') }}>
                            <TagSelector
                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={periodProducts}
                                onChange={(selected) => this.setState({ selectedPeriodProduct: selected })}
                            />
                        </View>

                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setBloodVisible(!this.state.bloodVisible);
                                this.saveBloodDetails();   
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

        top: hp('10%'),
        flex: 1,
        width: wp('80%'),
        height: hp('20.81%'),
        padding: wp('5.5%'),
        backgroundColor: '#FFF'

    },
    textCon: {
        width: wp('80%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    colorGrey: {
        color: '#8A8A8E',
        top: hp('11%'),
        fontWeight: '500'

    },
    colorPeach: {
        color: '#f09874',
        top: hp('11%'),
        fontWeight: '500'

    }
});