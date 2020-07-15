import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";



const { width } = Dimensions.get('window');

export default class SexCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sexVisible: false };
    }
    setSexVisible(visible) {
        this.setState({ sexVisible: visible });
    }


    render() {

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setSexVisible(true); }}>
                    <Image
                        style={TrackingStyles.sexButton}
                        source={require('../../../assets/sex.png')}
                    />
                </TouchableOpacity>

                <Modal visible={this.state.sexVisible}>
                    <Card disabled={true}
                        style={ TrackingStyles.cardStyle }>
                        <Text style={TrackingStyles.symptomText}>Sex </Text>
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
                                this.setSexVisible(!this.state.sexVisible);
                            }} > Track!
                            </Button>
                    </Card>
                    
                </Modal>
            </Layout>


        );
    };
}