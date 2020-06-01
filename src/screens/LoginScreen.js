import React from 'react';
import { SafeAreaView , Image} from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { ImageStyles } from "./ImageStyles";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const LoginScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <Layout style={ImageStyles.mainContainer}>

        <TopNavigation position='absolute' />
        <Divider />

        <Image
            style={ImageStyles.bubbleContainer}
            source={require('../../assets/bubble.png')}
        />

        <Image
            style={ImageStyles.squiggleContainer}
            source={require('../../assets/squiggle.png')}
        />

        <Image
            style={ImageStyles.dotsContainer}
            source={require('../../assets/dots.png')}
        />

    </Layout>
    
  );
};