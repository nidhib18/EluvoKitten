import React from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Layout, Input, Card, Modal, Text, Button, Toggle } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import DropDownPicker from 'react-native-dropdown-picker';
import TimePicker from "react-native-24h-timepicker";


const { width } = Dimensions.get('window');

export default class MedicationCard extends React.Component {
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
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Medication</Text>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 40, fontSize: 16 }}>What Medication are you taking?</Text>

                        <Input
                            style={{ borderRadius: 15, backgroundColor: 'rgba(240, 152, 116, 0.48)', top: 70, left: -3 }}
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
                            containerStyle={{ height: 40, top: 100, width: 150, left: -3 }}
                            style={{ backgroundColor: 'rgba(240, 152, 116, 0.48)', borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
                            dropDownStyle={{ backgroundColor: '#fafafa', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
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
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: -30, fontSize: 16 }}>Would you like a Reminder?</Text>
                        <Toggle
                            style={{ left: 180, top: -55 }}
                            checked={this.state.checked}
                            onChange={this.onCheckedChange}>
                            {`Checked: ${this.state.checked}`}
                        </Toggle>
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
        fontSize: 16,
        marginTop: 10,
        color: '#000',
        left: 250,
        top: -80,
        alignContent: 'center',

        width: 145
    },
    button: {
        width: 145,
        backgroundColor: "rgba(240, 152, 116, 0.48)",
        paddingVertical: 11,
        paddingHorizontal: 17,
        borderRadius: 15,
        marginVertical: 50,
        left: 160,
        top: 10
    },
    buttonText: {
        color: "#000",
        fontSize: 14,

    }
});