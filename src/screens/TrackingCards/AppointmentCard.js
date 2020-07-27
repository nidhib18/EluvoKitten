import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image, Dimensions, TouchableOpacity, Slider, StyleSheet, View } from 'react-native';
import { Layout, Card, Modal, Text, Button, Input } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import TagSelector from 'react-native-tag-selector';
import TimePicker from "react-native-24h-timepicker";

const { width } = Dimensions.get('window');

export default class AppointmentCard extends React.Component {


    constructor(props) {
        super(props);
        this.state = { appointmentVisible: false };
        this.state = {
            time: ""
        };
        
    }

    setAppointmentVisible(visible) {
        this.setState({ appointmentVisible: visible });
    }

    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        this.setState({ time: `${hour}:${minute}` });
        this.TimePicker.close();
    }


    render() {

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setAppointmentVisible(true); }}>
                    <Image
                        style={TrackingStyles.appointmentButton}
                        source={require('../../../assets/appointment.png')}
                    />
                </TouchableOpacity>

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.appointmentVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Appointment</Text>

                        <TouchableOpacity onPress={() => {
                            this.setAppointmentVisible(!this.state.appointmentVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />

                        </TouchableOpacity>
                        <Image
                            style={TrackingStyles.docContainer}
                            source={require('../../../assets/doc.png')}
                        />
                        <Input
                            style={{ borderColor: '#ffffff', borderRadius: 25, backgroundColor: 'rgba(240, 152, 116, 0.48)', top: hp('5%'), left: wp('15%'), width: wp('65') }}
                            value={this.state.text}
                            placeholder="Doctor's Name"
                            color={'#000'}
                            onChangeText={(text) => this.setState({ text })}
                        />
                        <Image
                            style={TrackingStyles.timeContainer}
                            source={require('../../../assets/appttime.png')}
                        />

                        <TouchableOpacity
                            onPress={() => this.TimePicker.open()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Time:</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>{this.state.time}</Text>
                        <TimePicker
                            ref={ref => {
                                this.TimePicker = ref;
                            }}
                            onCancel={() => this.onCancel()}
                            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                        />

                        <Image
                            style={TrackingStyles.clinicContainer}
                            source={require('../../../assets/clinic.png')}
                        />

                        <Input
                            style={{ borderColor: '#ffffff', borderRadius: 25, backgroundColor: 'rgba(240, 152, 116, 0.48)', top: hp('-10%'), left: wp('15%'), width: wp('65') }}
                            value={this.state.text}
                            placeholder="Clinic Name"
                            color={'#000'}
                            onChangeText={(text) => this.setState({ text })}
                        />

                        <Text style={{ color: '#B3B3B3', fontWeight: 'bold', textAlign: 'left', top: hp('-8%'), fontSize: wp('3.5%') }}>Notes:</Text>

                    </Card>
                </Modal>
            </Layout>


        );
    };
}
const styles = StyleSheet.create({
text: {
    fontSize: wp('4%'),
    marginTop:hp('3%'),
    color: '#FFF',
    left: wp('28%'),
    top: hp('-16.5%'),
    alignContent: 'center',
    
},

button: {
    width: wp('35%'),
    backgroundColor: "rgba(240, 152, 116, 0.48)",
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('1%'),
    borderRadius: 25,
    marginVertical: wp('15%'),
    left: wp('16%'),
    top: hp('-1%'),
    height:hp('5.7%')
},
buttonText: {
    top:hp('-0.3'),
   
    color: "#FFF",
    fontSize: wp('3.5%'),

},
});
