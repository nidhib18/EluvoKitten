import React from 'react';
import { Image, Dimensions, TouchableOpacity, View, StyleSheet ,Slider} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Layout, Card, Modal, Text, Button, Input, Toggle } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagSelector from 'react-native-tag-selector';
import TimePicker from "react-native-24h-timepicker";

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
        this.state = {
            time: ""
        };
        this.state = {
            selectedTags: [],
            exerciseValue: 0,
            minValue: 0,
            maxValue: 5
        };
        
        
    }
    setExerciseVisible(visible) {
        this.setState({ exerciseVisible: visible });
    }
    onCheckedChange = (isChecked) => {
        this.setState({ checked: isChecked });
    };
    onConfirm(hour, minute) {
        this.setState({ time: `${hour}:${minute}` });
        this.TimePicker.close();
    }

    render() {
        const { selectedHours, selectedMinutes } = this.state;
        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setExerciseVisible(true); }}>
                    <Image
                        style={TrackingStyles.exerciseButton}
                        source={require('../../../assets/exercise.png')}
                    />
                </TouchableOpacity>
                <Modal visible={this.state.exerciseVisible}>
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
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('2%'), fontSize: wp('4%') }}>What amount of exercise did you do today?</Text>
                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={this.state.value}
                            onValueChange={val => this.setState({ exerciseValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>{this.state.minValue} </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.exerciseValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>{this.state.maxValue} </Text>
                        </View>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top:hp('9%'), fontSize: wp('4%') }}>Select any of the following if applicable </Text>
                        <View style={{top: hp('12%'), left: wp('1.5%')}}>
                            <TagSelector
                                selectedTagStyle={TrackingStyles.tagStyle}
                                maxHeight={70}
                                tags={this.exerciseTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.TimePicker.open()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Duration:</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>{this.state.time }</Text>
                        <TimePicker
                            ref={ref => {
                                this.TimePicker = ref;
                            }}
                            onCancel={() => this.onCancel()}
                            onConfirm={(hour, minute) => this.onConfirm(hour+'hr', minute+'min')}
                        />
                        
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => { this.setExerciseVisible(!this.state.exerciseVisible); }}> Track!
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
        color: '#d3d3d3',
        top: hp('6%'),

    },
    colorPeach: {
        color: '#f09874',
        top: hp('6%'),

    },
    text: {
        fontSize: wp('3%'),
        marginTop:hp('3%'),
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
        height:hp('5.7%')
    },
    buttonText: {
        color: "#000",
        fontSize: wp('3%'),
    },


});