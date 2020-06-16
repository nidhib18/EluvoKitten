import React from "react";
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
        style={{ height: 60, width: width }}
      />
      <Button
        style={{ left: 170, top: 20, height: 10 }}
        s
        appearance="outline"
        onPress={() => navigation.navigate("Home")}
      >
        Done
      </Button>
      <Button
        style={{ right: 170, top: -20, height: 10 }}
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
          marginLeft: "-38%",
          marginRight: "-30%",
          justifyContent: "center",
          top: 340,
        }}
      >
        <MedicationCard />
        <PainCard navigation={navigation}
         route= {route} />
        <MoodCard />
        <BloodCard />
        <DigestionCard />
        <ExerciseCard />
        <SaveCard navigation={navigation} />
      </ScrollView>
    </Layout>
  );
};
