import React from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";



const { width } = Dimensions.get('window');

export default class ExerciseCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { exerciseVisible: false };
    }
    setExerciseVisible(visible) {
        this.setState({ exerciseVisible: visible });
    }


    render() {

        return (
            <Layout style={TrackingStyles.container}>
                <TouchableOpacity onPress={() => { this.setExerciseVisible(true); }}>
                    <Image
                        style={TrackingStyles.exerciseButton}
                        source={require('../../../assets/exercise.png')}
                    />
                </TouchableOpacity>
                <Modal visible={this.state.exerciseVisible}>
                    <Card disabled={true}
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Exercise</Text>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => { this.setExerciseVisible(!this.state.exerciseVisible); }}> Track!
                            </Button>
                    </Card>
                </Modal>
            </Layout>


        );
    };
}

