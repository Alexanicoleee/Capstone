import { AppState } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const InactiveChecker = () => {
  const [seconds, setSeconds] = useState(0);
  let isMount = true;
  const navigation = useNavigation();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    let interval = null;
    interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    if (isMount == true) {
      if(seconds == 30){
        reset();
        navigation.navigate('Lockscreen');
      }
    }
    return () => {
      isMount = false;
      subscription.remove();
    };
  }, [seconds]);

  reset = () =>  {
    setSeconds(0);
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