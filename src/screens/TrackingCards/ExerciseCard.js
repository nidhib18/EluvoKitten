import React from 'react';
import { Image, Dimensions, TouchableOpacity, View, StyleSheet, Slider } from 'react-native';
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

    exerciseTags = [
        {
            id: ' Yoga',
            name: ' Yoga'
        },
        {
            id: 'Cardio',
            name: 'Cardio'
        },
        {
            id: 'Walking',
            name: 'Walking'
        },
        {
            id: 'Biking',
            name: 'Biking'
        },
        {
            id: 'Swimming',
            name: 'Swimming'
        },
        {
            id: 'Running',
            name: 'Running'
        },
        {
            id: 'Standing',
            name: 'Standing'
        },
        {
            id: 'Weights',
            name: 'Weights'
        },


    ];
    state = {
        selectedHours: 0,
        //initial Hours
        selectedMinutes: 0,
        //initial Minutes
    }
    constructor(props) {
        super(props);
        this.state = { exerciseVisible: false };
        // this.state = {
        //     time: ""
        // };
        this.state = {
            selectedTags: [],
            exerciseValue: 0,
            minValue: 0,
            maxValue: 5,
            selectedExerciseType: [],
            exerciseTypes: [], // moodDescriptions:[],
            userDetails: {},
            exerciseDetails: initExerciseDetails(0, moment().format('YYYY-MM-DD')),
            isExerciseDataAvailable: false,
            currentDate: moment().format('YYYY-MM-DD')// / this.props.route.params.CurrentDate    
        };
        this.saveExerciseDetails = this.saveExerciseDetails.bind(this);
    }
    setExerciseVisible(visible) {
        this.setState({ exerciseVisible: visible });
    }
    // onCheckedChange = (isChecked) => {
    //     this.setState({ checked: isChecked });
    // };
    // onConfirm(hour, minute) {
    //     this.setState({ time: `${hour}:${minute}` });
    //     this.TimePicker.close();
    // }
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
    getUserExercise = (route) => {
        let userId = this.state.userDetails.user_id;
        let currentDate = this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD');
        let url = constants.USEREXERCISE_DEV_URL.replace("[userId]", userId).replace(
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

                        this.setState({
                            isExerciseDataAvailable: true,
                            exerciseDetails: responseData,
                            exerciseValue: responseData.exercise.exercise_level,
                            currentDate: currentDate
                        });
                    }
                    else {
                        this.setState({
                            isExerciseDataAvailable: false,
                            exerciseDetails: initExerciseDetails(userId, currentDate),
                            exerciseValue: 0,
                            currentDate: currentDate
                        });
                    }
                })
                .catch((err) => console.log(err))
        );
    };
    saveExerciseDetails() {
        console.log("***BLOOD SAVE**", this.state.isExerciseDataAvailable)
        if (!this.state.isExerciseDataAvailable) {
            // Add the saved mood level
            let userId = this.state.userDetails.user_id;
            let occurredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
            // Add pain locations
            let exerciseType = null;


            // this.state.selectedTags.map(tag => {
            //     let location = {location_id: tag };
            //     locations.push(location);
            // });


            if (this.state.selectedExerciseType.length > 0)
                exerciseType = this.state.selectedExerciseType[0];


            let exercise = { //sending to the database,if pain type value = 0 then don't send it to the database as it means the user didnt select any tags
                user_id: userId,
                exercise_level: this.state.exerciseValue,
                exercise_type: exerciseType,
                occurred_date: localToUtcDateTime(occurredDate),

            };
            // console.log("OBJECT!!", blood);

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
        else {

            alert("Update not implemented yet.");
        }
        // console.log("***ANYTHING available ***", this.state.isBloodDataAvailable);
    }
    componentDidMount() //after Ui has been uploaded 
    {
        getData(constants.USERDETAILS).then((data) => {
            // Read back the user details from storage and convert to object
            this.state.userDetails = JSON.parse(data);
            this.setState({
                userDetails: JSON.parse(data),
            });
            this.getUserExercise();
            this.getExerciseTypes();

        });
    }

    render() {
        let exerciseLevel = this.state.exerciseDetails && this.state.exerciseDetails.exercise && this.state.exerciseDetails.exercise.exercise_level || 0;
        // console.log("***RENDER BLOOD LEVEL***", bloodLevel)

        let exerciseTypes = this.state.exerciseTypes || []; // get all the possible value from the list item , if not then empty array .
        let selectedExerciseType = [];

        if (this.state.exerciseDetails && this.state.exerciseDetails.exercise && this.state.exerciseDetails.exercise.exercise_type) {
            selectedExerciseType = mapListItemsToTags([{ list_item_id: this.state.exerciseDetails.exercise.exercise_type, list_item_name: "Yoga" }]);


        }
        const { selectedHours, selectedMinutes } = this.state;
        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setExerciseVisible(true); }}>
                    <Image
                        style={TrackingStyles.exerciseButton}
                        source={require('../../../assets/exercise.png')}
                    />
                </TouchableOpacity>
                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.exerciseVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Exercise</Text>
                        <TouchableOpacity onPress={() => {
                            this.setExerciseVisible(!this.state.exerciseVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('2%'), fontSize: wp('4%'), fontWeight: '500' }}>Did you do any exercise today?</Text>
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
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('9%'), fontSize: wp('4%'), fontWeight: '500' }}>Add more detail:  </Text>
                        <View style={{ top: hp('12%'), left: wp('-2%') }}>
                            <TagSelector
                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={exerciseTypes}
                                onChange={(selected) => this.setState({ selectedExerciseType: selected })}
                            />
                        </View>


                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setExerciseVisible(!this.state.exerciseVisible);
                                this.saveExerciseDetails();
                            }}
                        > Track!
                        </Button>
                    </Card>
                </Modal>
            </Layout>


        );
    };
<<<<<<< HEAD
}
=======
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
        fontWeight: '500'

    },
    colorPeach: {
        color: '#f09874',
        top: hp('6%'),
        fontWeight: '500'

    },
    text: {
        fontSize: wp('3%'),
        marginTop: hp('3%'),
        color: '#000',
        left: wp('20%'),
        top: hp('-10.5%'),
        alignContent: 'center',

    },
    button: {
        width: wp('75%'),
        backgroundColor: "rgba(240, 152, 116, 0.48)",
        paddingVertical: hp('2%'),
        paddingHorizontal: hp('1%'),
        borderRadius: 15,
        marginVertical: wp('15%'),
        left: wp('2%'),
        top: hp('5%'),
        height: hp('5.7%')
    },
    buttonText: {
        color: "#000",
        fontSize: wp('3%'),
    },


});
>>>>>>> 27534208997c9cac15c22ebee3665c210b45e5cf
