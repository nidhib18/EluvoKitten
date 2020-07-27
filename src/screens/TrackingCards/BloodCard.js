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
            maxValue: 5
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

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.bloodVisible}>
                   
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Bleeding</Text>
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
                            //thumbImage={require('../../../assets/slider.png')}
                                                 
                            
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>No Bleeding </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.bloodValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>Heavy </Text>
                        </View>

                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('-4'), fontSize: wp('4%'), fontWeight:'500' }}>Did you have any bleeding today?</Text>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('16'), fontSize: wp('4%'), fontWeight:'500' }}>Did you use any of the following?</Text>
                        <View style={{ top: hp('20%'), left: wp('-2%') }}>
                            <TagSelector
                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
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
        top: hp('11%'),
        fontWeight:'500'

    },
    colorPeach: {
        color: '#f09874',
        top: hp('11%'),
        fontWeight:'500'

    }
});