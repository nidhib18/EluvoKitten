import React from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { TrackingStyles } from "./TrackingStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");

export const SettingScreen = ({ navigation }) => {
  return (
    <Layout style={TrackingStyles.container}>
      <TopNavigation position="absolute"
        top={0}
        style={{ height:hp('9%'), width: width }} />
        <Button
        style={{ left: wp('40%'), top: wp('5.5%'), height:hp('5%') }}
        s
        appearance="outline"
        onPress={() => navigation.navigate("Home")}
      >
        Done
      </Button>
      <Divider />

    </Layout>
  );
};

const styles = StyleSheet.create({
  signBtnContainer: {
    position: "absolute",
    width: wp('95%') ,
    height: hp('7%'),
    borderRadius: 24,
    top: hp('85%'),
    backgroundColor: "#fff",
    includeFontPadding: true,
    paddingVertical: 5,
  },

  loginBtnContainer: {
    position: "absolute",
    width:wp('95%'),
    height: hp('7%'),
    borderRadius: 24,
    top: hp('75%'),
    backgroundColor: "white",
    includeFontPadding: true,
    paddingVertical: 5,
  },
});


