import React from 'react';
import { SafeAreaView, Image } from 'react-native';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction, Input, Text, props, Button, Datepicker } from '@ui-kitten/components';
import { ImageStyles } from "./ImageStyles";
import { UserInfoStyles } from './UserInfoStyles';


const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

export const UserInfoScreen = ({ navigation }) => {

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );
    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar' />
    );
    const [nameValue, setNameValue] = React.useState('');
    const [lnameValue, setLnameValue] = React.useState('');
    const [date, setDate] = React.useState(new Date());


    return (
        <Layout style={ImageStyles.mainContainer}>
            <TopNavigation position='absolute' />
            <Divider />

            <Text
                style={UserInfoStyles.headerText}>Profile Details</Text>

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

            <Input
                style={UserInfoStyles.nameInput}
                placeholder='enter your first name'
                value={nameValue}
                label='Firstname'
                onChangeText={nextValue => setNameValue(nextValue)}
                placeholderTextColor={'#f09874'}
                color={'black'}
                height={28}

            />

            <Input
                style={UserInfoStyles.lnameInput}
                placeholder='enter your last name'
                label='Lastname'
                value={lnameValue}
                onChangeText={nextValue => setLnameValue(nextValue)}
                placeholderTextColor={'#f09874'}
                color={'black'}
                height={28}

            />

            <Datepicker
                style={UserInfoStyles.datepicker}
                label='Date of Birth'
                placeholder='Pick Date'
                date={date}
                onSelect={nextDate => setDate(nextDate)}
                accessoryRight={CalendarIcon}
            />

            <Button style={UserInfoStyles.submitBtnContainer}
                appearance='outline'
                status='warning'
                onPress={() => navigation.navigate('Home')}>Submit</Button>


        </Layout>




    );
};
