import React from "react";
import { Image, Dimensions, TouchableOpacity,TouchableWithoutFeedback, Navigator } from "react-native";
import { Layout, Card, Modal, Text, Button } from "@ui-kitten/components";
import { TrackingStyles } from "../TrackingStyles";

const { width } = Dimensions.get("window");

export default class SaveCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saveVisible: false };
  }
  setSaveVisible(visible) {
    this.setState({ saveVisible: visible });
  }

  onNavigate = () => {
    this.setSaveVisible(!this.state.saveVisible);
    this.props.navigation.navigate("Home", {
      currentDate: this.state.currentDate,
    });
  };

  render() {
    return (
      <Layout>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setSaveVisible(true);
          }}
        >
          <Image
            style={TrackingStyles.saveButton}
            source={require("../../../assets/save.png")}
          />
          
        </TouchableWithoutFeedback>
        <Modal style={{
                    shadowColor: '#c8c8c8',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 30,
                }} visible={this.state.saveVisible}>
          <Card
            disabled={true}
            style={TrackingStyles.cardStyle}
          
          >
          <TouchableWithoutFeedback onPress={() => {
            this.setSaveVisible(!this.state.saveVisible);
          }}>
            <Image
              style={TrackingStyles.xContainerSave}
              source={require('../../../assets/x.png')}
            />
          </TouchableWithoutFeedback>
          
          
            <Text style={TrackingStyles.saveText}>Thanks for That!</Text>
            <Text style={TrackingStyles.saveLogText}>
              Logging your symptoms every day will help paint a better picture
              of your health
            </Text>
            
            <Image
              style={TrackingStyles.girlSaveContainer}
              source={require("../../../assets/Illustration.png")}
            />
            <Button
              style={TrackingStyles.trackButton}
              appearance="outline"
              onPress={this.onNavigate}

            //    onPress=  {() => {
            //     this.props.navigation.navigate('Home')

            //  } }
            >
              {" "}
              Finish
            </Button>
            
          </Card>
        </Modal>
      </Layout>
    );
  }
}
