import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider, StyleSheet, View } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagSelector from 'react-native-tag-selector';

const { width } = Dimensions.get('window');

export default class MoodCard extends React.Component {

    moodTags = [
        {
            id: 'Calm',
            name: 'Calm'
        },
        {
            id: 'Happy',
            name: 'Happy'
        },
        {
            id: 'Greatful',
            name: 'Greatful'
        },
        {
            id: 'Excited',
            name: 'Excited'
        },
        {
            id: 'Irritable',
            name: 'Irritable'
        },
        {
            id: 'Sad',
            name: 'Sad'
        },
        {
            id: ' Stressed',
            name: 'Stressed'
        },
        {
            id: 'Overwhelmed',
            name: 'Overwhelmed'
        },
        {
            id: 'Anxious',
            name: 'Anxious'
        },
        {
            id: 'Depressed',
            name: 'Depressed'
        },


    ]
    constructor(props) {
        super(props);
        this.state = { moodVisible: false };
        this.state = {
            selectedTags: [],
            moodValue: 0,
            minValue: 0,
            maxValue: 5
        };
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

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.moodVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Mood </Text>
                        <TouchableOpacity onPress={() => {
                            this.setMoodVisible(!this.state.moodVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('1%'), fontSize: wp('4%'), fontWeight:'500' }}>How do you feel today? </Text>
                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={this.state.value}
                            onValueChange={val => this.setState({ moodValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>No Change</Text>
                            <Text style={styles.colorPeach}>
                                {this.state.moodValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>Worst Mood </Text>
                        </View>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('13%'), fontSize: wp('4%'),fontWeight:'500' }}>Add more detail </Text>
                        <View style={{ top: hp('17%'), left: wp('-2%') }}>
                            <TagSelector

                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={this.moodTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>
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
        color: '#8A8A8E',
        top: hp('8%'),
        fontWeight:'500'

    },
    colorPeach: {
        color: '#f09874',
        top: hp('8%'),
        fontWeight:'500'

    }
});