import React , { PureComponent }from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions,View,ScrollView,Text} from "react-native";
import { Button, Divider, Layout, TopNavigation,Card,Toggle } from "@ui-kitten/components";
import { TrackingStyles } from "./TrackingStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
//import React from "react";
//import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme,VictoryGroup,VictoryAxis} from "victory-native";
import { color } from "react-native-reanimated";
import TopBarNav from 'top-bar-nav';
//import TopBarNav from './TopBarNav';

// import { Layout, Card, Modal, Text, Button } from "@ui-kitten/components";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];
const yellow200 = "#FFF59D";
const deepOrange600 = "#F4511E";
const lime300 = "#DCE775";
const lightGreen500 = "#8BC34A";
const teal700 = "#00796B";
const cyan900 = "#006064";
const colors = 
{
 fill: deepOrange600,
  // yellow200,
  // lime300,
  // lightGreen500,
  // teal700,
  // cyan900
}
// import * as d3 from 'd3'
// import { Svg, G, Line,Rect,Text} from 'react-native-svg'
// import Chart from './Chart';
// const GRAPH_MARGIN = 20
// const GRAPH_BAR_WIDTH = 5
// const colors = {
//   axis: '#E4E4E4',
//   bars: '#15AD13'
// }


//TOP NAVIGATION BAR

const Scene = ({ index }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{index}</Text>
  </View>
);

const SceneTwo = ({ index }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{index}</Text>
  </View>
);
const ROUTES = {
  Scene,
  SceneTwo
  
  // ideally you would have a ROUTES object with multiple React component scenes
};

// There are three types of labels (image, text, and element)
const ROUTESTACK = [
  
  { text: 'WEEKLY', title: 'Scene' },
  { text: 'MONTHLY', title: 'SceneTwo' },
  { text: 'YEARLY', title: 'Scene' }
];

export default class InsightScreen extends React.Component
{
  constructor() {
    super();
    this.state = {
      show: false,
      PainCard: false,
      painChecked: false,
      moodChecked: false,
      bleedingChecked: false,
      painData : [],
      moodData: [],
      bloodData: [],
      activeSwitch: null,
      userDetails: {},
    };
  }
  painData = () =>
  {
    this.setState(painData=[{ x: 1, y: 1 }, { x: 2, y: 2}, { x: 3, y: 7 }]);
  }

  moodData = () =>
  {
    this.setState(moodData=[{ x: 1, y: 2 }, { x: 2, y: 3}, { x: 3, y: 8 }]);
  }

  bloodData = () =>
  {
    this.setState(bloodData=[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]);
  }
  onCheckedPainChange = () =>
   {
        this.setState({ painChecked: !this.state.painChecked });
        
   };
  //  onCheckedPainChange = (val) =>
  //  {
  //       this.setState({
  //         userSettings: {
  //           ...this.state.userSettings, 
  //           enable_pain: !this.state.userSettings.enable_pain 
  //         },
  //       }); 
   onCheckedBloodChange = () =>
   {
        this.setState({ bleedingChecked: !this.state.bleedingChecked });
   };
   onCheckedMoodChange = () =>
   {
        this.setState({ moodChecked: !this.state.moodChecked });
   };
   
  render ()
   {
  //   const data = [
  //     { label: 'Jan', value: 500 },
  //     { label: 'Feb', value: 312 },
  //     { label: 'Mar', value: 424 },
  //     { label: 'Apr', value: 745 },
  //     { label: 'May', value: 89 },
  //     { label: 'Jun', value: 434 },
  //     { label: 'Jul', value: 650 },
  //     { label: 'Aug', value: 980 },
  //     { label: 'Sep', value: 123 },
  //     { label: 'Oct', value: 186 },
  //     { label: 'Nov', value: 689 },
  //     { label: 'Dec', value: 643 }
  //   ]
  //   const SVGHeight = 150
  //   const SVGWidth = 300
  //   const graphHeight = SVGHeight - 2 * GRAPH_MARGIN
  //   const graphWidth = SVGWidth - 2 * GRAPH_MARGIN
  //   // const data = this.props.data

  //   // X scale point
  //   const xDomain = data.map(item => item.label)
  //   const xRange = [0, graphWidth]
  //   const x = d3.scalePoint()
  //     .domain(xDomain)
  //     .range(xRange)
  //     .padding(1)

  //   // Y scale linear
  //   const maxValue = d3.max(data, d => d.value)
  //   const topValue = Math.ceil(maxValue / this.props.round) * this.props.round
  //   const yDomain = [0, topValue]
  //   const yRange = [0, graphHeight]
  //   const y = d3.scaleLinear()
  //     .domain(yDomain)
  //     .range(yRange)

  //   // top axis and middle axis
  //   const middleValue = topValue / 2

  return (
    <Layout style={styles.container}>
    {/* <TopNavigation position="absolute"
        top={0}
        style={{ height:hp('20%'), width: width }} /> */}
        {/* <Button
        style={{ left: wp('40%'), top: wp('5.5%'), height:hp('5%') }}
        
        appearance="outline"
        onPress={() => navigation.navigate("Home")}
      >
        Done
      </Button> */}
      {/* <Divider /> */}
      <TopBarNav
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
    />
     
          <View style>
        {/* <ScrollView
            contentContainerStyle={{
              justifyContent: "center",
              flex: 1,
              flexGrow: 1,
              flexDirection: "column",
              marginTop: Responsive.height(100),
              marginBottom: Responsive.height(-1800),
              justifyContent: "center",
              bottom: Responsive.height(100),
              top: Responsive.height(55),
              left: wp("4.5"),
            
              //shadowColor: "#c8c8c8",
              //shadowOffset: { width: 0, height: 2 },
              //shadowOpacity: 0.8,
              //shadowRadius: 30,
            }}
          > */}
    <Card style={styles.cardStyle} >
    <VictoryChart>
    
    <VictoryGroup  offset={20} colorScale={["#f08974", "#FF9B8F", "gold"]}
    domain={{ x: [1, 4] }}
     >
   
   <VictoryBar
      data={this.state.painData}  tickValues={[1,5]}
    />
    <VictoryBar
      data={this.state.moodData}
    />
    <VictoryBar
      data={this.state.bloodData}
    />
    </VictoryGroup>
    </VictoryChart>
    
          </Card>

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
              style={styles.togglePain}
              onChange={this.onCheckedPainChange.bind(this)}
              checked={this.state.painChecked}
              //onChange={(value) => this.setState({painChecked: value})}
                //value = {this.state.painChecked}
            >
              {/* {`Checked: ${this.state.painChecked}`}{" "} */}
            </Toggle>
            <Toggle
              style={styles.toggleMood}
              checked={this.state.moodChecked}
              onChange={this.onCheckedMoodChange.bind(this)}
              onChange = {this.painData.bind(this)}
              //onValueChange={(value) => this.setState({moodChecked: value} )}
              //onChange={this.onCheckedChange.bind(this)}
            
              //value = {this.state.moodChecked}
            //   onValueChange={this.switchOne}
            //   value={this.state.activeSwitch === 1}
            >
              {/* {`Checked: ${this.state.moodChecked}`} */}
            </Toggle>
        
            <Toggle
              style={styles.toggleBlood}
              checked={this.state.bleedingChecked}
              //onChange={(value) => this.setState({bleedingChecked: value})}
              onChange={this.onCheckedBloodChange.bind(this)}
              value = {this.state.bleedingChecked}
             
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
    top:Responsive.height(-30),
    width:Responsive.width(325),
    height:Responsive.height(300),
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
    top:Responsive.height(-40),
    width:Responsive.width(325),
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
    top: hp("4%"),
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
    borderColor: '#cecece',
    height:hp('17%'),
    backgroundColor: '#f08974'
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


  
