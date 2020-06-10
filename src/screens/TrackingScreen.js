import React from 'react';

import { SafeAreaView, Image, StyleSheet, Dimensions, TouchableOpacity, View, ScrollView, Slider } from 'react-native';
import { Divider, Layout, TopNavigation, useStyleSheet, StyleService, Card, Modal, Text, Button } from '@ui-kitten/components';
import { TrackingStyles } from "./TrackingStyles";
import TagSelector from 'react-native-tag-selector';
import { color } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');




export const TrackingScreen = ({ navigation }) => {
    
    const styles = useStyleSheet(themedStyles);
    const [painVisible, setPainVisible] = React.useState(false);
    const [moodVisible, setMoodVisible] = React.useState(false);
    const [bloodVisible, setBloodVisible] = React.useState(false);
    const [digestionVisible, setDigestionVisible] = React.useState(false);
    const [exerciseVisible, setExerciseVisible] = React.useState(false);
    const [medicationVisible, setMedicationVisible] = React.useState(false);
    const [saveVisible, setSaveVisible] = React.useState(false);
    const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
    sliderOneValuesChangeFinish = () => setSliderOneChanging(false);
    const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
    const sliderOneValuesChange = values => setSliderOneValue(values);
    const [sliderOneValue, setSliderOneValue] = React.useState([5]);
    const [selectedTags, setSelectedTags] = React.useState([]);

    tags = [
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
   
    return (
       
        <Layout

            style={styles.container}>
            <TopNavigation position='absolute' top={0} style={{ height: 60, width: width }}/>
            <Divider />
            
           
            <ScrollView
            
                contentContainerStyle={{ justifyContent:'space-around',flex: 1, flexGrow: 1, flexDirection: 'row', marginLeft: '-38%', marginRight: '-30%', justifyContent: 'center', top: 410}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >      
           
            
                <TouchableOpacity onPress={() => setPainVisible(true)}>
                    <Image
                        style={TrackingStyles.painButton}
                        source={require('../../assets/pain.png')}
                    />
                </TouchableOpacity>

                <Modal visible={painVisible}>    
                    <Card disabled={true}
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Pain </Text>
                        <Text style={{ color: '#B3B3B3', textAlign: 'center',  top:40, fontSize:16 }}>How much pain did you have today? </Text>
                        <Slider
                            values={sliderOneValue}
                            sliderLength={310}
                            onValuesChangeStart={sliderOneValuesChangeStart}
                            onValuesChange={sliderOneValuesChange}
                            onValuesChangeFinish={sliderOneValuesChangeFinish}
                            minimumTrackTintColor='#f09874'
                            top={80}
                          
                        />
                        <Text style={{ color: '#B3B3B3', textAlign: 'center',  top:120, fontSize:16 }}>Where is your pain located?</Text>
                       
                    <View style={{top:150}}>
                    <TagSelector       
                        expandCaptions={['more', 'less']}
                        separatorStyle = {{color:'black'}}
                        style={{top:40}}
                        maxHeight={10}
                        tags={tags}
                        onChange={(selected) => setSelectedTags({ selectedTags: selected })}/>
                    </View>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => setPainVisible(false)}> Track!
                            
                        </Button>
                       
                    </Card>
                </Modal>

                <TouchableOpacity onPress={() => setMoodVisible(true)}>
                    <Image
                        style={TrackingStyles.moodButton}
                        source={require('../../assets/mood.png')}
                    />
                </TouchableOpacity>

                <Modal visible={moodVisible}>
                    <Card disabled={true}
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Mood </Text>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => setMoodVisible(false)}
                        > Track!

                        </Button>
                    </Card>
                </Modal>

                <TouchableOpacity onPress={() => setBloodVisible(true)}>
                    <Image
                        style={TrackingStyles.bloodButton}
                        source={require('../../assets/blood.png')}
                    />
                </TouchableOpacity>

                <Modal visible={bloodVisible}>
                    <Card disabled={true}
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Blood</Text>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => setBloodVisible(false)}
                        > Track!

                        </Button>
                    </Card>
                </Modal>

                <TouchableOpacity onPress={() => setDigestionVisible(true)}>
                    <Image
                        style={TrackingStyles.digestionButton}
                        source={require('../../assets/digestion.png')}
                    />
                </TouchableOpacity>

                <Modal visible={digestionVisible}>
                    <Card disabled={true}
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Digestion</Text>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => setDigestionVisible(false)}
                        > Track!

                        </Button>
                    </Card>
                </Modal>

                <TouchableOpacity onPress={() => setExerciseVisible(true)}>
                    <Image
                        style={TrackingStyles.exerciseButton}
                        source={require('../../assets/exercise.png')}
                    />
                </TouchableOpacity>
                <Modal visible={exerciseVisible}>
                    <Card disabled={true}
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Exercise</Text>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => setExerciseVisible(false)}
                        > Track!

                        </Button>
                    </Card>
                </Modal>

                <TouchableOpacity onPress={() => setMedicationVisible(true)}>
                    <Image
                        style={TrackingStyles.medicationButton}
                        source={require('../../assets/medication.png')}
                    />
                </TouchableOpacity>

                <Modal visible={medicationVisible}>
                    <Card disabled={true}
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Medication</Text>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => setMedicationVisible(false)}
                        > Track!
                        </Button>
                    </Card>
                </Modal>

                <TouchableOpacity onPress={() => setSaveVisible(true)}>
                    <Image
                        style={TrackingStyles.saveButton}
                        source={require('../../assets/save.png')}
                    />
                </TouchableOpacity>
                <Modal visible={saveVisible}>
                    <Card disabled={true}
                        style={{ width: width - 55, height: 529, borderRadius: 20, top: -30, backgroundColor: '#ffffff' }}>
                        <Text style={TrackingStyles.saveText}>Thanks for That!</Text>
                        <Text style={TrackingStyles.saveLogText}>Logging your symptoms every day will help paint a better picture of your health</Text>
                        <Image
                            style={TrackingStyles.girlSaveContainer}
                            source={require('../../assets/Illustration.png')}
                        />
                        <Button style={TrackingStyles.trackButton}
                            appearance='outline'  
                            onPress={() =>setSaveVisible(false)}
                        > Finish

                        </Button>
                        
       
      
       
                    </Card>
                </Modal>

            </ScrollView>
        </Layout>
    );
};
const themedStyles = StyleService.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'color-success-400',
    },

});

