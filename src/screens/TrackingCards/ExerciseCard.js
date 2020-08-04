import React from 'react';
import { Image, Dimensions, TouchableOpacity, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Layout, Card, Modal, Text, Button, Input, Toggle } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";

import TimePicker from 'react-native-simple-time-picker';

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
    }
    setExerciseVisible(visible) {
        this.setState({ exerciseVisible: visible });
    }
    onCheckedChange = (isChecked) => {
        this.setState({ checked: isChecked });
    };


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
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('2%'), fontSize: wp('4%') }}>log your exercise:</Text>

                        <Input
                            style={{ borderColor: '#ffffff', borderRadius: 15, backgroundColor: 'rgba(240, 152, 116, 0.48)', top: hp('5%'), left: wp('-1%') }}
                            value={this.state.text}
                            color={'#000'}
                            onChangeText={(text) => this.setState({ text })}
                        />

                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('7%'), fontSize: wp('4%') }}>Duration:</Text>
                        <Text style={{ top: hp('25%'), color: '#000', left: wp('30%') }}>{selectedHours} hr: {selectedMinutes} min</Text>
                        <View style={{ top: hp('-5%') }}>
                            <TimePicker
                                
                                selectedHours={selectedHours}
                                //initial Hours value
                                selectedMinutes={selectedMinutes}
                                //initial Minutes value
                                onChange={(hours, minutes) => this.setState({
                                    selectedHours: hours, selectedMinutes: minutes
                                })}
                            />
                        </View>
                        <Input
                            style={{ borderColor: '#ffffff', borderRadius: 15, backgroundColor: 'rgba(240, 152, 116, 0.48)', width: wp('22'), top: hp('-8%'), left: wp('29%') }}
                            color={'#000'}

                        />
                        {/* <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 30, fontSize: 16 }}>Reminder?</Text>
                        
                        <Toggle
                            style={{ left: 180, top: 0 }}
                            checked={this.state.checked}
                            onChange={this.onCheckedChange}>
                            {`Checked: ${this.state.checked}`}
                        </Toggle> */}

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