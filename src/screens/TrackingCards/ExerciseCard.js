import React from 'react';
import { Image, Dimensions, TouchableOpacity, View } from 'react-native';
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
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 40, fontSize: 16 }}>log your exercise:</Text>

                        <Input
                            style={{ borderColor: '#ffffff', borderRadius: 15, backgroundColor: 'rgba(240, 152, 116, 0.48)', top: 70, left: -3 }}
                            value={this.state.text}
                            color={'#000'}
                            onChangeText={(text) => this.setState({ text })}
                        />

                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 90, fontSize: 16 }}>Duration:</Text>
                        <Text style={{ top: 250, color: '#000', left: 125 }}>{selectedHours} hr: {selectedMinutes} min</Text>
                        <View>
                            <TimePicker
                                style={{ top: 150 }}
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
                            style={{ borderColor: '#ffffff', borderRadius: 15, backgroundColor: 'rgba(240, 152, 116, 0.48)', top: 5, left: 110, width: 100 }}
                            color={'#000'}

                        />
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 30, fontSize: 16 }}>Reminder?</Text>
                        
                        <Toggle
                            style={{ left: 180, top: 0 }}
                            checked={this.state.checked}
                            onChange={this.onCheckedChange}>
                            {`Checked: ${this.state.checked}`}
                        </Toggle>

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
