import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MedicationCard from "./TrackingCards/MedicationCard";
import PainCard from "./TrackingCards/PainCard";
import MoodCard from "./TrackingCards/MoodCard";
import BloodCard from "./TrackingCards/BloodCard";
import DigestionCard from "./TrackingCards/DigestionCard";
import ExerciseCard from "./TrackingCards/ExerciseCard";
import SaveCard from "./TrackingCards/SaveCard";
import { TrackingStyles } from "./TrackingStyles";
import { HomeStyles } from "./HomeStyles";

import { Divider, Layout, TopNavigation, Button } from "@ui-kitten/components";
import { ScrollView, Dimensions, Image, Text } from "react-native";

const { width } = Dimensions.get("window");
export const TrackScreen = ({ route,navigation }) => {
    const { currentDate } = route.params;
      console.log("Route params in Track", route.params)
  return (
    <Layout style={TrackingStyles.container}>
      <TopNavigation
        position="absolute"
        top={0}
        style={{ height:hp('9%'), width: width }}
      />
      <Button
        style={{ left: wp('40%'), top: wp('4%'), height:hp('5%') }}
        s
        appearance="outline"
        onPress={() => navigation.navigate("Home")}
      >
        Done
      </Button>
      <Button
        style={{ right: wp('40%'), top: wp('-8%'), height:hp('5%') }}
        appearance="outline"
        onPress={() => navigation.navigate("Home")}
      >
        Cancel
      </Button>
      <Image
        style={HomeStyles.girlContainer}
        source={require("../../assets/girl.png")}
      />

      <Divider />
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          justifyContent: "space-around",
          flex: 1,
          flexGrow: 1,
          flexDirection: "row",
          marginLeft: "-42%",
          marginRight: "-30%",
          justifyContent: "center",
          bottom: hp('-38%'),
        }}
      >
        <MedicationCard />
        <PainCard navigation={navigation}
         route= {route} />
        <MoodCard navigation={navigation}
         route= {route}/>
        <BloodCard navigation={navigation}
         route= {route}/>
        <DigestionCard navigation={navigation}
         route= {route} />
        <ExerciseCard />
        <SaveCard navigation={navigation} />
      </ScrollView>
    </Layout>
  );
};
