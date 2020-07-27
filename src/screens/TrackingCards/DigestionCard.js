import React from 'react';
import { Image, Dimensions, TouchableOpacity, Slider, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Layout, Card, Modal, Text, Button, Input } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagSelector from 'react-native-tag-selector';

const { width } = Dimensions.get('window');

export default class DigestionCard extends React.Component {
    bloatTypeTags = [
        {
            id: 'Bloating',
            name: 'Bloating'
        },
        {
            id: 'Diarrhea',
            name: 'Diarrhea'
        },
        {
            id: 'Constipation',
            name: 'Constipation'
        },
        {
            id: 'Gassy',
            name: 'Gassy'
        }

    ]
    constructor(props) {
        super(props);
        this.state = { digestionVisible: false };
        this.state = {
            selectedTags: [],
            bloatValue: 0,
            minValue: 0,
            maxValue: 5
        };
    }
    setDigestionVisible(visible) {
        this.setState({ digestionVisible: visible });
    }


    render() {

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setDigestionVisible(true); }}>
                    <Image
                        style={TrackingStyles.digestionButton}
                        source={require('../../../assets/digestion.png')}
                    />
                </TouchableOpacity>

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.digestionVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Digestion</Text>
                        <TouchableOpacity onPress={() => {
                            this.setDigestionVisible(!this.state.digestionVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('3%'), fontSize: wp('4%'), fontWeight:'500' }}>How is your digestion today?</Text>


                        <Slider
                            style={styles.sliderStyle}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={this.state.value}
                            onValueChange={val => this.setState({ bloatValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>No Change </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.bloatValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>Poor </Text>
                        </View>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('15%'), fontSize: wp('4%'), fontWeight:'500' }}>Add more detail</Text>
                        <View style={{ top: hp('18%'), left: wp('-2%') }}>
                            <TagSelector

                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={this.bloatTypeTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setDigestionVisible(!this.state.digestionVisible);
                            }}
                        > Track!

                            </Button>
                    </Card>
                </Modal>
            </Layout>


        );
    };
}

const styles = StyleSheet.create({

    sliderStyle: {

        top: hp('7%'),
        alignSelf:'center',
        flex: 1,
        width: wp('75%'),
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
        top: hp('9%'),
        fontWeight:'500'

    },
    colorPeach: {
        color: '#f09874',
        top: hp('9%'),
        fontWeight:'500'

    }
});