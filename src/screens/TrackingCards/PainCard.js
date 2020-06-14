import React from 'react';
import { TrackingStyles } from "../TrackingStyles";
import { Image, Dimensions, TouchableOpacity, View, Slider } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';

import TagSelector from 'react-native-tag-selector';


const { width } = Dimensions.get('window');

export default class PainCard extends React.Component {
    painTags = [
        {
            id: 'Stomach',
            name: 'Stomach'
        },
        {
            id: 'Abdominal',
            name: 'Abdominal'
        },
        {
            id: 'Gut',
            name: 'Gut'
        },
        {
            id: 'Left Side',
            name: 'Left Side'
        },
        {
            id: 'Right Side',
            name: 'Right Side'
        },
        {
            id: 'Back',
            name: 'Back'
        },

    ]
    painTypeTags = [
        {
            id: 'Sharp',
            name: 'Sharp'
        },
        {
            id: 'Dull',
            name: 'Dull'
        },
        {
            id: 'Throbbing',
            name: 'Throbbing'
        },

    ]

    constructor(props) {
        super(props);
        this.state = { painVisible: false };
        this.state = { selectedTags: [] };
    }

    setPainVisible(visible) {
        this.setState({ painVisible: visible });
    }
    render() {

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => {
                    this.setPainVisible(true);
                }}>
                    <Image
                        style={TrackingStyles.painButton}
                        source={require('../../../assets/pain.png')}
                    />
                </TouchableOpacity>

                <Modal visible={this.state.painVisible}>
                    <Card disabled={true}
                        style={{ elevation: 5, shadowColor: '#000', width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'left', fontWeight: 'bold', fontSize: 24 }}>Pain </Text>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 40, fontSize: 16 }}>How much pain did you have today? </Text>

                        <Slider
                            minValue={0}
                            maxValue={10}
                            step={1}
                            minimumTrackTintColor={'#f09874'}
                            selectedMinimum={0}
                            selectedMaximum={10}
                            style={{ top: 80, flex: 1, height: 70, padding: 10, backgroundColor: '#FFF' }}
                            onChange={(data) => { console.log('normal slider data: ', data); }}
                        />
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 120, fontSize: 16 }}>Where is your pain located?</Text>
                        <View style={{ top: 130, left: 35 }}>
                            <Text> Selected: {this.state.selectedTags.map(tag => `${tag} `)} </Text>
                            <TagSelector
                                selectedTagStyle={TrackingStyles.tagStyle}
                                maxHeight={70}
                                tags={this.painTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 150, fontSize: 16 }}>What type of pain did you experience?</Text>
                        <View style={{ top: 180, left: 40 }}>
                            <TagSelector

                                selectedTagStyle={TrackingStyles.tagStyle}
                                maxHeight={70}
                                tags={this.painTypeTags}
                                onChange={(selected) => this.setState({ selectedTags: selected })}
                            />
                        </View>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'

                            onPress={() => {
                                this.setPainVisible(!this.state.painVisible);
                            }}> Track!
                            </Button>

                    </Card>
                </Modal>


            </Layout>


        );
    };
}
