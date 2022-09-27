import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Settings, Profile} from '../screens';

const Stack = createStackNavigator();

function ProfileNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'Settings'}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{tabBarVisible: false}}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
