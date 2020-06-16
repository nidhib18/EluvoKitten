// import React, { Component } from "react";
// import { Divider, Layout, TopNavigation } from "@ui-kitten/components";
// import { HomeStyles } from "./HomeStyles";
// import { Image, TouchableOpacity, Text, Button, View } from "react-native";
// import RBSheet from "react-native-raw-bottom-sheet";
// import { ScrollView } from "react-native-gesture-handler";
// import Modal, { ModalContent } from "react-native-modals";

// export default class HomeScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: false,
//     };
//     this.setVisible = this.setVisible.bind(this);
//   }
//   setVisible(bVisible) {}
//   render() {
//     return (
//       <Layout style={HomeStyles.mainContainer}>
//         <TopNavigation position="absolute" />
//         <Divider />

//         <Image
//           style={HomeStyles.girlContainer}
//           source={require("../../assets/girl.png")}
//         />

//         <Text style={HomeStyles.headerText}>
//           You haven't tracked anything today!
//         </Text>

//         <TouchableOpacity
//           onPress={() => this.props.navigation.navigate("Track")}
//         >
//           <Image
//             style={HomeStyles.ovalContainer}
//             source={require("../../assets/oval.png")}
//           />
//         </TouchableOpacity>
//       </Layout>
//     );
//   }
// }
