// App Navigator

import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AuthNavigator from './authNavigator';
import HomeNavigator from './homeNavigator';
import TabNavigator from './tabNavigator';
import ProfileNavigator from './profileNavigator';
import CartNavigator from './cartNavigator';

import {Home, Splash} from '../screens';
import {Linking} from 'react-native';

const Stack = createStackNavigator();

function AppNavigator() {
  console.log('navigator index file called');

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="HomeTab" component={HomeNavigator} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Profile" component={ProfileNavigator} />
        <Stack.Screen name="CartMain" component={CartNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
