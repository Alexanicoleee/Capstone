import { View, Text, StyleSheet, Alert, SafeAreaView, AppState } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [seconds, setSeconds] = useState(0);
  const navigation = useNavigation();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    console.log("idk" + seconds);
    if (seconds == 10) {
      subscription.remove();
      clearInterval(interval);
      setSeconds(0)
      navigation.navigate('Lockscreen');
    }
    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, [seconds]);

  const resetTimer = () => {
    setSeconds(0);
    console.log("seconds" + seconds);
    Alert.alert('clicked');
  }

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      navigation.navigate('Lockscreen');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  }

  return (
    <SafeAreaView style={styles.container} onTouchStart={resetTimer}>
      <View style={styles.view}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  view: {
    height: '100%',
    width: '100%',
  },
});

export default Home;