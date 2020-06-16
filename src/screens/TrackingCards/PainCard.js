import React from 'react';
import { TrackingStyles } from "../TrackingStyles";
import { Image, Dimensions, TouchableOpacity, Slider, View, StyleSheet } from 'react-native';
import { Layout, Card, Modal, Text, Button } from '@ui-kitten/components';
import moment from "moment";
import TagSelector from 'react-native-tag-selector';
import { storeData, getData } from "../../helpers/StorageHelpers";
import { constants } from "../../resources/Constants";

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
        //const { currentDate } = this.props.route.params;
        //console.log("Navigation", this.props.route);
        this.state = {
            selectedTags: [],
            painValue: 0,
            minValue: 0,
            maxValue: 10,
            userDetails: {},
            painDetails: { locations: []},
            painLocations: [],
            isPainDataAvailable: false,
            currentDate:  moment().format('YYYY-MM-DD')// / this.props.route.params.CurrentDate    
        };

    }

    setPainVisible(visible) {
        this.setState({ painVisible: visible });
    }

    getPainLocations () {
        
        let url = constants.PAINLOCATIONS_DEV_URL;
        console.log("Url is", url);
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
              console.log("Locations", responseData);
              this.setState({painLocations: responseData});
            })
            .catch((err) => console.log(err))
        );
    };
    getUserPain () {
        let userId = this.state.userDetails.user_id;
        let url = constants.USERPAIN_DEV_URL.replace("[userId]", userId).replace(
          "[occurredDate]",
          this.state.currentDate
        );
        console.log("Url is", url);
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
              // If responseData is not empty, then isPainDataAvailable = true
              console.log("PAIN CARD Get User Pain Respnse", responseData);
              if (Object.keys(responseData).length)
              {
                this.setState({
                  isPainDataAvailable: true,
                  painDetails : responseData
                });
              }
              else
              {
                this.setState({
                  isPainDataAvailable: false,
                  painDetails: { 
                      user_id: userId,
                      pain: { 
                          pain_id: 0,
                          pain_level: 0,
                          occurred_date: this.state.currentDate,
                            locations: []
                      }
                    }
                });
              }
              console.log("PAIN CARD Pain Details", this.state.painDetails.pain)
            })
            .catch((err) => console.log(err))
        );
      };
      componentDidMount()
      {
/*           console.log("Route", this.props.route);
          console.log("Route Params", this.props.route.params); */
        getData(constants.USERDETAILS).then((data) => {
          // Read back the user details from storage and convert to object
          this.state.userDetails = JSON.parse(data);
          this.setState({
            userDetails: JSON.parse(data),
          });
          this.getUserPain();
          this.getPainLocations();
        });
      }
    render() {
       
        let p = this.state.painDetails && this.state.painDetails.pain &&this.state.painDetails.pain.pain_level || 0;
        console.log("PAIN CARD Pain Details in component",p)

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
                            style={{ width: 300, top: 80, flex: 1, height: 70, padding: 10, backgroundColor: '#FFF' }}
                            step={1}
                            minimumValue={this.state.minValue}
                            maximumValue={this.state.maxValue}
                            value={p}
                            onValueChange={val => this.setState({ painValue: val })}
                            maximumTrackTintColor='#d3d3d3'
                            minimumTrackTintColor='#f09874'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.colorGrey}>{this.state.minValue} </Text>
                            <Text style={styles.colorPeach}>
                                {this.state.painValue + ''}
                            </Text>
                            <Text style={styles.colorGrey}>{this.state.maxValue} </Text>
                        </View>
                        <Text style={{ color: '#B3B3B3', textAlign: 'left', top: 120, fontSize: 16 }}>Where is your pain located?</Text>
                        <View style={{ top: 130, left: 35 }}>
                            {/* <Text> Selected: {this.state.painDetails.pain.locations.map(location => location.pain_location)} </Text> */}
                            <TagSelector
                                selectedTagStyle={TrackingStyles.tagStyle}
                                maxHeight={70}
                                tags={this.state.painLocations}
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    textCon: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    colorGrey: {
        color: '#d3d3d3',
        top: 80
    },
    colorPeach: {
        color: '#f09874',
        top: 80

    }
});