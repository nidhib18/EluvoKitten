import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Slider, StyleSheet, View, TextInput, Keyboard } from 'react-native';
import { Layout, Card, Modal, Text, Button, ThemeProvider } from '@ui-kitten/components';
import TagSelector from 'react-native-tag-selector';
import { TrackingStyles } from "../TrackingStyles";
import moment from "moment";
import { storeData, getData } from "../../helpers/StorageHelpers";
import { constants } from "../../resources/Constants";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../../helpers/DateHelpers";
import { mapListItemsToTags } from "../../helpers/TagHelpers"
import { initBloodDetails } from '../../models/BloodDetails';
import { color } from 'react-native-reanimated';
import { input } from 'aws-amplify';
import { TouchableHighlight } from 'react-native-gesture-handler';



const { width } = Dimensions.get('window');

export default class BloodCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { bloodVisible: false };
        this.state = {
            selectedTags: [],
            bloodValue: 0,
            minValue: 0,
            maxValue: 5,
            textInput: [],
            inputData: [],
            pressed: false,
            editable: true,
            selectedPeriodProduct: [],
            periodProducts: [], // moodDescriptions:[],
            userDetails: {},
            userSettings:{},
            bloodDetails: initBloodDetails(0, moment().format('YYYY-MM-DD')),
            currentDate: this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD')
        };
        this.saveBloodDetails = this.saveBloodDetails.bind(this);
    }


    addTextInput = (index) => {
        let textInput = this.state.textInput;
        let inputData = this.state.inputData;

        textInput.push(


            <TouchableOpacity >
            
              
              
                <TextInput
                    // onChangeText={(text) => this.addValues(text, index) }
                    style={styles.InputStyle}
                    editable={(inputData.length === 0)}
                    value={this.state.inputData}
                    onChangeText={inputData => this.setState({inputData: inputData }) }
                // editable ={textInput => {
                //     if (this.state.textInput.length === 0) {
                //         this.state.editable
                //     }
                //     false
                // }
                // }
                //     onChangeText={inputData => {
                //     if (this.state.inputData.length === 0) {
                //         this.state.editable
                //     }
                //     else if (this.state.inputData.length !== 0) {
                //         !this.state.editable
                //         // this.state.inputData.length === 0
                //         // this.setState[({ inputData: inputData })]
                //     }
                // }
                // }
                

                />
            
            
            </TouchableOpacity>
        
        );
        
        this.setState({ textInput });

    }
removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({ textInput, inputData });
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

//Add Tags 
addPeriodProducts ()
{
    let url = constants.ADDTAGS_DEV_URL;
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
                return response.json();
            })
    );
}
addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
        dataArray.forEach(element => {
            if (element.index === index) {
                element.text = text;
                checkBool = true;
            }
        });
    }
    if (checkBool) {
        this.setState({
            inputData: dataArray
        });
    }
    else {
        dataArray.push({ 'text': text, 'index': index });
        this.setState({
            inputData: dataArray
        });
    }
}
getValues = () => {
    console.log('Data', this.state.inputData);
}
saveBloodDetails() {


    // Add the saved blood level
    let userId = this.state.userDetails.user_id;
    let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
    // Add period product 
    let periodProduct = null;

    if (this.state.selectedPeriodProduct.length > 0)
        periodProduct = this.state.selectedPeriodProduct[0];


    let blood = { //sending to the database,if blood type value = 0 then don't send it to the database as it means the user didnt select any tags
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
        this.getPeriodProducts();
    })
    .then((data) => {
        getData(constants.USERSETTINGS).then((data) => {
            // Read back the user settings from storage and convert to object
            console.log ("****USER SETTINGS in exercise card****" ,data);
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
    let bloodLevel = 0;
    let periodProducts = this.state.periodProducts || []; // get all the possible value from the list item , if not then empty array .
    let isBleedingEnabled = (this.state.userSettings && this.state.userSettings.enable_bleeding) || false;
    return (
        <Layout style={TrackingStyles.container}>
           {isBleedingEnabled ? (
                    <>
            <TouchableOpacity onPress={() => { this.setBloodVisible(true); }}>
                <Image
                    style={TrackingStyles.bloodButton}
                    source={require('../../../assets/blood.png')}
                />
            </TouchableOpacity>
            </>
                )
                : (<></>)
                }
            <Modal style={{
                shadowColor: '#c8c8c8',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 30,
            }} visible={this.state.bloodVisible}>

                <Card disabled={true}
                    style={TrackingStyles.cardStyle}>
                    <Text style={TrackingStyles.symptomText}>Bleeding</Text>
                    <TouchableWithoutFeedback onPress={() => {
                        this.setBloodVisible(!this.state.bloodVisible);
                    }}>
                        <Image
                            style={TrackingStyles.xContainer}
                            source={require('../../../assets/x.png')}
                        />
                    </TouchableWithoutFeedback>
                    <Slider
                        style={styles.sliderStyle}
                        step={1}
                        minimumValue={this.state.minValue}
                        maximumValue={this.state.maxValue}
                        value={bloodLevel}
                        onValueChange={val => this.setState({ bloodValue: val })}
                        maximumTrackTintColor='#d3d3d3'
                        minimumTrackTintColor='#f09874'


                    />
                    <View style={styles.textCon}>
                        <Text style={styles.colorGrey}>No Bleeding </Text>
                        <Text style={styles.colorPeach}>
                            {this.state.bloodValue + ''}
                        </Text>
                        <Text style={styles.colorGrey}>Heavy </Text>
                    </View>

                    <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(-40), fontSize: Responsive.font(15), fontWeight: '500' }}>Did you have any bleeding today?</Text>
                    <View style={{ width: Responsive.width(350) }} >
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(60), fontSize: Responsive.font(15), fontWeight: '500' }}>Did you use any of the following?</Text>
                    </View>
                    <View style={{ top: Responsive.height(70), left: Responsive.width(-10), width: Responsive.width(350) }}>
                        <TagSelector
                            tagStyle={TrackingStyles.tag}
                            selectedTagStyle={TrackingStyles.tagSelected}
                            maxHeight={70}

                            tags={periodProducts}
                            onChange={(selected) => this.setState({ selectedPeriodProduct: selected })}
                        />
                    </View>
                    <View style={{ top: Responsive.height(75), left: Responsive.width(-10), width: Responsive.width(350) }}>

                        <View style={{ flexDirection: 'row', flexGrow: '1', flexWrap: 'wrap', width: Responsive.width(300) }}>
                            {this.state.textInput.map((value) => {
                                return value
                            })}
                            <TouchableWithoutFeedback onPress={() => {
                                this.addTextInput(this.state.textInput.length)
                            }
                            }>
                                <Image
                                    style={{ marginLeft: 8, width: 38, height: 38 }}
                                    source={require('../../../assets/x.png')}
                                />
                            </TouchableWithoutFeedback>
                            {/* <Button title='Get Values' onPress={() => this.getValues()} /> */}
                        </View>
                        <View style={styles.row}>
                            <View style={{ margin: 10, top: Responsive.height(75) }}>
                                <Button onPress={() => this.removeTextInput()}>Remove</Button>
                            </View>
                        </View>
                    </View>

                    <Button
                        style={TrackingStyles.trackButton}
                        appearance='outline'
                        onPress={() => {
                            this.setBloodVisible(!this.state.bloodVisible);
                            this.saveBloodDetails();
                        }} > Save!
                            </Button>
                </Card>


            </Modal>
        </Layout>


    );
};
}

const styles = StyleSheet.create({

    InputStyle: {
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingBottom: Responsive.height(8),
        paddingTop: Responsive.height(8),
        paddingLeft: Responsive.width(16),
        paddingRight: Responsive.width(16),
        marginLeft: Responsive.width(8),
        marginBottom: Responsive.height(8),
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
        borderRadius: Responsive.height(14),
        height: Responsive.height(30),
        color: '#8A8A8E',
        fontWeight: '500',
        backgroundColor: '#ededef',
    },
    pressedStyle: {
        alignSelf: 'flex-start',
        paddingBottom: Responsive.height(8),
        paddingTop: Responsive.height(8),
        paddingLeft: Responsive.width(16),
        paddingRight: Responsive.width(16),
        marginLeft: Responsive.width(8),
        marginBottom: Responsive.height(8),
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
        borderRadius: Responsive.height(14),
        height: Responsive.height(30),
        color: 'white',
        fontWeight: '500',
        backgroundColor: '#f09874',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    sliderStyle: {
        alignSelf: 'center',
        top: Responsive.height(48),
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
        top: Responsive.height(62),
        fontSize: Responsive.font(13)

    },
    colorPeach: {
        color: '#f09874',
        fontWeight: '500',
        top: Responsive.height(62),
        fontSize: Responsive.font(13)

    },


});