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

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.sexVisible}>
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
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top:hp('3%'), fontSize: wp('4%'),fontWeight:'500' }}>Did you do any sexual activities today </Text>
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
                            <Text style={styles.colorGrey}>Didn't Have Sex </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.dietValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>Had Sex </Text>
                        </View>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top:hp('15%'), fontSize: wp('4%'), fontWeight:'500' }}>Select any of the following if applicable </Text>
                        <View style={{top: hp('18%'), left: wp('-2%')}}>
                            <TagSelector
                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
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
        padding: wp('5.5%'),
        backgroundColor: '#FFF'

    },
    textCon: {
        width: wp('80%'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    colorGrey: {
        color: '#8A8A8E',
        top: hp('6%'),
        fontWeight:'500'

    },
    colorPeach: {
        color: '#f09874',
        top: hp('6%'),
        fontWeight:'500'

    }


});