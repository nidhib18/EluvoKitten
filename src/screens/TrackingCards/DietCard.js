import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider, StyleSheet } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagGroup from 'react-native-tag-group';



const { width } = Dimensions.get('window');

export default class DietCard extends React.Component {
    
    constructor(props) {
        super(props);
       
        this.state = { dietVisible: false };
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
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('3%'), fontSize: wp('4%') }}>How do you feel today? </Text>

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
    
    button: {
        // width: wp('35%'),
        // backgroundColor: "rgba(240, 152, 116, 0.48)",
        // paddingVertical: hp('2%'),
        // paddingHorizontal: hp('1%'),
        borderRadius: 15,
        // marginVertical: wp('15%'),
        // left: wp('38%'),
        // top: hp('-7.2%'),
        // height:hp('6%')
    },
    // buttonText: {
    //     color: "#000",
    //     fontSize: wp('3.5%'),

    // },

   
});