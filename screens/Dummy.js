import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');
const Dummy = () => {
  const [passcode, setPasscode] = useState(['', '', '', ''])

  useEffect(() => {
    console.log(passcode);
    if(passcode[3] != '') {
      _checker();
    }
  }, [passcode])

  _checker = () => {
    let tempCode = passcode;
    //hard coded passcode
    let pin = ['1', '1', '1', '1'];
    for (let i = 0; i < 5; i++) {
      if (i < 4) {
        if (tempCode[i] == pin[i]) {
          continue;
        } else {
          alert("error")
          break;
        }
      } else if (tempCode[i] == pin[i]) {
        alert("idk");
        continue;
      } else {
        alert("error")
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
    setPasscode([tempCode[0],tempCode[1],tempCode[2],tempCode[3]]);
  };

  _onPressDelete = () => {
    if (passcode.length != 0) {
      setPasscode((previousArr) => (previousArr.slice(0, -1)));
    }
  }

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <ImageBackground
        source={require('../assets/bg-apps.png')}
        style={{
          position: 'absolute', top: 0,
          width: width, height: height
        }}
        blurRadius={40}
      />
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
        <View style={styles.numbersContainer}>
          {
            numbers.map(num => {
              return (
                <TouchableOpacity
                  style={styles.number}
                  key={num.id}
                  onPress={() => _onPressNumber(num.id)}
                >
                  <Text style={styles.numberText}>{num.id}</Text>
                </TouchableOpacity>)
            })
          }
          <View style={styles.number}>
            <Text style={styles.numberText}>C</Text>
          </View>
          <TouchableOpacity
            style={styles.number}
            onPress={() => _onPressNumber(0)}>
            <Text style={styles.numberText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number}
            onPress={() => _onPressDelete()}>
            <Text style={styles.numberText}>&#9003;</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.forgotContainer}>
        <TouchableOpacity>
          <Text onPress={() => _checker()} style={styles.forgot}>passcode : {JSON.stringify(passcode)}</Text>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default Dummy;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.25,
    lineHeight: 25,
  },
  passcodeText: {
    fontSize: 20,
    letterSpacing: -0.20,
    lineHeight: 25,
    textAlign: "center",
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
    borderColor: "gray",
    backgroundColor: "gray",
    opacity: 0.35,
  },
  code2: {
    width: 13,
    height: 13,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#28bd3e",
    backgroundColor: "#28bd3e",
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    width: 320,
    height: 348,
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
    fontSize: 35,
    letterSpacing: 0,
    textAlign: 'center',
  },
  forgotContainer: {
    marginTop: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  forgot: {
    fontSize: 20,
    letterSpacing: -0.25,
    lineHeight: 25,
    opacity: 0.5,
  },
})