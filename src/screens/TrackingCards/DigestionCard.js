import React from 'react';
import { Image, Dimensions, TouchableOpacity, Slider, View, StyleSheet } from 'react-native';
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
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 40, fontSize: 16 }}>What did you eat today?</Text>
                        <Input
                            style={{ borderColor: '#ffffff', borderRadius: 15, backgroundColor: 'rgba(240, 152, 116, 0.48)', top: 70, left: -3 }}
                            value={this.state.text}
                            color={'#000'}
                            onChangeText={(text) => this.setState({ text })}
                        />
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 100, fontSize: 16 }}>Do you feel bloated?</Text>
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
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 180, fontSize: 16 }}>Select any of the following if applicable</Text>
                        <View style={{ top: 200, left: 15 }}>
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
        width: 300,
        top: 140,
        flex: 1,
        height: 70,
        padding: 10,
        backgroundColor: '#FFF'

    },
    textCon: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    colorGrey: {
        color: '#d3d3d3',
        top: 150
    },
    colorPeach: {
        color: '#f09874',
        top: 150

    }
});