import React from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Layout, Input, Card, Modal, Text, Button, Toggle } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import DropDownPicker from 'react-native-dropdown-picker';
import TimePicker from "react-native-24h-timepicker";
import TagSelector from 'react-native-tag-selector';

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
        this.state = { medicationVisible: false };
        this.state = { checked: false }
        this.state = { text: 'Useless Placeholder' };
        this.state = {
            quantity: '1',

        };
        this.state = {
            time: ""
        };
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

                <Modal visible={this.state.medicationVisible}>
                    <Card disabled={true}
                        style={TrackingStyles.cardStyle}>
                        <Text style={TrackingStyles.symptomText}>Medication</Text>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('3%'), fontSize: wp('4%') }}>What Medication are you taking?</Text>

                        <Input
                            style={{ borderColor: '#ffffff', borderRadius: 15, backgroundColor: 'rgba(240, 152, 116, 0.48)', top: hp('5%'), left: wp('-1%') }}
                            value={this.state.text}
                            color={'#000'}
                            onChangeText={(text) => this.setState({ text })}
                        />

                        <DropDownPicker
                            items={[
                                { label: '0', value: '0' },
                                { label: '1', value: '1' },
                                { label: '2', value: '2' },
                                { label: '3', value: '3' },

                            ]}
                            max={10}
                            defaultValue={this.state.quantity}
                            containerStyle={{
                                paddingVertical: hp('0%'),paddingHorizontal: hp('0.5%'), height: hp('6%'), top: hp('7%'), width: wp('35%'), left: wp('-1%')
                            }}
                            style={styles.dropStyle}
                            dropDownStyle={styles.downStyle}
                            placeholder="Quantity"
                            onChangeItem={item => this.setState({
                                quantity: item.value
                            })}

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
                        {/* <Text style={{ color: '#B3B3B3', textAlign: 'left', top: -30, fontSize: 16 }}>Would you like a Reminder?</Text>
                        <Toggle
                            style={{ left: 180, top: -55 }}
                            checked={this.state.checked}
                            onChange={this.onCheckedChange}>
                            {`Checked: ${this.state.checked}`}
                        </Toggle> */}
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: hp('-15%'), fontSize: wp('4%') }}>Select any of the side effects if applicable</Text>
                        <View style={{top: hp('-10%'), left: wp('4%') }}>
                            <TagSelector

                                selectedTagStyle={TrackingStyles.tagStyle}
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
    text: {
        fontSize: wp('4%'),
        marginTop:hp('3%'),
        color: '#000',
        left: wp('52%'),
        top: hp('-23%'),
        alignContent: 'center',
        
    },
    button: {
        width: wp('35%'),
        backgroundColor: "rgba(240, 152, 116, 0.48)",
        paddingVertical: hp('2%'),
        paddingHorizontal: hp('1%'),
        borderRadius: 15,
        marginVertical: wp('15%'),
        left: wp('38%'),
        top: hp('-7.2%'),
        height:hp('6%')
    },
    buttonText: {
        color: "#000",
        fontSize: wp('3.5%'),

    },

    dropStyle: {
        fontSize: wp('3.5%'),
        borderColor: '#ffffff',
        backgroundColor: 'rgba(240, 152, 116, 0.48)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    downStyle: {
        backgroundColor: '#fafafa',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15

    }
});