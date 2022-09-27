// Auth Navigation

import React, {useEffect} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  SignIn,
  Landing,
  ForgotPassword,
  ResetPassword,
  SignUp,
} from '../screens';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constants} from '../constants';
import {updateUser} from '../store/actions/auth';
import {updateProfile} from '../store/actions/profile';

const Stack = createStackNavigator();

function AuthNavigator() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   checkLinking().catch();
  // }, []);

  useEffect(() => {
    checkLinking().catch();

    Linking.addEventListener('url', url => {
      console.log('navigation object', url);
      handleOpenURL(url?.url);
    });
  }, []);

  const handleOpenURL = url => {
    console.log('url invoked: ', url);
    let link = url;
    if (link != null) {
      AsyncStorage.getItem(Constants.AUTH_TOKENS).then(tokens => {
        console.log('auth res: ', tokens);
        if (tokens) {
          return;
        } else {
          console.log('linking url: ', url);
          if (link.includes('reset_pass')) {
            link = link.replace('savoz://app/v1/auth/reset_password/', '');
          }
          let subString = link.split('/');
          console.log('url checking: ', subString);
          navigation.navigate('ResetPassword', {
            token: subString[0],
            id: subString[1],
          });
        }
      });
    }
  };

  const checkLinking = async () => {
    const url = await Linking.getInitialURL();
    if (url) {
      handleOpenURL(url);
    }
  };

  return (
    <Stack.Navigator
      // initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
