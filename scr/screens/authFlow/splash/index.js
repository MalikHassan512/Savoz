import React, {useEffect} from 'react';
import {View, Image, Platform} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constants} from '../../../constants';
import {
  updateUser,
  updateProfile,
  updateCartWithLocalData,
  getUserCards,
} from '../../../store/actions';
import {useDispatch} from 'react-redux';
import useState from 'react-usestateref';

const Splash = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('country')
      .then(mCountry => {
        if (mCountry === null) {
          console.log('API HIT!!!!');
          fetch('https://ipinfo.io/json')
            .then(response => response.json())
            .then(response => {
              AsyncStorage.setItem('country', response.country).then();
            })
            .catch(err => {
              console.log('response (err) ===> ', JSON.stringify(err));
            });
          return;
        }
        console.log('API NOT HIT');
      })
      .catch(err => {
        console.log('response (err) ===> ', JSON.stringify(err));
      });
    return () => {};
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkLoginData();
    } else {
      setTimeout(() => {
        checkLoginData();
      }, 2500);
    }
  }, []);

  const checkLoginData = () => {
    AsyncStorage.getItem(Constants.AUTH_TOKENS).then(tokens => {
      console.log('auth res: ', tokens);
      if (tokens) {
        console.log('auth_tokens', tokens);
        AsyncStorage.getItem(Constants.USER_DATA).then(user => {
          if (user) {
            console.log('user_data: ', JSON.parse(user));
            dispatch(
              updateUser({
                user: JSON.parse(user),
                tokens: JSON.parse(tokens),
              }),
            );
            dispatch(updateProfile({userData: JSON.parse(user)}));

            setTimeout(() => {
              dispatch(getUserCards());
            }, 2000);

            navigation.navigate('AuthNavigator');
            navigation.navigate('Main');
          } else {
            navigation.navigate('AuthNavigator');
          }
        });
        AsyncStorage.getItem(Constants.CART_DATA)
          .then(cart => {
            // console.log('got cart data: ', cart);
            dispatch(updateCartWithLocalData({cart: JSON.parse(cart)}));
          })
          .catch(e => console.log('Error retrieving cart data: ', e));
      } else {
        navigation.navigate('AuthNavigator');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoText}
        // source={require('../../../assets/images/logo_text.png')}
        source={require('../../../assets/images/app_logo.png')}
      />
    </View>
  );
};

export default Splash;
