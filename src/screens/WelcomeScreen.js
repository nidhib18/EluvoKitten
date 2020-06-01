import React from 'react';
import { SafeAreaView, Image, StyleSheet, Dimensions } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { ImageStyles } from "./ImageStyles";
const { width, height } = Dimensions.get('window');

export const WelcomeScreen = ({ navigation }) =>{

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

            <Button
                style={styles.loginBtnContainer}
                onPress={()=>navigation.navigate('Login')}>Login</Button>

            <Button style={styles.signBtnContainer}
                    onPress={()=>navigation.navigate('SignUp')}>Create an account</Button>

        </Layout>

    );
};

const styles = StyleSheet.create({

    signBtnContainer:
    {

        position: 'absolute',
        width: width - 55,
        height: 50,
        borderRadius: 24,
        top: 620,
        backgroundColor: '#fff',
        includeFontPadding: true,
        paddingVertical: 5,

    },

    loginBtnContainer: {
        position: 'absolute',
        width: width - 55,
        height: 50,
        borderRadius: 24,
        top: 560,
        backgroundColor: 'white',
        includeFontPadding: true,
        paddingVertical: 5,

    },

});
