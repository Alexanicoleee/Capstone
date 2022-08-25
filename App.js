import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dummy from './screens/Dummy';
import Lockscreen from './screens/Lockscreen';
import Home from './screens/Home';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Lockscreen"
          component={Lockscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Dummy" component={Dummy} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


