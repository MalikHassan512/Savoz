// Auth Navigation

import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Home, Products, Orders, CheckOut, Cart, OrderTrack} from '../screens';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {StyleSheet, Platform} from 'react-native';
import {Colors, IS_IPHONE_X} from '../constants';
import Fonts from '../constants/Fonts';

const Stack = createStackNavigator();

function HomeNavigator({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // if (routeName === 'Products') {
    //   navigation.setOptions({tabBarStyle: {display: 'none'}});
    // } else {
    navigation.setOptions({
      tabBarStyle: {
        // display: 'none',
        display: 'flex',
        ...styles.bottomTab,
      },
    });
    // }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
        // presentation: Platform.OS === 'ios' ? 'card' : 'modal',
        // animationEnabled: true,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Products" component={Products} />

      {/*<Stack.Screen name="Orders" component={Orders} />*/}
    </Stack.Navigator>
  );
}

export default HomeNavigator;

const styles = StyleSheet.create({
  bottomTab: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: '10%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    shadowColor: Colors.BLACK.default,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    elevation: 0,
  },
});
