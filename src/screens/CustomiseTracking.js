import React from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions, Text, View } from "react-native";
import { Button, Divider, Layout, TopNavigation, Card } from "@ui-kitten/components";
import { ImageStyles } from "./ImageStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
import { TrackScreen } from './TrackScreen'
import PainCard from "./TrackingCards/PainCard";
export default class CustomiseTracking extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            PainCard:false
        };
    }
    ShowHideComponent = () => {
            console.log(state);
            this.setState({ show:!this.state.show });
        // } else {
        //     this.setState({ show: true });
        // }
    };
    render() {
        return (
            <Layout style={styles.mainContainer}>

<TopNavigation position="absolute"
                    top={0}
                     style={{ height: hp('14%'), width: width }} />
                 <Text style={{ top: hp('2%'), left: wp('-30'), fontSize: wp('7.5%'), fontWeight: '700' }}>Settings</Text>
                 <Button
                  style={{ left: wp('40%'), top: wp('3'), height: hp('5%') }}

                     appearance="outline"
                     onPress={() => this.props.navigation.navigate("Settings")}
                 >
                     Done
             </Button>
                <Divider />
                <View style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }}>
                    <Card style={styles.cardContainer}>
{/* 
                        {this.state.show ? (
                            <Image
                                source={{
                                    uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
                                }}
                                style={{ width: 100, height: 100 }}
                            />
                        ) : null}
                        <Button title="Hide/Show Component" onPress={this.ShowHideComponent} /> */}

                        <Button show={this.state.show} onPress={() =>
                           {this.ShowHideComponent.bind(this)}
                            
                        } > Hide/Show</Button>

                    </Card>
                </View>


            </Layout>
        );
    };
}
const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fbfbfb",
            height: hp('14'),
        },
        signBtnContainer: {
            position: "absolute",
            width: wp('95%'),
            height: hp('7%'),
            borderRadius: 24,
            top: hp('85%'),
            backgroundColor: "#fff",
            includeFontPadding: true,
            paddingVertical: 5,
        },
    
        loginBtnContainer: {
            position: "absolute",
            width: wp('95%'),
            height: hp('7%'),
            borderRadius: 24,
            top: hp('75%'),
            backgroundColor: "white",
            includeFontPadding: true,
            paddingVertical: 5,
        },
        cardContainer: {
            flex: 1,
            position: "absolute",
            width: wp('90%'),
            borderRadius: 20,
            height: hp('70%'),
            left: wp('5'),
            top: hp('18%'),
            alignItems: "center",
            backgroundColor: "#ffff",
            borderBottomColor: '#ffffff',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            borderRightColor: '#ffffff',
            backgroundColor: '#ffffff',
            shadowColor: '#c8c8c8',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 30,
            // resizeMode: "contain"
        },
    
    });