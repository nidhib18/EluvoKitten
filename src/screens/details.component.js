import React from 'react';
import { SafeAreaView , Image} from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { ImageStyles } from "./ImageStyles";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const DetailsScreen = ({ navigation }) => {

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
            style={ImageStyles.logoContainer}
            source={require('../../assets/logo.png')}
        />

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

        <Image
            style={ImageStyles.eluvoContainer}
            source={require('../../assets/eluvo.png')}
        />

        <Image
            style={ImageStyles.eluvoTextContainer}
            source={require('../../assets/eluvotext.png')}
        />
    </Layout>
    
  );
};