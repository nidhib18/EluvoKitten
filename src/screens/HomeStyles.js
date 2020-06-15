import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const HomeStyles = {

    mainContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbfbfb'
    },

    girlContainer: {
        flex: 1,
        position: 'absolute',
        width: 151,
        height: 236,
        top: 280,
        alignItems: 'center',
        resizeMode: "contain"

    },
    headerText: {
        position: 'absolute',
        height: 20,
        width: 297,
        color: '#8A8A8E',
        fontSize: 18,
        letterSpacing: -0.1,
        lineHeight: 20,
        alignItems: 'center',
        left:65,
        top: 550
    },

    ovalContainer: {
        flex: 1,
        position: 'absolute',
        width: 151,
        height: 236,
        top: 400,
        left: -75,
        alignItems: 'center',
        resizeMode: "contain"

    },

    button: {
        position: 'absolute',
        top: 100
    },

    painButton: {
        position: 'absolute',
        bottom: 45,
        width: 100,
        height: 100,
        left: 10,
        resizeMode: "contain"



    },


    moodButton: {
        position: 'absolute',
        bottom: 50,
        width: 100,
        height: 100,
        left: 110,
        resizeMode: "contain"
    },

    bloodButton: {
        position: 'absolute',
        bottom: 45,
        width: 105,
        height: 105,
        left: 210,
        resizeMode: "contain"
    },

    digestionButton: {
        position: 'absolute',
        bottom: 50,
        width: 103,
        height: 103,
        left: 310,
        resizeMode: "contain"
    },

    exerciseButton: {
        position: 'absolute',
        bottom: 50,
        width: 103,
        height: 103,
        left: 410,
        resizeMode: "contain"
    },

    medicationButton: {
        position: 'absolute',
        bottom: 50,
        width: 103,
        height: 103,
        left: 510,
        resizeMode: "contain"
    },
    saveButton: {
        position: 'absolute',
        bottom: 50,
        width: 103,
        height: 103,
        left: 610,
        resizeMode: "contain"
    },




}

