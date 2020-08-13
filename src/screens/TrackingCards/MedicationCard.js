import React from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Layout, Input, Card, Modal, Text, Button, Toggle } from '@ui-kitten/components';
import { TrackingStyles } from "../TrackingStyles";
import DropDownPicker from 'react-native-dropdown-picker';
import TimePicker from "react-native-24h-timepicker";
import TagSelector from 'react-native-tag-selector';
import { color } from 'react-native-reanimated';
import moment from "moment";
import { storeData, getData } from "../../helpers/StorageHelpers";
import { constants } from "../../resources/Constants";
import { initPainDetails } from "../../models/PainDetails";
import { utcToLocal, localToUtcDate, localToUtcDateTime } from "../../helpers/DateHelpers";
import { mapListItemsToTags } from "../../helpers/TagHelpers"
import { initMedicationDetails } from '../../models/MedicationDetails';

const { width } = Dimensions.get('window');

export default class MedicationCard extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {medicationVisible: false}; 
          this.state={  
            selectedTags: [],
            selectedMedicationSideEffects: [], 
            medicationSideEffects:[],
            medicationType:"",
            medicationQuantity:"",
            medicationTimeTaken:" ",
            userDetails:{}, 
            medicationDetails: initMedicationDetails(0,  moment().format('YYYY-MM-DD')) ,
            currentDate: this.props && this.props.route && this.props.route.params && this.props.route.params.currentDate || moment().format('YYYY-MM-DD')    
        };
        this.saveMedicationDetails = this.saveMedicationDetails.bind(this);
    }
    setMedicationVisible(visible) {
        this.setState({ medicationVisible: visible });
    }
    getMedicationSideEffects   () {
  
  let url = constants.MEDICATIONSIDEEFFECTS_DEV_URL;
        getData(constants.JWTKEY).then((jwt) =>
            fetch(url, {
                //calling API
                method: "GET",
                headers: {
                    Authorization: "Bearer " + jwt, //Passing this will authorize the user
                },
            })
                .then((response) => response.json())
                .then((responseData) => {
                    let medicationSideEffects = [];//getting all possible paintype tags from the database  //{} is an object [] an array a value
                medicationSideEffects = mapListItemsToTags(responseData);
                    
                    this.setState({ medicationSideEffects: medicationSideEffects });
                })
                .catch((err) => console.log(err))
        );
    };

    saveMedicationDetails() {

            // Add the saved med level
            let userId = this.state.userDetails.user_id;
            let occuredDate = moment(this.state.currentDate).add(moment().hour(), 'hour').add(moment().minute(), 'minute');
            // Add medication side effects 
            let medicationSideEffects = null ;
            if (this.state.selectedMedicationSideEffects.length > 0)
            medicationSideEffects = this.state.selectedMedicationSideEffects[0]; 

            let medication = { //sending to the database,if pian type value = 0 then don't send it to the database as it means the user didnt select any tags
                user_id: userId,
                medication_time_taken:this.state.medicationTimeTaken,
                medication_type:this.state.medicationType,
                medication_quantity:this.state.medicationQuantity,
                medication_side_effects :medicationSideEffects, 
                occured_date: localToUtcDateTime(occuredDate),
                
            };
           
            let url = constants.ADDUSERMEDICATION_DEV_URL;
            getData(constants.JWTKEY).then((jwt) =>
                fetch(url, {
                    //calling API
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + jwt, //Passing this will authorize the user
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(medication)
                })
                    .then((response) => {
                        //console.log(response.json());
                        return response.json();
                    })
            );
    }

    componentDidMount() //after Ui has been uploaded 
     {
        getData(constants.USERDETAILS).then((data) => {
            // Read back the user details from storage and convert to object
            this.state.userDetails = JSON.parse(data);
            this.setState({
                userDetails: JSON.parse(data),
            });
            this.getMedicationSideEffects(); 
                 
        });
    }
        
    render() {
        
        let  medicationSideEffects = this.state.medicationSideEffects || [] ; // get all the possible value from the list item , if not then empty array .
        let  medicationType = this.state.medicationType || "";
        let  medicationQuantity = this.state.medicationQuantity || "";
        let  medicationTimeTaken= this.state.medicationTimeTaken ||"";
    
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
                            value={medicationType}
                            onChangeText={
                                // Set this.state.email to the value in this Input box
                                (value) => this.setState({ medicationType: value })
                            }/>

                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('8%'), fontSize: wp('4%'), fontWeight: '500' }}>Time Taken</Text>
                        <Input
                            style={{ backgroundColor: '#FBFBFB', top: hp('10') }}
                            placeholder='9:00 am'
                            placeholderTextColor='#8A8A8E'
                            value={medicationTimeTaken}
                            color='#8A8A8E'
                            onChangeText={
                                // Set this.state.email to the value in this Input box
                                (value) => this.setState({ medicationTimeTaken: value })
                            }
                        />

                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('12%'), fontSize: wp('4%'), fontWeight: '500' }}>Dosage</Text>
                        <Input
                            style={{ backgroundColor: '#FBFBFB', top: hp('14') }}
                            placeholder='2 tablets'
                            placeholderTextColor='#8A8A8E'
                            value={medicationQuantity}
                            color='#8A8A8E'
                            onChangeText={
                                // Set this.state.email to the value in this Input box
                                (value) => this.setState({ medicationQuantity: value })
                            }
                        />

                        <Text style={{ color: '#8A8A8E', textAlign: 'left', top: hp('17%'), fontSize: wp('4%'), fontWeight: '500' }}>Have you noticed any side effects?</Text>
                        <View style={{ top: hp('20%'), left: wp('-2%') }}>
                            <TagSelector

                                tagStyle={TrackingStyles.tag}
                                selectedTagStyle={TrackingStyles.tagSelected}
                                maxHeight={70}
                                tags={medicationSideEffects}
                                onChange={(selected) => this.setState({ selectedMedicationSideEffects: selected })}
                            /> 
                        </View>
                        <Button
                            style={TrackingStyles.trackButton}
                            appearance='outline'
                            onPress={() => {
                                this.setMedicationVisible(!this.state.medicationVisible);
                                this.saveMedicationDetails(); 
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