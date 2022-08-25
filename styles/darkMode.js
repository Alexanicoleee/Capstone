import React from 'react';
import {StyleSheet} from 'react-native';
const darkMode = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor:'#212529',
    },
    headerContainer: {
        height: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.25,
        lineHeight: 25,
        color: 'white',
        fontFamily: 'Poppins-SemiBold'
    },
    passcodeText: {
        fontSize: 20,
        letterSpacing: -0.20,
        lineHeight: 25,
        textAlign: "center",
        fontFamily: 'Poppins-Regular',
        color: 'white'
    },
    passcodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 22,
        marginHorizontal: 42,
    },
    code1: {
        width: 13,
        height: 13,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#8E8E93",
        backgroundColor: "#8E8E93",
        opacity: 0.35,
    },
    code2: {
        width: 13,
        height: 13,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#32D74B",
        backgroundColor: "#32D74B",
    },
    numbersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12,
        width: 320,
        height: 340,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    number: {
        width: 80,
        height: 80,
        borderRadius: 75,
        margin: 8,
        backgroundColor: 'rgba(0, 0, 0,0.95)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        fontSize: 32,
        color: 'white',
        lineHeight: 36,
        textAlign: 'center',
        fontFamily: 'Poppins-Light'
    },
    forgotContainer: {
        width: '100%',
        height: 64,
        bottom: '-15%',
        alignItems: "center",
        justifyContent: "center",
    },
    forgot: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        letterSpacing: -0.25,
        lineHeight: 20,
        color: '#8E8E93',
    },
    touchID: {
        width: 40,
        height: 40,
        tintColor: 'white',
        alignSelf: 'center',
    },
    backspace: {
        fontSize: 26,
        lineHeight: 36,
        width:24,
        color: 'white',
        textAlign: 'center',
    }
});

export default darkMode;
