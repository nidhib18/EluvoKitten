import React from 'react';
import { StyleSheet, View,Dimensions,Text,ScrollView,Image,TouchableOpacity} from 'react-native';
import {TopNavigation,Layout,Divider,List } from  '@ui-kitten/components';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
//import { Value } from 'react-native-reanimated';
import {HomeStyles} from "./HomeStyles";
// import { CardList } from 'react-native-card-list';
//import { ScrollView } from 'react-native-gesture-handler';
import { storeData, getData } from "../helpers/StorageHelpers";
import { constants } from "../resources/Constants";
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';


const {Width} = Dimensions.get("window");
let datesWhitelist = [
  {
    start: moment(),
    minDate:'1960, 06, 10',
    end: moment().add(20000, 'days'  ), // total 30 years enabled
   
    maxDate:'2020,20,10'
  },
];
let datesBlacklist = 
[{start:moment.vacationStart,
  end:moment.vacationEnd
 }

];

// 1 day disabled

//     //picture: require("../../assets/dots.png"),
//     content: <Text>Bedroom in Arles</Text>
//   }
// ]
  
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
      userDetails: {}, 
     
    };
  }
  render() 
  {
    getData(constants.USERDETAILS)
    .then(data => 
      {
      // Read back the user details from storage and convert to object
        this.state.userDetails = JSON.parse(data)
      }
      );
   
    
    return (

      <Layout style={styles.container}>
      <TopNavigation position = 'absolute' />

       <Divider/>
      
      <Text>How are you, {userDetails.first_name} ?</Text>

      <CalendarStrip
      
      markedDates = { [
        {

              date:new Date().markedDates,
              selectDate:new Date().markedDates,
              dots:[{key:0,color:'red',selectedDotColor:'blue'}],



      },
       {
          onSelectDate:new Date().markedDates,
          dots:[{key:0,color:'red',selectedDotColor:'blue'}],

       }
      ]}
          
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'background',
            duration: 200,
            borderWidth: 1,
            highlightColor:'white',
            borderHighlightColor: 'white',
          }}
          scrollable
          style={{ top:50,height: 100,width:500, paddingTop: 10, paddingBottom: -10}}
          calendarHeaderStyle={{ color: 'white' }}
          calendarColor={'#f09874'}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          highlightDateNumberStyle={{ color: '#f09874' }}
          highlightDateNameStyle={{ color: '#f09874' }}
          borderHighlightColor={{color:'white'}}
          
          // = {{borderHighlightColor:'#f09'}}
          disabledDateNameStyle={{ color: 'white' }}
          disabledDateNumberStyle={{ color: 'white' }}
          //datesWhitelist={datesWhitelist} // this will disable all date as white colour except the current date from previous 
          datesBlacklist={datesBlacklist}
          iconContainer={{ flex: 0.13}}
        />
        
        {/* <Text style =  {styles.textContainer}>Welcome to Eluvo!</Text> */}

        
      

    
      <Image
                    style={HomeStyles.girlContainer}
                    source={require('../../assets/girl.png')}
                />


      <Text style={HomeStyles.headerText}>You haven't tracked anything today!</Text>

      <TouchableOpacity onPress={() => this.props.navigation.navigate('Track')} >
                    <Image
                        style={HomeStyles.ovalContainer}
                        source={require('../../assets/oval.png')}

                    />
                </TouchableOpacity>

            

</Layout>
    );
  }
} 

const styles = StyleSheet.create({
  container: 
  {
    //flex: 1,
    backgroundColor: '#f09874',
    alignItems: 'center',
    height:200,
    justifyContent: 'center',
  },

  textContainer:
  {
    flex:1,
    position:'absolute',
    top:250,
    justifyContent:'center',
    alignItems:'center'
  },

 
});