import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Cart, CheckOut, OrderPlaced, Orders, OrderTrack} from '../screens';

const Stack = createStackNavigator();

function CartNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'Cart'}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
      <Stack.Screen name="Orders" component={Orders} />

      <Stack.Screen name="OrderTrack" component={OrderTrack} />
    </Stack.Navigator>
  );
}

export default CartNavigator;
