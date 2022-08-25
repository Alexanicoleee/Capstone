import { AppState } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/Home';

const InactiveChecker = () => {
  const [seconds, setSeconds] = useState(0);
  let isMount = true;
  const navigation = useNavigation();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    if (isMount == true) {
      if (seconds == 120) {
        resetTimer();
        navigation.navigate('Lockscreen');
      }
    }
    return () => {
      isMount = false;
      subscription.remove();
    };
  }, [seconds]);

  const resetTimer = () => {
    setSeconds(0);
    console.log("seconds" + seconds);
    Alert.alert('clicked');
    isMount = false;
    subscription.remove();
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

}

export default InactiveChecker;