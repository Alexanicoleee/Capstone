import { View, Text, Pressable} from 'react-native';
import React from 'react';
import InactiveChecker from '../auth/InactiveChecker';

const Home = () => {
    InactiveChecker();
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home;