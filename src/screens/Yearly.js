import React from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions,View,ScrollView,Text,TouchableWithoutFeedback, Switch} from "react-native";
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
import { HomeStyles } from "./HomeStyles";
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
    var isNoDataAvailable = this.state.painData.length ==0  && this.state.moodData.length == 0 && this.state.bloodData.length == 0; 
     
    
  return (
    <Layout style={styles.container}>
    <TopNavigation position="absolute"
        top={0}
        style={{ height:hp('20%'), width: width }} /> 
      <Text style={{
            left: Responsive.width(-100),
            top: Responsive.width(145),
            height: Responsive.height(40),
            width: Responsive.width(130),
            color:'white',
            fontSize:Responsive.font(28),
            fontWeight:'600'
          }}>Insights</Text>
      <Button
          style={{
            left: Responsive.width(140),
            top: Responsive.width(155),
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
            top: Responsive.width(115),
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
            top: Responsive.width(75),
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
        
        <View style={{
          width: width,
          height: Responsive.height(673),
          backgroundColor: "#f2f2f2",
          top: Responsive.height(43),
          alignContent: "center",
          shadowColor: "#c8c8c8",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 30,
        }}>
          <ScrollView contentContainerStyle={{
            justifyContent: "center",
            flex: 1,
            flexGrow: 1,
            flexDirection: "column",
            marginTop: Responsive.height(830),
              marginBottom: Responsive.height(-1100),
            justifyContent: "center",
            bottom: Responsive.height(200),
            top: Responsive.height(-970),
            left: Responsive.height(1),
            shadowColor: "#c8c8c8",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 30,
          }}>
            <Text style={{
              left: Responsive.width(-100),
              top: Responsive.width(-80),
              height: Responsive.height(40),
              width: Responsive.width(130),
              color: '#ffff',
              //textAlign: 'left',
              fontWeight: 'bold',

              fontSize: Responsive.font(25)
            }}>Insights</Text>
     
     <View style>
    {!isPainChecked & !isBloodChecked & !isMoodChecked?
      (
                    <>
                    <Card style={styles.cardStyle} >
                    <Text style = {{ color: 'black',
                    textAlign: 'left',
                    position:'centre',
                    fontWeight: 'bold',
                    top:120,
                    fontSize: Responsive.font(15)}}> *Toggle on to view the graph* </Text>
                    </Card>
          </>
      ): (
    
    <Card style={styles.cardStyle} >
    {isNoDataAvailable ?
        (
          <>
              <Text>There is not enough data to display the chart.</Text>
          </>
        ):
        
        (
    
    <VictoryChart padding={{ left:30, top: 30, bottom:45 }} maxDomain={{ y:5 }}>
    {/* <VictoryAxis
   
    label="Years"
    style={{axisLabel: {padding: 35} }} 
  />
  <VictoryAxis
    dependentAxis
    label="Symptom Level"
    style={{axisLabel: {padding: 35 } }} 
  /> */}
    <VictoryGroup  offset={20} padding={{left:100}} colorScale={["tomato", "orange", "gold"]}  >
     
   
     {isPainChecked && this.state.painData.length? 
      (
                    <>
        <VictoryBar
             
              style={{ data: { fill: "#f09874", width: 25 } }}
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
              style={{ data: { fill: "gold", width: 25 } }}
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
    )
      }
            </Card>
      )}

          <Card style={styles.cardToggle}>
            <Image
              source={require("../../assets/painia.png")}
              style ={{width:Responsive.width(60),height:Responsive.height(60)}}
              // 
            />

            <Image
              source={require("../../assets/moodia.png")}
              style={{ width: Responsive.width(60), height: Responsive.height(60), top: Responsive.height(10) }}
            />

            <Image
              source={require("../../assets/bloodia.png")}
              style={{ width: Responsive.width(60), height: Responsive.height(60), top: Responsive.height(20) }}
            />
            
             <Switch
              style ={{top :Responsive.height(-165), right: Responsive.width(-250)}}
             
              
              onValueChange={this.onCheckedPainChange.bind(this)}
              value={isPainChecked}
              trackColor={{ false: "#767577", true: "#f09874" }}
              thumbColor={isPainChecked ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#8A8A8E"
              //onChange={(value) => this.setState({painChecked: value})}
                //value = {this.state.painChecked}
            >
              {/* {`Checked: ${this.state.painChecked}`}{" "} */}
            </Switch>
            <Text style={{top:Responsive.height(-190), width:Responsive.width(90), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(70)}}>Pain</Text>
            <Switch
    //           style={{
    // top: hp("400%")}} 
              style ={{top :Responsive.height(-140), right: Responsive.width(-250)}}
              status='Warning'
              value={isMoodChecked}
              onValueChange={this.onCheckedMoodChange.bind(this)}
              trackColor={{ false: "#767577", true: "gold" }}
              thumbColor={isMoodChecked ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#8A8A8E"
              
              //onValueChange={(value) => this.setState({moodChecked: value} )}
              //onChange={this.onCheckedChange.bind(this)}
            
              //value = {this.state.moodChecked}
            //   onValueChange={this.switchOne}
            //   value={this.state.activeSwitch === 1}
            >
              {/* {`Checked: ${this.state.moodChecked}`} */}
            </Switch>
            <Text style={{top:Responsive.height(-170),  width:Responsive.width(90), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(70)}}>Mood</Text>
            <Switch
               style ={{top :Responsive.height(-120), right: Responsive.width(-250)}}
              // style={styles.toggleBlood}
              status='Warning'
              value={isBloodChecked}
              //onChange={(value) => this.setState({bleedingChecked: value})}
              onValueChange={this.onCheckedBloodChange.bind(this)}
              trackColor={{ false: "#767577", true: "#FFBF81" }}
              thumbColor={isBloodChecked ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#8A8A8E"
              
            >
              {/* {`Checked: ${this.state.bleedingChecked}`} */}
            </Switch>
            <Text style={{top:Responsive.height(-150),  width:Responsive.width(90), fontSize: Responsive.font(18), fontWeight: '500', left: Responsive.width(70)}}>Blood</Text>
            </Card>
        {/* <InsightScreen data={data} round={100} unit="€" /> */}
    
 
</View>
       {/* </ScrollView> */}
       </ScrollView>
       </View>
       <Image
          style={HomeStyles.tabContainer}
          source={require("../../assets/bottomtab.png")}
        />
    
          <TouchableWithoutFeedback
           onPress={() => this.props.navigation.navigate("Home")}>
            <Image
              style={HomeStyles.insightcareplan}
              source={require("../../assets/careplan.png")}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("Insights")}
          >
            <Image
              style={HomeStyles.insightinsights}
              source={require("../../assets/insights.png")}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback  onPress={() => this.props.navigation.navigate("Learn")}>
            <Image
              style={HomeStyles.insightlearn}
              source={require("../../assets/learn.png")}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("HTwo")}
          >
            <Image
              style={HomeStyles.insightsettings}
              source={require("../../assets/settings.png")}
            />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate("Track", {
                currentDate: this.state.currentDate,
              })
            }
          >
            <Image
              style={HomeStyles.ovalContainerInsights}
              source={require("../../assets/oval.png")}
            />
          </TouchableWithoutFeedback>
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
    top:Responsive.height(-35),
    width:Responsive.width(338),
    height:Responsive.height(290),
    borderRadius: 20,
    left:10,
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
    height:Responsive.height(260),
    borderRadius: 20,
    left:Responsive.width(10),
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


  
