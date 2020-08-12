import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MedicationCard from "./TrackingCards/MedicationCard";
import PainCard from "./TrackingCards/PainCard";
import MoodCard from "./TrackingCards/MoodCard";
import BloodCard from "./TrackingCards/BloodCard";
import DigestionCard from "./TrackingCards/DigestionCard";
import ExerciseCard from "./TrackingCards/ExerciseCard";
import SaveCard from "./TrackingCards/SaveCard";
import DietCard from "./TrackingCards/DietCard";
import SexCard from "./TrackingCards/SexCard";
import { TrackingStyles } from "./TrackingStyles";
import { HomeStyles } from "./HomeStyles";

import { Divider, Layout, TopNavigation, Button } from "@ui-kitten/components";
import { ScrollView, Dimensions, Image, Text } from "react-native";
import AppointmentCard from "./TrackingCards/AppointmentCard";


const { width } = Dimensions.get("window");
export const TrackScreen = ({ route, navigation }) => {
  const { currentDate } = route.params;
  // const { show } = route.params;
  // ShowHideComponent = () => {
  //   if (this.state.show == true) {
  //       this.setState({ show: false });
  //   } else {
  //       this.setState({ show: true });
  //   }
// };
  console.log("Route params in Track", route.params)
  return (
    <Layout style={TrackingStyles.container}>
      <TopNavigation
        position="absolute"
        top={0}
        style={{ height: hp('9%'), width: width }}
      />
      <Button
        style={{ left: wp('40%'), top: wp('5%'), height: hp('5%') }}
        
        appearance="outline"
        onPress={() => navigation.navigate("Home")}
      >
        Done
      </Button>

      <Image
        style={TrackingStyles.doctorContainer}
        source={require("../../assets/doctor.png")}
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
          marginRight: "-63%",
          justifyContent: "center",
          bottom: hp('-45%'),
        }}
      >

        <MedicationCard />
        {/* {show ? ( */}
          <PainCard navigation={navigation}
            route={route} />

        {/* ) : null} */}

        <MoodCard navigation={navigation}
          route={route} />
        <BloodCard navigation={navigation}
          route={route} />
        <DigestionCard navigation={navigation}
          route={route} />
        <ExerciseCard navigation={navigation}
          route={route} />
        <DietCard navigation={navigation}
          route={route} />
        <SexCard navigation={navigation}
          route={route} />
        <SaveCard navigation={navigation} />
        <Text style={TrackingStyles.dietText}>Diet</Text>
        <Text style={TrackingStyles.sexText}>Sex</Text>
        {show ? (
        <Text style={TrackingStyles.painText}>Pain</Text>
        ) : null}
        <Text style={TrackingStyles.smallSaveText}>Save</Text>
      </ScrollView>
      <AppointmentCard />
      <Text style={TrackingStyles.appointmentText}>Appointment</Text>
    </Layout>
  );
};
