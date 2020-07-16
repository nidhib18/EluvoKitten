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
            maxValue: 10
        };
    }
    setMoodVisible(visible) {
        this.setState({ moodVisible: visible });
    }


    render() {

        return (
            <Layout style={TrackingStyles.container}>
               
                <Modal visible={this.state.moodVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Mood </Text>
                        
                  
                    </Card>
                </Modal>
            </Layout>


        );
    };
}
