import React from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions,View,ScrollView,Text} from "react-native";
import { Button, Divider, Layout, TopNavigation,Card,Toggle } from "@ui-kitten/components";
import { TrackingStyles } from "./TrackingStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
//import React from "react";
//import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme,VictoryGroup,VictoryAxis} from "victory-native";
import { color } from "react-native-reanimated";
// import TopBarNav from 'top-bar-nav';
import { mapMoodDataToChartData,mapPainDataToChartData,mapBloodDataToChartData} from "../helpers/YearlyHelpers";
import moment from "moment";
import { constants } from "../resources/Constants";
import {
  utcToLocal,
  localToUtcDate,
  localToUtcDateTime,
} from "../helpers/DateHelpers";
import { storeData, getData } from "../helpers/StorageHelpers";
//import TopBarNav from './TopBarNav';

// import { Layout, Card, Modal, Text, Button } from "@ui-kitten/components";



export default class Yearly extends React.Component
{
  constructor() {
    super();
    this.state = {
      show: false,
      PainCard: false,
      painChecked: true,
      moodChecked: true,
      bleedingChecked: true,
      painData : [],
      moodData: [],
      bloodData: [],
      activeSwitch: null,
      userDetails: {},
      currentDate: moment().format("YYYY-MM-DD")
    };
  }
  
  onCheckedPainChange = () =>
   {
        this.setState({ painChecked: !this.state.painChecked });
        
   };
  
   onCheckedBloodChange = () =>
   {
        this.setState({ bleedingChecked: !this.state.bleedingChecked });
   };
   onCheckedMoodChange = () =>
   {
        this.setState({ moodChecked: !this.state.moodChecked });
   };
   
  componentDidMount()
  {
    getData(constants.USERDETAILS).then((data) => {
      // Read back the user details from storage and convert to object
      this.setState({
          userDetails: JSON.parse(data),
      });    
    })
    .then(data => {
      console.log("In component did mount");
      //this.setState({ painChecked: true}) ;
      this.getChartData();
    })
     


  }
  getChartData() {
    let userId = this.state.userDetails.user_id;
    let url = constants.GETYEARLYCHARTS_DEV_URL.replace("[userId]", userId).replace(
      "[NO_OF_YEARS]",constants.NO_OF_YEARS);
    console.log("Chart yearly Url is", url);
  

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
          console.log("Completed API call to get data for yearly chart");
          console.log(responseData);
          let painData = [];
          painData = mapPainDataToChartData(responseData);

          let moodData = [];
          moodData = mapMoodDataToChartData(responseData);

          let bloodData = [];
          bloodData = mapBloodDataToChartData(responseData);
          console.log ("PAIN CHART DATA",painData);
          console.log ("MOOD CHART DATA",moodData);
          console.log ("BLOOD CHART DATA",bloodData);

          this.setState({painData:painData,moodData:moodData,bloodData:bloodData});

        })
        .catch((err) => console.log(err))
    ); 
  }
  render ()
   {

     var isPainChecked = (this.state.painChecked ) ;
     var isMoodChecked = (this.state.moodChecked ) ;
     var isBloodChecked = (this.state.bleedingChecked ) ;
     
    
  return (
    <Layout style={styles.container}>
    <TopNavigation position="absolute"
        top={0}
        style={{ height:hp('20%'), width: width }} /> 
      <Button
          style={{
            left: Responsive.width(140),
            top: Responsive.width(75),
            height: Responsive.height(40),
            width: Responsive.width(130),
          }}
          appearance="outline"
          onPress={() => this.props.navigation.navigate("Yearly")}
        >
         Year
        </Button>
        <Button
          style={{
            left: Responsive.width(10),
            top: Responsive.width(35),
            height: Responsive.height(40),
            width: Responsive.width(130),
          }}
           appearance="outline"
          onPress={() => this.props.navigation.navigate("Monthly")}
        >
         Month
        </Button>
        <Button
          style={{
            left: Responsive.width(-120),
            top: Responsive.width(-5),
            height: Responsive.height(40),
            width: Responsive.width(130),
          }}
          appearance="outline"
          onPress={() => this.props.navigation.navigate("Insights")}
        >
         Week
        </Button>
        <Text style ={{left: Responsive.width(-100),
            top: Responsive.width(-80),
            height: Responsive.height(40),
            width: Responsive.width(130),
            color: '#ffff',
//textAlign: 'left',
    fontWeight: 'bold',
  
    fontSize: Responsive.font(25)}}>Insights</Text>
       <Divider />
      {/* <TopBarNav
         
                routeStack={ROUTESTACK}
                renderScene={(route, i) => {
                  let Component = ROUTES[route.title];
                  return <Component index={i} />;
                }}
                
                headerStyle={[styles.header]} 
                labelStyle={styles.label}
                underlineStyle={styles.underline}
                imageStyle={styles.image}
                sidePadding={0} 
                inactiveOpacity={0.4}
                fadeLabels={true}
    /> */}
     {/* <Button
          style={{
            left: Responsive.width(150),
            top: Responsive.width(-10),
            height: Responsive.height(40),
            width: Responsive.width(130),
          }}
          appearance="outline"
          onPress={() => this.props.navigation.navigate("Monthly")}
        >
         
        </Button>
        <Button
          style={{
            left: Responsive.width(10),
            top: Responsive.width(-50),
            height: Responsive.height(40),
            width: Responsive.width(100),
          }}
          appearance="outline"
          onPress={() => this.props.navigation.navigate("Yearly")}
        >
         
        </Button> */}
        {/* <Button
          style={{
            right: Responsive.width(80),
            top: Responsive.width(-45),
            height: Responsive.height(40),
            width: Responsive.width(140),
          }}
          //appearance="outline"
          onPress={() => this.props.navigation.navigate("Home")}
        >
         
        </Button> */}
        <Divider />
     
          <View style>
    {!isPainChecked & !isBloodChecked & !isMoodChecked?
      (
                    <>
                    <Card style={styles.cardStyle} >
                    <Text style = {{ color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    top:120,
    fontSize: Responsive.font(15)}}> (i) Not enough data to view the graph</Text>
                    </Card>
          </>
      ): (
    
    <Card style={styles.cardStyle} >
   
    
    <VictoryChart domainPadding={40}>
    <VictoryAxis
   
    label="Years"
    style={{axisLabel: {padding: 35} }} 
  />
  <VictoryAxis
    dependentAxis
    label="Symptom Level"
    style={{axisLabel: {padding: 35 } }} 
  />
    <VictoryGroup  offset={20} padding={{left:100}} colorScale={["tomato", "orange", "gold"]} 
       
     >
     
   
     {isPainChecked && this.state.painData.length? 
      (
                    <>
        <VictoryBar
             
              style={{ data: { fill: "#f08974", width: 25 } }}
              barWidth={15}
              cornerRadius={7}
              domainPadding={{x: [0, 100]}}
              //alignment="start"
              //barRatio={0.8}
              data={this.state.painData}/>
          </>
      ): (<></>)
      }

      {isMoodChecked && this.state.moodData.length? 
      (
                    <>
        <VictoryBar
              style={{ data: { fill: "#f09", width: 25 } }}
              barWidth={15}
              cornerRadius={7}
              domainPadding={{x: [0, 30]}}
              data={this.state.moodData}/>
          </>
      ): (<></>)
      }
      {isBloodChecked && this.state.bloodData.length? 
      (
                    <>
        <VictoryBar
          style={{ data: { fill: "#FFBF81", width: 25 } }}
              barWidth={15}
              cornerRadius={7}
              domainPadding={{x: [0, 50]}}
              data={this.state.bloodData}/>
          </>
      ): (<></>)
      }
    </VictoryGroup>
    </VictoryChart>
    
            </Card>
      )}

          <Card style={styles.cardToggle}>
            <Image
              source={require("../../assets/painia.png")}
              style ={{width:60,height:60}}
              // 
            />

            <Image
              source={require("../../assets/moodia.png")}
              style={{ width: 60, height: 60, top: 10 }}
            />

            <Image
              source={require("../../assets/bloodia.png")}
              style={{ width: 60, height: 60, top: 20 }}
            />
            
             <Toggle
              style ={{top :-170, right: -90}}
              status='Warning'
              
              onChange={this.onCheckedPainChange.bind(this)}
              checked={isPainChecked}
              //onChange={(value) => this.setState({painChecked: value})}
                //value = {this.state.painChecked}
            >
              {/* {`Checked: ${this.state.painChecked}`}{" "} */}
            </Toggle>
            <Toggle
    //           style={{
    // top: hp("400%")}} 
              style ={{top :-130, right: -90}}
              status='Warning'
              checked={isMoodChecked}
              onChange={this.onCheckedMoodChange.bind(this)}
              
              //onValueChange={(value) => this.setState({moodChecked: value} )}
              //onChange={this.onCheckedChange.bind(this)}
            
              //value = {this.state.moodChecked}
            //   onValueChange={this.switchOne}
            //   value={this.state.activeSwitch === 1}
            >
              {/* {`Checked: ${this.state.moodChecked}`} */}
            </Toggle>
        
            <Toggle
               style ={{top :-80, right: -90}}
              // style={styles.toggleBlood}
              status='Warning'
              checked={isBloodChecked}
              //onChange={(value) => this.setState({bleedingChecked: value})}
              onChange={this.onCheckedBloodChange.bind(this)}
              
            >
              {/* {`Checked: ${this.state.bleedingChecked}`} */}
            </Toggle>
            </Card>
        {/* <InsightScreen data={data} round={100} unit="€" /> */}
    
 
</View>
       {/* </ScrollView> */}
       
    </Layout>
  );
};
}
  


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
  cardStyle: {
    top:Responsive.height(-20),
    width:Responsive.width(338),
    height:Responsive.height(290),
    borderRadius: 20,
    left:0,
    borderBottomColor: '#ffffff',
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#ffffff',
    backgroundColor: '#ffffff',
    shadowColor: '#c8c8c8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  
  cardToggle: {
    top:Responsive.height(-10),
    width:Responsive.width(338),
    height:Responsive.height(200),
    borderRadius: 20,
    left:0,
    borderBottomColor: '#ffffff',
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#ffffff',
    backgroundColor: '#ffffff',
    shadowColor: '#c8c8c8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  togglePain: {
    position: "absolute",
    top: hp("500%"),
    right: -90,
    backgroundColor: "#fff",
  },

  toggleMood: {
    position: "absolute",
    top: hp("13%"),
    right: -90,
    backgroundColor: "#fff",
  },
  toggleBlood: {
    position: "absolute",
    top: hp("23%"),
    right: -90,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#c8c8c8"
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
  header: {
    borderBottomWidth: 1,
    //borderColor: '#cecece',
    height:hp('17%'),
    backgroundColor: "#f09874"
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff'
  },
  image: {
    height: 20,
    width: 20,
    tintColor: '#e6faff'
  },
  underline: {
    height: 1,
    backgroundColor: '#1c1c1c',
    width: 40
  },
  headerStyle: {
    borderBottomWidth: 1,
    height:hp('14%'),
    borderColor: '#e6faff',
    backgroundColor: '#f08974'
},
labelStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff'
},
imageStyle: {
    height: 20,
    width: 20,
    tintColor: '#e6faff'
},
underlineStyle: {
    height: 3.6,
    backgroundColor: '#e6faff',
    width: 40
}
});


  
