import React from 'react';
import { Image, Dimensions, TouchableOpacity,TouchableWithoutFeedback, View, StyleSheet, Slider,TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Layout, Card, Modal, Text, Button, Input, Toggle } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagSelector from 'react-native-tag-selector';
import moment from "moment";
import { storeData, getData } from "../../helpers/StorageHelpers";
import { constants } from "../../resources/Constants";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../../helpers/DateHelpers";
import { mapListItemsToTags } from "../../helpers/TagHelpers"
import { initExerciseDetails } from '../../models/ExerciseDetails';


const { width } = Dimensions.get('window');

export default class ExerciseCard extends React.Component {

    
    state = {
        selectedHours: 0,
        //initial Hours
        selectedMinutes: 0,
        //initial Minutes
    }
    constructor(props) {
        super(props);
        this.state = { exerciseVisible: false };
        this.state = {
            selectedTags: [],
            exerciseValue: 0,
            minValue: 0,
            maxValue: 5,
            textInput: [],
            inputData: [],
            selectedExerciseType: [],
            exerciseTypes: [], // moodDescriptions:[],
            userDetails: {},
            userSettings:{},
            exerciseDetails: initExerciseDetails(0, moment().format('YYYY-MM-DD')),
           currentDate: this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD')     
        };
        this.saveExerciseDetails = this.saveExerciseDetails.bind(this);
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
    setExerciseVisible(visible) {
        this.setState({ exerciseVisible: visible });
    }
    getExerciseTypes() {
        let url = constants.EXERCISETYPE_DEV_URL;
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
                    let exerciseTypes = [];//getting all possible paintype tags from the database  //{} is an object [] an array a value
                    exerciseTypes = mapListItemsToTags(responseData);

                    this.setState({ exerciseTypes: exerciseTypes });
                })
                .catch((err) => console.log(err))
        );
    };

    async addTags(tagText) {
        let url = constants.ADDTAGS_DEV_URL;
        console.log("In add Period Products", tagText);
        var tag = {
            list_id: constants.EXERCISETYPE_LISTID,
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
                this.setState({  selectedExerciseType: selectedTagIds });
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

   
    saveExerciseDetails() {
    
            let userId = this.state.userDetails.user_id;
            let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
            let exerciseType = null;
            if (this.state.selectedExerciseType.length > 0)
                exerciseType = this.state.selectedExerciseType[0];


            let exercise = { //sending to the database,if  value = 0 then don't send it to the database as it means the user didnt select any tags
                user_id: userId,
                exercise_level: this.state.exerciseValue,
                exercise_type: exerciseType,
                occurred_date: localToUtcDateTime(occurredDate),

            };

            let url = constants.ADDUSEREXERCISE_DEV_URL;

            console.log("***ANYTHING***", url);
            getData(constants.JWTKEY).then((jwt) =>
                fetch(url, {
                    //calling API
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + jwt, //Passing this will authorize the user
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(exercise)
                })
                    .then((response) => {
                        console.log("Response!!***tuesday**", response);
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
            this.getExerciseTypes();

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
        let exerciseLevel =  0;
        let exerciseTypes = this.state.exerciseTypes || []; // get all the possible value from the list item , if not then empty array 
        const { selectedHours, selectedMinutes } = this.state;
        let isExerciseEnabled = (this.state.userSettings && this.state.userSettings.enable_exercise) || false;
        return (
            <Layout>
               {isExerciseEnabled ? (
                    <>
                <TouchableWithoutFeedback onPress={() => { this.setExerciseVisible(true); }}>
                    <Image
                        style={TrackingStyles.exerciseButton}
                        source={require('../../../assets/exercise.png')}
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
                }} visible={this.state.exerciseVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Exercise</Text>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setExerciseVisible(!this.state.exerciseVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableWithoutFeedback>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(20), fontSize: Responsive.font(15), fontWeight: '400' }}>Did you do any exercise today?</Text>
                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={exerciseLevel}
                            onValueChange={val => this.setState({ exerciseValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>No Exercise </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.exerciseValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>Heaps </Text>
                        </View>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: Responsive.height(75), fontSize: Responsive.font(15), fontWeight: '400' }}>Add more detail:  </Text>
                        <View style={{ top: Responsive.height(100), left: Responsive.width(-10), width: Responsive.width(300) }}>
                            <TagSelector
                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={exerciseTypes}
                                onChange={(selected) => this.setState({ selectedExerciseType: selected })}
                            />
                        </View>
                        <View style={{ top: Responsive.height(160), left: Responsive.width(-10), width: Responsive.width(350) }}>
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
                                this.setExerciseVisible(!this.state.exerciseVisible);
                                this.saveExerciseDetails();
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
        top: Responsive.height(52),
        fontSize:Responsive.font(13)

    },
    colorPeach: {
        color: '#f09874',
        fontWeight: '400',
        top: Responsive.height(52),
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