// Tab Navigator

import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeNavigator from './homeNavigator';
import ProfileNavigator from './profileNavigator';
import CartNavigator from './cartNavigator';
import {Favourites, Orders, Home} from '../screens';
import {Colors, width} from '../constants';
import Fonts from '../constants/Fonts';
import {IS_IPHONE_X} from '../constants';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import {
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {CardStyleInterpolators} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

function TabNavigator({route, navigation}) {
  const {bottom} = useSafeAreaInsets();
  const {productCount} = useSelector(state => state.reducer.cart);

  const isTabBarVisible = route => {
    if (route.route.name === 'Cart') {
      return 'none';
    }
    return 'flex';
  };

  return (
    <Tab.Navigator
      // tabBar={props => <MyTabBar {...props} />}
      barStyle={{marginLeft: 30, marginRight: 10, backgroundColor: 'green'}}
      tabBarOptions={{style: {backgroundColor: 'yellow'}}}
      screenOptions={route => ({
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // presentation: 'modal',
        // animationEnabled: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.bottomTab,
          // display: isTabBarVisible(route),
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <>
                <Image
                  style={styles.iconSelected}
                  source={require('../assets/images/ic_home.png')}
                />
                <Text style={styles.textSelected}>Home</Text>
              </>
            ) : (
              <>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/ic_home.png')}
                />
                <Text style={styles.inactiveText}>Home</Text>
              </>
            ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <>
                <Image
                  style={styles.iconSelected}
                  source={require('../assets/images/ic_tabFav.png')}
                />
                <Text style={styles.textSelected}>Favourites</Text>
              </>
            ) : (
              <>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/ic_tabFav.png')}
                />
                <Text style={styles.inactiveText}>Favourites</Text>
              </>
            ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartNavigator}
        // component={Products}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused}) => (
            <>
              {/*<View*/}
              {/*  style={{*/}
              {/*    borderWidth: 0,*/}
              {/*    width: 73,*/}
              {/*    height: '100%',*/}
              {/*    overflow: 'hidden',*/}
              {/*  }}>*/}
              {/*  <View*/}
              {/*    style={{*/}
              {/*      backgroundColor: Colors.WHITE.primary,*/}
              {/*      position: 'absolute',*/}
              {/*      height: 73,*/}
              {/*      width: 73,*/}
              {/*      borderRadius: 100,*/}
              {/*      alignSelf: 'center',*/}
              {/*      marginTop: -34,*/}
              {/*    }}*/}
              {/*  />*/}
              {/*</View>*/}
              <View
                style={{
                  position: 'absolute',
                  // top: Platform.OS === 'ios' ? -30 : -34,
                  top: IS_IPHONE_X
                    ? -30
                    : Platform.OS === 'android'
                    ? -32
                    : -35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={styles.icBasket}
                  source={require('../assets/images/ic_basket.png')}
                />
                {productCount > 0 && (
                  <View style={styles.countCircle}>
                    <Text style={styles.countText}>{productCount}</Text>
                  </View>
                )}
              </View>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={Orders}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <>
                <Image
                  style={styles.iconSelected}
                  source={require('../assets/images/ic_order.png')}
                />
                <Text style={styles.textSelected}>Orders</Text>
              </>
            ) : (
              <>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/ic_order.png')}
                />
                <Text style={styles.inactiveText}>Orders</Text>
              </>
            ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={ProfileNavigator}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <>
                <Image
                  style={styles.iconSelected}
                  source={require('../assets/images/ic_settings.png')}
                />
                <Text style={styles.textSelected}>Settings</Text>
              </>
            ) : (
              <>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/ic_settings.png')}
                />
                <Text style={styles.inactiveText}>Settings</Text>
              </>
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;

const styles = StyleSheet.create({
  icon: {
    marginTop: IS_IPHONE_X ? '10%' : 0,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  iconSelected: {
    marginTop: IS_IPHONE_X ? '10%' : 0,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.ORANGE.default,
    // tintColor: 'blue',
  },
  countCircle: {
    backgroundColor: Colors.BLACK.default,
    position: 'absolute',
    right: 7,
    top: 12,
    borderRadius: 15,
    // padding: 5,
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: Colors.WHITE.default,
    fontSize: 10,
    fontFamily: Fonts.GILROY.Medium,
  },
  textSelected: {
    color: Colors.ORANGE.default,
    marginTop: '5%',
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 12,
  },
  inactiveText: {
    color: Colors.BLACK.default,
    marginTop: '5%',
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 12,
  },
  bottomTab: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: '10%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    // shadowColor: Colors.BLACK.default,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    elevation: 0,
  },
  icBasket: {
    width: 60,
    height: 60,
    // tintColor: Colors.ORANGE.default,
  },
});

function MyTabBar({state, descriptors, navigation}) {
  const render = () => {
    return (
      <>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}>
              <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Image
        style={{height: 100, width: width}}
        source={require('../assets/images/tabBar.png')}
      />
      <View
        style={{
          // flexDirection: 'row',
          height: 100,
          // backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: 'green',
          // opacity: 0,
        }}
      />
    </>
  );
}
