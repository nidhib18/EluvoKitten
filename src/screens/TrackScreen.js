import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
// import AppointmentCard from "./TrackingCards/AppointmentCard";


const { width } = Dimensions.get("window");
export const TrackScreen = ({ route,navigation }) => {
    const { currentDate } = route.params;
    const { show } = route.params;
      console.log("Route params in Track", route.params)
  return (
    <Layout style={TrackingStyles.container}>
      <TopNavigation
        position="absolute"
        top={0}
        style={{ height:Responsive.height(70), width: width }}
        
      />
      <Button
        style={{ left: wp('40%'), top: wp('%'), height:hp('7%') }}
        
        appearance="outline"
        onPress={() => navigation.navigate("Home")}
      >
        Done
      </Button>
      
      {/* <Image
        style={TrackingStyles.doctorContainer}
        source={require("../../assets/doctor.png")}
      /> */}

      <Divider />
      
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          justifyContent: "space-around",
          flex: 1,
          flexGrow: 1,
          flexDirection: "row",
          marginLeft: Responsive.width(-139),
          marginRight:Responsive.width(-208),
          justifyContent: "center",
          //justifyContent:"space-evenly",
          bottom: Responsive.height(-288),
        }}
      >
        
        <MedicationCard  navigation={navigation}
         route= {route}/>
       {/* {show ? ( */}
          <PainCard navigation={navigation}
            route={route} />
        {/* ) :null} */}
        <MoodCard navigation={navigation}
         route= {route}/>
        <BloodCard navigation={navigation}
         route= {route}/>
        <DigestionCard navigation={navigation}
         route= {route}/>
        <ExerciseCard navigation={navigation}
         route= {route}/>
        <DietCard navigation={navigation}
         route= {route}/>
        <SexCard navigation={navigation}
         route= {route}/>      
        <SaveCard navigation={navigation} />
        <Text style={TrackingStyles.dietText}>Diet</Text>
        <Text style={TrackingStyles.sexText}>Sex</Text>
        <Text style={TrackingStyles.painText}>Pain</Text>
        <Text style={TrackingStyles.smallSaveText}>Save</Text>
      </ScrollView>
      {/* <AppointmentCard/>
      <Text style={TrackingStyles.appointmentText}>Appointment</Text> */}
    </Layout>
  );
};