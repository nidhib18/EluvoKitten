import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider, StyleSheet, View } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagSelector from 'react-native-tag-selector';


const { width } = Dimensions.get('window');

export default class SexCard extends React.Component {
   
    sexTags = [
        {
            id: ' Orgasm',
            name: ' Orgasm'
        },
        {
            id: 'Masturbation',
            name: 'Masturbation'
        },
        {
            id: 'Pain',
            name: 'Pain'
        },
        {
            id: 'Protection used',
            name: 'Protection used'
        },
        {
            id: 'No protection',
            name: 'No protection'
        },
        

    ];
    constructor(props) {
        super(props);
        this.state = { sexVisible: false };
        this.state = {
            selectedTags: [],
            dietValue: 0,
            minValue: 0,
            maxValue: 5
        };
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
                        <TouchableOpacity onPress={() => {
                            this.setSexVisible(!this.state.sexVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top:hp('3%'), fontSize: wp('4%') }}>Did you do any sexual activities today </Text>
                        <Slider
                            style={styles.sliderStyle}
                            step={5}
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
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top:hp('9%'), fontSize: wp('4%') }}>Select any of the following if applicable </Text>
                        <View style={{top: hp('14%'), left: wp('1.5%')}}>
                            <TagSelector
                                selectedTagStyle={TrackingStyles.tagStyle}
                                maxHeight={70}
                                tags={this.sexTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>

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