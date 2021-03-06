import React from 'react';
import { Image, Dimensions, TouchableOpacity,TouchableWithoutFeedback, Slider, View, StyleSheet,TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Layout, Card, Modal, Text, Button, Input } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagSelector from 'react-native-tag-selector';
import moment from "moment";
import { storeData, getData } from "../../helpers/StorageHelpers";
import { constants } from "../../resources/Constants";
import { initPainDetails } from "../../models/PainDetails";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../../helpers/DateHelpers";
import { mapListItemsToTags } from "../../helpers/TagHelpers"
import { initDigestionDetails } from '../../models/DigestionDetails';
const { width } = Dimensions.get('window');

export default class DigestionCard extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = { digestionVisible: false };
        this.state = {
            selectedTags: [],
            bloatValue: 0,
            minValue: 0,
            maxValue: 5,
            textInput: [],
            inputData: [],
            selectedBowelSymptom: [],
            bowelSymptoms: [],
            userDetails: {},
            userSettings:{},
            digestionDetails: initDigestionDetails(0, moment().format('YYYY-MM-DD')),
            currentDate: this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD')    
        };
        this.saveDigestionDetails = this.saveDigestionDetails.bind(this);
    }

    addTextInput = (index) => {
        let textInput = this.state.textInput;
        let inputData = this.state.inputData;

        textInput.push(

            <TouchableOpacity>
               <TextInput
                    onEndEditing={(e) => 
                    {
                        this.addValues(e.nativeEvent.text, index)
                    }}
                    style={styles.InputStyle}
                    //editable={(inputData.length === 0)}
                    value={this.state.inputData}
                   // onChangeText={inputData => this.setState({ inputData: inputData })}
               

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
    setDigestionVisible(visible) {
        this.setState({ digestionVisible: visible });
    }
    getBowelSymptoms() {
        let url = constants.BOWELSYMPTOM_DEV_URL;
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
                    let bowelSymptoms = [];//getting all possible  tags from the database
                    bowelSymptoms = mapListItemsToTags(responseData);
                    
                    this.setState({ bowelSymptoms: bowelSymptoms });
                })
                .catch((err) => console.log(err))
        );
    };

    async addTags(tagText) {
        let url = constants.ADDTAGS_DEV_URL;
        console.log("In add Period Products", tagText);
        var tag = {
            list_id: constants.BOWELSYMPTOMS,
            user_id: this.state.userDetails.user_id,
            list_item_name: tagText
        };
        console.log("Tag to be saved", tag);
        let newTagId = 0;
        let selectedTagIds = [];
        await getData(constants.JWTKEY).then((jwt) =>
            fetch(url, {
                //calling API
                method: "POST",
                headers: {
                    Authorization: "Bearer " + jwt, //Passing this will authorize the user
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tag)
            })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                newTagId = responseData.list_item_id;
                console.log("New list item", newTagId);
                selectedTagIds.push(newTagId);
                this.setState({  selectedBowelSymptom: selectedTagIds });
            })
        );
    }
    addValues = async (text, index) => {
         // Add the tag to list item
        await this.addTags(text);
    }

    getValues = () => {
        console.log('Data', this.state.inputData);
    }

    saveDigestionDetails() {
      
            // Add the saved blood level
            let userId = this.state.userDetails.user_id;
            let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
            // Add pain locations
            let bowelSymptom = null ;
            
            
            if (this.state.selectedBowelSymptom.length > 0)
            bowelSymptom = this.state.selectedBowelSymptom[0]; 
       

            let digestion = { //sending to the database,if  value = 0 then don't send it to the database as it means the user didnt select any tags
                user_id: userId,
                digestion_level: this.state.bloatValue,
                bowel_symptom :bowelSymptom, 
                occurred_date:localToUtcDateTime(occurredDate),
                
            };
           
           
            let url = constants. ADDUSERDIGESTION_DEV_URL;
            getData(constants.JWTKEY).then((jwt) =>
                fetch(url, {
                    //calling API
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + jwt, //Passing this will authorize the user
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(digestion)
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
            this.getBowelSymptoms();
            
        })  .then((data) => {
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
        let digestionLevel = 0;
        let bowelSymptoms = this.state.bowelSymptoms || []; // get all the possible value from the list item , if not then empty array .
        let isDigestionEnabled = (this.state.userSettings && this.state.userSettings.enable_digestion) || false;
        return (
            <Layout>
               {isDigestionEnabled ? (
                    <>
                <TouchableWithoutFeedback onPress={() => { this.setDigestionVisible(true); }}>
                    <Image
                        style={TrackingStyles.digestionButton}
                        source={require('../../../assets/digestion.png')}
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
                }} visible={this.state.digestionVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Digestion</Text>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setDigestionVisible(!this.state.digestionVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                       </TouchableWithoutFeedback>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(15), fontSize: Responsive.font(15), fontWeight: '400' }}>How is your digestion today?</Text>



                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={digestionLevel}
                            onValueChange={val => this.setState({ bloatValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>No Change </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.bloatValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>Poor </Text>
                        </View>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(80), fontSize: Responsive.font(15), fontWeight: '400' }}>Add more detail:</Text>
                        <View style={{ top: Responsive.height(90), left: Responsive.width(-10), width:Responsive.width(330)}}>
                            <TagSelector

                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={bowelSymptoms}
                                onChange={(selected) => this.setState({ selectedBowelSymptom: selected })}
                            />
                        </View>
                        <View style={{ top: Responsive.height(110), left: Responsive.width(-10), width: Responsive.width(350) }}>

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
            source={require('../../../assets/plusButton.png')}
        />
    </TouchableWithoutFeedback>
    {/* <Button title='Get Values' onPress={() => this.getValues()} /> */}
</View>
<View style={styles.row}>
    <View style={{ margin: 10, top: Responsive.height(75) }}>
        {/* <Button onPress={() => this.removeTextInput()}>Remove</Button> */}
    </View>
</View>
</View>

                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setDigestionVisible(!this.state.digestionVisible);
                                this.saveDigestionDetails();
                            }}
                        > Save!

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
        fontWeight: '400',
        top: Responsive.height(62),
        fontSize:Responsive.font(13)


    },
    colorPeach: {
        color: '#f09874',
        fontWeight: '400',
        top: Responsive.height(62),
        fontSize:Responsive.font(13)

    },
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
        color: 'white',
        fontWeight: '500',
        backgroundColor: '#f09874',
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
});