import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";



const { width } = Dimensions.get('window');

export default class MoodCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { moodVisible: false };
    }
    setMoodVisible(visible) {
        this.setState({ moodVisible: visible });
    }


    render() {

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setMoodVisible(true); }}>
                    <Image
                        style={TrackingStyles.moodButton}
                        source={require('../../../assets/mood.png')}
                    />
                </TouchableOpacity>

                <Modal visible={this.state.moodVisible}>
                    <Card disabled={true}
                        style={ TrackingStyles.cardStyle }>
                        <Text style={TrackingStyles.symptomText}>Mood </Text>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top:hp('3%'), fontSize: wp('4%') }}>How do you feel today? </Text>
                        <Slider
                            minValue={0}
                            maxValue={100}
                            minimumTrackTintColor={'#f09874'}
                            selectedMinimum={0}
                            selectedMaximum={100}
                            style={TrackingStyles.slider}
                            onChange={(data) => { console.log('normal slider data: ', data); }}

                        />

                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setMoodVisible(!this.state.moodVisible);
                            }} > Track!
                            </Button>
                    </Card>
                </Modal>
            </Layout>


        );
    };
}