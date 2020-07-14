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

    ]
    constructor(props) {
        super(props);
        this.state = { digestionVisible: false };
        this.state = {
            selectedTags: [],
            bloatValue: 0,
            minValue: 0,
            maxValue: 10
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

                <Modal visible={this.state.digestionVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Digestion</Text>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('3%'), fontSize: wp('4%') }}>What did you eat today?</Text>
                        <Input
                            style={{ borderColor: '#ffffff', borderRadius: 15, backgroundColor: 'rgba(240, 152, 116, 0.48)', top: hp('5%'), left: wp('0.5%') }}
                            value={this.state.text}
                            color={'#000'}
                            onChangeText={(text) => this.setState({ text })}
                        />
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('7%'), fontSize: wp('4%') }}>Do you feel bloated?</Text>
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
                            <Text style={styles.colorGrey}>{this.state.minValue} </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.bloatValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>{this.state.maxValue} </Text>
                        </View>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('12%'), fontSize: wp('4%') }}>Select any of the following if applicable</Text>
                        <View style={{ top: hp('15%'), left: wp('5%')}}>
                            <TagSelector

                                selectedTagStyle={TrackingStyles.tagStyle}
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

        top: hp('9%'),
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