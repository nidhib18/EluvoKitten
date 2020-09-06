import React , { PureComponent }from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions,View,ScrollView } from "react-native";
import { Button, Divider, Layout, TopNavigation,Card } from "@ui-kitten/components";
import { TrackingStyles } from "./TrackingStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
//import React from "react";
//import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme,VictoryGroup,VictoryAxis} from "victory-native";
import { color } from "react-native-reanimated";
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


export default class InsightScreen extends React.Component
{


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
    <TopNavigation position="absolute"
        top={0}
        style={{ height:hp('20%'), width: width }} />
        {/* <Button
        style={{ left: wp('40%'), top: wp('5.5%'), height:hp('5%') }}
        
        appearance="outline"
        onPress={() => navigation.navigate("Home")}
      >
        Done
      </Button> */}
      <Divider />

      <ScrollView
            contentContainerStyle={{
              justifyContent: "center",
              flex: 1,
              flexGrow: 1,
              flexDirection: "column",
              marginTop: Responsive.height(100),
              marginBottom: Responsive.height(-1800),
              justifyContent: "center",
              bottom: Responsive.height(200),
              top: Responsive.height(55),
              left: wp("4.5"),
              shadowColor: "#c8c8c8",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 30,
            }}
          >
          <View style>
       
    <Card style={styles.cardStyle} >

    
    <VictoryGroup  offset={20} colorScale={["#f08974", "#FF9B8F", "gold"]}
    domain={{ x: [1, 4] }}
     >
   
      <VictoryBar
         
      data={[{ x: 2
      , y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]}
    />
    <VictoryBar
      data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]}
    />
    <VictoryBar
      data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]}
    />
    </VictoryGroup>

          </Card>
        {/* <InsightScreen data={data} round={100} unit="€" /> */}
    
 
</View>
       </ScrollView>
       
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
    top:Responsive.height(-26),
    width:Responsive.width(325),
    height:Responsive.height(300),
    borderRadius: 20,
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
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


  
