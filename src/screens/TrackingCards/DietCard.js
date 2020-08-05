import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider, StyleSheet, View } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagSelector from 'react-native-tag-selector';
import moment from "moment";
import { storeData, getData } from "../../helpers/StorageHelpers";
import { constants } from "../../resources/Constants";
import { initPainDetails } from "../../models/PainDetails";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../../helpers/DateHelpers";
import { mapListItemsToTags } from "../../helpers/TagHelpers"
import { initDietDetails } from '../../models/DietDetails';

const { width } = Dimensions.get('window');

export default class DietCard extends React.Component {

    


    constructor(props) {
        super(props);
        this.state = { dietVisible: false };
        this.state = {
            selectedTags: [],
            dietValue: 0,
            minValue: 0,
            maxValue: 5,
            selectedFoodType: [], 
            foodTypes:[],
            userDetails: {},            
            dietDetails: initDietDetails (0,  moment().format('YYYY-MM-DD')) ,
            isDietDataAvailable: false, 
            currentDate:moment().format('YYYY-MM-DD')  
        };
        this.saveDietDetails = this.saveDietDetails.bind(this);
    }
    setDietVisible(visible) {
        this.setState({ dietVisible: visible });
    }


    getFoodTypes() {
        let url = constants.FOODTYPE_DEV_URL;
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
                    let foodTypes = [];//getting all possible paintype tags from the database  //{} is an object [] an array a value
                    foodTypes = mapListItemsToTags(responseData);
                    
                    this.setState({ foodTypes: foodTypes });
                })
                .catch((err) => console.log(err))
        );
    };

    getUserDiet = (route) => {
        let userId = this.state.userDetails.user_id;
        let currentDate = this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD');
        let url = constants.USERDIET_DEV_URL.replace("[userId]", userId).replace(
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
                            isDietDataAvailable: true,
                            dietDetails: responseData,
                            dietValue: responseData.diet.diet_level,
                            currentDate: currentDate
                        });
                    }
                    else {
                        console.log ("*No data*");
                        this.setState({
                            isDietDataAvailable: false,
                            dietDetails: initDietDetails(userId, currentDate),
                            dietValue: 0,
                            currentDate: currentDate
                        });
                    }
                })
                .catch((err) => console.log(err))
        );
        // console.log ("Chechi discussed",this.state.isDietDataAvailable);
    };

    saveDietDetails() {
      
        if (!this.state.isDietDataAvailable) {
            // Add the saved mood level
            let userId = this.state.userDetails.user_id;
            let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
            // Add pain locations
            let foodType = null ;
            
            
            // this.state.selectedTags.map(tag => {
            //     let location = {location_id: tag };
            //     locations.push(location);
            // });
            
            
            if (this.state.selectedFoodType.length > 0)
            foodType = this.state.selectedFoodType[0]; 
       

            let diet = { //sending to the database,if pian type value = 0 then don't send it to the database as it means the user didnt select any tags
                user_id: userId,
                diet_level: this.state.dietValue,
                food_type :foodType, 
                occurred_date: localToUtcDateTime(occurredDate),
                
            };
           
           
            let url = constants.ADDUSERDIET_DEV_URL;
            getData(constants.JWTKEY).then((jwt) =>
                fetch(url, {
                    //calling API
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + jwt, //Passing this will authorize the user
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(diet)
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
            this.getUserDiet();
            this.getFoodTypes();
            
        });
    }

    render() {

       
        let dietLevel = this.state.dietDetails && this.state.dietDetails.diet && this.state.dietDetails.diet.diet_level || 0;
        // console.log("***RENDER MOOD LEVEL***",Level)
        
        let foodTypes = this.state.foodTypes || [] ; // get all the possible value from the list item , if not then empty array .
        let selectedFoodTypes = [];
      
        if (this.state.dietDetails && this.state.dietDetails.diet && this.state.dietDetails.diet.food_type) {
            selectedFoodTypes = mapListItemsToTags([{list_item_id: this.state.dietDetails.diet.food_type,list_item_name:"Sugar"}]);
          

        }

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setDietVisible(true); }}>
                    <Image
                        style={TrackingStyles.dietButton}
                        source={require('../../../assets/diet.png')}
                    />
                </TouchableOpacity>

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.dietVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Diet </Text>
                        <TouchableOpacity onPress={() => {
                            this.setDietVisible(!this.state.dietVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('3%'), fontSize: wp('4%'), fontWeight:'500' }}>How well did you eat today? </Text>
                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={dietLevel}
                            onValueChange={val => this.setState({ dietValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>No Change </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.dietValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>Poor </Text>
                        </View>
                        
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('15%'), fontSize: wp('4%'),  fontWeight:'500' }}>What types of food did you consume today? </Text>
                        <View style={{ top: hp('16%'), left: wp('-2') }}>
                            <TagSelector

                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={foodTypes}
                                onChange={(selected) => this.setState({ selectedFoodType: selected })}
                            />
                        </View>

                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setDietVisible(!this.state.dietVisible);
                                this.saveDietDetails(); 
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
        top: hp('6%'),
        fontWeight:'500'

    },
    colorPeach: {
        color: '#f09874',
        top: hp('6%'),
        fontWeight:'500'

    }


});