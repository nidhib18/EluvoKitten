import React from 'react';
import { SafeAreaView, Image } from 'react-native';
import { Divider, Input, Icon, Layout, Text, TopNavigation, TopNavigationAction, evaProps, Button } from '@ui-kitten/components';
import { ImageStyles } from "./ImageStyles";
import { ForgotStyles } from "./ForgotStyles";

export const ForgotPasswordScreen = ({ navigation }) => {
    const [emailValue, setEmailValue] = React.useState('');
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

            <Input
                style={ForgotStyles.emailInput}
                placeholder='enter your email'
                label='Email'
                value={emailValue}
                onChangeText={nextValue => setEmailValue(nextValue)}
                placeholderTextColor={'#f09874'}
                color={'black'}
                height={28}

            />
            <Text
                style={ForgotStyles.headerText}>Forgot Password? No Worries :) </Text>

            <Button style={ForgotStyles.submitBtnContainer}
                appearance='outline'
                status='warning'
                onPress={() => navigation.navigate('Home')}>Submit</Button>
        </Layout>

    );
};