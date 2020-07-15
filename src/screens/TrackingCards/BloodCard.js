//Blood tracking card
import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider, StyleSheet, View } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import TagSelector from 'react-native-tag-selector';
import { TrackingStyles } from "../TrackingStyles";



const { width } = Dimensions.get('window');

export default class BloodCard extends React.Component {
    bloodTags = [
        {
            id: 'Pad',
            name: 'Pad'
        },
        {
            id: 'Tampon',
            name: 'Tampon'
        },
        {
            id: 'MoonCup',
            name: 'Moon Cup'
        }
    ]
    constructor(props) {
        super(props);
        this.state = { bloodVisible: false };
        this.state = {
            selectedTags: [],
            bloodValue: 0,
            minValue: 0,
            maxValue: 10
        };
           
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
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Blood</Text>
                        <TouchableOpacity onPress={() => {
                            this.setBloodVisible(!this.state.bloodVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={this.state.value}
                            onValueChange={val => this.setState({ bloodValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>{this.state.minValue} </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.bloodValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>{this.state.maxValue} </Text>
                            </View>
                        
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('-4'), fontSize: wp('4%') }}>How much bleeding did you experience today?</Text>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('10'), fontSize: wp('4%') }}>What period products do you use?</Text>
                        <View style={{top: hp('15%'), left: wp('4%') }}>
                            <TagSelector

                                selectedTagStyle={TrackingStyles.tagStyle}
                                maxHeight={70}
                                tags={this.bloodTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>
                      
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

const styles = StyleSheet.create({

    sliderStyle: {

        top: hp('10%'),
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
        top: hp('11%'),

    },
    colorPeach: {
        color: '#f09874',
        top: hp('11%'),

    }
});