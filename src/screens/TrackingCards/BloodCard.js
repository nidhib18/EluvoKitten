//Blood tracking card
import React, { Component } from 'react';
import { Image, Dimensions, TouchableOpacity, Slider } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";



const { width } = Dimensions.get('window');

export default class BloodCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bloodVisible: false };
    }
    setBloodVisible(visible) {
        this.setState({ bloodVisible: visible });
    }


    render() {

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setBloodVisible(true); }}>
                    <Image
                        style={TrackingStyles.bloodButton}
                        source={require('../../../assets/blood.png')}
                    />
                </TouchableOpacity>

                <Modal visible={this.state.bloodVisible}>
                    <Card disabled={true}
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Blood</Text>
                        <Slider
                            minValue={0}
                            maxValue={100}
                            minimumTrackTintColor={'#f09874'}
                            selectedMinimum={0}
                            selectedMaximum={100}
                            style={{ top: 80, flex: 1, height: 70, padding: 10, backgroundColor: '#FFF' }}
                            onChange={(data) => { console.log('normal slider data: ', data); }}
                        />
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setBloodVisible(!this.state.bloodVisible);
                            }} > Track!
                            </Button>
                    </Card>
                </Modal>
            </Layout>


        );
    };
}

