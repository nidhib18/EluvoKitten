import React from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";

const { width } = Dimensions.get('window');

export default class DigestionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { digestionVisible: false };
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
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Digestion</Text>
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

