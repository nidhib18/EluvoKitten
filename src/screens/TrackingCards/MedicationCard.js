import React from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Layout, Input, Card, Modal, Text, Button, Toggle } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import DropDownPicker from 'react-native-dropdown-picker';
import TimePicker from "react-native-24h-timepicker";
import TagSelector from 'react-native-tag-selector';
import { color } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default class MedicationCard extends React.Component {
    sideEffectTags = [
        {
            id: 'Dizziness',
            name: 'Dizziness'
        },
        {
            id: 'Sleepiness',
            name: 'Sleepiness'
        },
        {
            id: 'Headache',
            name: 'Headache'
        },

    ]
    constructor(props) {
        super(props);
        this.state = {
            medication: "",
            time: "",
            dosage: ""
        };
        this.state = { medicationVisible: false };
        this.state = { checked: false }
        this.state = { text: 'Useless Placeholder' };


    }
    setValue() {
        this.setState({ value: '' })
    }
    setMedicationVisible(visible) {
        this.setState({ medicationVisible: visible });
    }
    onCheckedChange = (isChecked) => {
        this.setState({ checked: isChecked });
    };
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
                <TouchableOpacity onPress={() => { this.setMedicationVisible(true); }}>
                    <Image
                        style={TrackingStyles.medicationButton}
                        source={require('../../../assets/medication.png')}
                    />
                </TouchableOpacity>

                <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.medicationVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Medication</Text>
                        <TouchableOpacity onPress={() => {
                            this.setMedicationVisible(!this.state.medicationVisible);
                        }}>
                            <Image
                                style={TrackingStyles.xContainer}
                                source={require('../../../assets/x.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('3%'), fontSize: wp('4%'), fontWeight: '500' }}>Did you take any medication today?</Text>

                        <Input
                            style={{ backgroundColor: '#FBFBFB', top: hp('5') }}
                            placeholder='E.g Panadol'
                            placeholderTextColor='#8A8A8E'
                            color='#8A8A8E'
                            //value={value}
                            onChangeText={
                                // Set this.state.email to the value in this Input box
                                (value) => this.setState({ medication: value })
                            }

                        />

                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('8%'), fontSize: wp('4%'), fontWeight: '500' }}>Time Taken</Text>
                        <Input
                            style={{ backgroundColor: '#FBFBFB', top: hp('10') }}
                            placeholder='9:00 am'
                            placeholderTextColor='#8A8A8E'
                            //value={value}
                            color='#8A8A8E'
                            onChangeText={
                                // Set this.state.email to the value in this Input box
                                (value) => this.setState({ time: value })
                            }
                        />

                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('12%'), fontSize: wp('4%'), fontWeight: '500' }}>Dosage</Text>
                        <Input
                            style={{ backgroundColor: '#FBFBFB', top: hp('14') }}
                            placeholder='2 tablets'
                            placeholderTextColor='#8A8A8E'
                            //value={value}
                            color='#8A8A8E'
                            onChangeText={
                                // Set this.state.email to the value in this Input box
                                (value) => this.setState({ dosage: value })
                            }
                        />


                        {/* <Text style={{ color: '#8A8A8E', textAlign: 'left', top: -30, fontSize: 16 }}>Would you like a Reminder?</Text>
                        <Toggle
                            style={{ left: 180, top: -55 }}
                            checked={this.state.checked}
                            onChange={this.onCheckedChange}>
                            {`Checked: ${this.state.checked}`}
                        </Toggle> */}
                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('17%'), fontSize: wp('4%'), fontWeight: '500' }}>Have you noticed any side effects?</Text>
                        <View style={{ top: hp('20%'), left: wp('-2%') }}>
                            <TagSelector

                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={this.sideEffectTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setMedicationVisible(!this.state.medicationVisible);
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
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: 100
    },



});