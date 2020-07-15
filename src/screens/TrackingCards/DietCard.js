import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider, StyleSheet, View } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagSelector from 'react-native-tag-selector';



const { width } = Dimensions.get('window');

export default class DietCard extends React.Component {
    
    dietTags = [
        {
            id: 'No change in diet',
            name: 'No change in diet'
        },
        {
            id: 'Healthy',
            name: 'Healthy'
        },
        {
            id: 'Pretty good',
            name: 'Pretty good'
        },
        {
            id: 'Average',
            name: 'Average'
        },
        {
            id: 'Below Average',
            name: 'Below Average'
        },
        {
            id:  'Poor',
            name: 'Poor'
        },

    ];
    
    dietTypeTags = [
        {
            id: 'Dairy',
            name: 'Dairy'
        },
        {
            id: 'Gluten',
            name: 'Gluten'
        },
        {
            id: 'Sugar',
            name: 'Sugar'
        },
        {
            id: 'Vegetables',
            name: 'Vegetables'
        },
        {
            id: 'Fruit',
            name: 'Fruit'
        },
        {
            id:  'Carbs',
            name: 'Carbs'
        },
        {
            id:  'Fatty food',
            name: 'Fatty food'
        }

    ];


    constructor(props) {
        super(props);
        this.state = { dietVisible: false };
        this.state = {
            selectedTags: [],
            dietValue: 0,
            minValue: 0,
            maxValue: 5
        };
    }
    setDietVisible(visible) {
        this.setState({ dietVisible: visible });
    }


    render() {

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setDietVisible(true); }}>
                    <Image
                        style={TrackingStyles.dietButton}
                        source={require('../../../assets/diet.png')}
                    />
                </TouchableOpacity>

                <Modal visible={this.state.dietVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Diet </Text>
                        <TouchableOpacity onPress={() => {
                            this.setDietVisible(!this.state.dietVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('3%'), fontSize: wp('4%') }}>Rate your current diet </Text>
                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={this.state.value}
                            onValueChange={val => this.setState({ dietValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>{this.state.minValue} </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.dietValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>{this.state.maxValue} </Text>
                        </View>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('9%'), fontSize: wp('4%') }}>Which of the following best describes your diet? </Text>
                        <View style={{top: hp('13%'), left: wp('1.5%')}}>
                            <TagSelector

                                selectedTagStyle={TrackingStyles.tagStyle}
                                maxHeight={70}
                                tags={this.dietTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('15%'), fontSize: wp('4%') }}>What types of food did you consume today? </Text>
                        <View style={{top: hp('16%'), left: wp('1.5%')}}>
                            <TagSelector

                                selectedTagStyle={TrackingStyles.tagStyle}
                                maxHeight={70}
                                tags={this.dietTypeTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>

                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setDietVisible(!this.state.dietVisible);
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
        color: '#d3d3d3',
        top: hp('6%'),

    },
    colorPeach: {
        color: '#f09874',
        top: hp('6%'),

    }


});