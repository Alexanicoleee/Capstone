import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Appearance,
    Image
} from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import darkMode from '../styles/darkMode';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const Lockscreen = () => {
    const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme);
  })
    const [passcode, setPasscode] = useState(['', '', '', '']);
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.otf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.otf'),
        'Poppins-Light': require('../assets/fonts/Poppins-Light.otf'),
      });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
          }
          
          prepare();
        console.log(passcode);
        if (passcode[3] != '') {
            _checker();
        }
    }, [passcode])

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
      
      if (!fontsLoaded) {
        return null;
      }

    _checker = () => {
        let tempCode = passcode;
        //hard coded passcode
        let pin = ['1', '1', '1', '1'];
        for (let i = 0; i < 5; i++) {
            if (i < 4) {
                if (tempCode[i] == pin[i]) {
                    continue;
                } else {
                    setPasscode(['', '', '', '']);
                    alert("error passcode");
                    break;
                }
            } else if (tempCode[i] == pin[i]) {
                navigation.navigate('Home');
                setPasscode(['', '', '', '']);
            } else {
                setPasscode(['', '', '', '']);
                alert("error passcode");
                break;
            }
        }
    }

    _onPressNumber = num => {
        let tempCode = passcode;
        for (let i = 0; i < tempCode?.length; i++) {
            if (tempCode[i] === '') {
                tempCode[i] = num;
                break;
            } else {
                continue;
            }
        }
        setPasscode([tempCode[0], tempCode[1], tempCode[2], tempCode[3]]);
    };

    _onPressDelete = () => {
        let tempCode = passcode;
        for (let i = tempCode?.length - 1; i >= 0; i--) {
            if (tempCode[i] === '') {
                continue;
            } else {
                tempCode[i] = '';
                break;
            }
        }
        setPasscode([tempCode[0], tempCode[1], tempCode[2], tempCode[3]]);
    };

    let numbers = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
    ]
    return (
        <SafeAreaView style={theme == 'light'?styles.container:darkMode.container} onLayout={onLayoutRootView}>
            <StatusBar barStyle={theme == 'light'?"light-content" : "dark-content"} />
            <Svg width="170" height="170" position="absolute" left="-25%" top="0%">
                <Defs>
                    <RadialGradient id="grad1" cx="50%" r="50%" cy="50%" fx="50%" fy="50%">
                        <Stop offset="0%" stopColor="#FFD60A" stopOpacity="0.3" />
                        <Stop offset="100%" stopColor="#FFD60A" stopOpacity="0" />
                    </RadialGradient>
                </Defs>
                <Circle cx="85" cy="85" r="85" fill="url(#grad1)" />
            </Svg>
            <Svg width="170" height="170" position="absolute" right="-20%" top="68%">
                <Defs>
                    <RadialGradient id="grad2" cx="50%" r="50%" cy="50%" fx="50%" fy="50%">
                        <Stop offset="0%" stopColor="#32D74B" stopOpacity="0.3" />
                        <Stop offset="100%" stopColor="#32D74B" stopOpacity="0" />
                    </RadialGradient>
                </Defs>
                <Circle cx="85" cy="85" r="85" fill="url(#grad2)" />
            </Svg>
            <Svg width="270" height="270" position="absolute" left="-32%" bottom="-20%">
                <Defs>
                    <RadialGradient id="grad3" cx="50%" r="50%" cy="50%" fx="50%" fy="50%">
                        <Stop offset="0%" stopColor="#FF375F" stopOpacity="0.3" />
                        <Stop offset="100%" stopColor="#FF375F" stopOpacity="0" />
                    </RadialGradient>
                </Defs>
                <Circle cx="135" cy="135" r="135" fill="url(#grad3)" />
            </Svg>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Security screen</Text>
            </View>
            <View style={{ marginTop: 32 }}>
                <Text style={styles.passcodeText}>Enter your passcode</Text>
            </View>
            <View style={styles.passcodeContainer}>
                {passcode?.map((p, index) => {
                    let style = p === '' ? styles.code1 : styles.code2;
                    return <View style={style} key={index}></View>
                })}
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={theme == 'light'?styles.numbersContainer: darkMode.numbersContainer}>
                    {
                        numbers.map(num => {
                            return (
                                <TouchableOpacity
                                    style={theme == 'light'?styles.number:darkMode.number}
                                    key={num.id}
                                    onPress={() => _onPressNumber(num.id)}
                                >
                                    <Text style={theme == 'light'?styles.numberText: darkMode.numberText}>{num.id}</Text>
                                </TouchableOpacity>)
                        })
                    }
                    <View style={theme == 'light'?styles.number:darkMode.number}>
                        <Image source={require('../assets/fingerprint.png')} style={theme == 'light'?styles.touchID: darkMode.touchID} />
                    </View>
                    <TouchableOpacity
                        style={theme == 'light'?styles.number:darkMode.number}
                        onPress={() => _onPressNumber(0)}>
                        <Text style={theme == 'light'?styles.numberText: darkMode.numberText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={theme == 'light'?styles.number:darkMode.number}
                        onPress={() => _onPressDelete()}>
                        <Text style={theme == 'light'?styles.backspace: darkMode.backspace}>&#9003;</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.forgotContainer}>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default Lockscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
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
        fontFamily: 'Poppins-SemiBold'
    },
    passcodeText: {
        fontSize: 20,
        letterSpacing: -0.20,
        lineHeight: 25,
        textAlign: "center",
        fontFamily: 'Poppins-Regular'
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
        backgroundColor: 'rgba(255,255,255,0.95)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        fontSize: 32,
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
        tintColor: '#32D74B',
        alignSelf: 'center',
    },
    backspace: {
        fontSize: 26,
        lineHeight: 34,
        textAlign: 'center',
    }
})