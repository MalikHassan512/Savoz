import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {RNSwitch, Header, AlertBox, Button} from '../../../components';
import {Action} from './components';

import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {logoutRequest, clearUserData} from '../../../store/actions';
import {Colors, Constants} from '../../../constants';
import {openLinkInBrowser} from '../../../store/util';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../../../constants/strings';

const Settings = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const {authTokens, isLoading} = useSelector(state => state.reducer.auth);
  const {userData, errorMessage} = useSelector(state => state.reducer.profile);
  let name = `${userData?.firstName} ${userData?.lastName}`;
  const [isGuest, setIsGuest] = useState(false);
  const [showLogOutAlert, setShowLogOutAlert] = useState(false);

  // useEffect(() => {
  //   if (userData?.firstName?.includes('guest')) {
  //     setIsGuest(true);
  //   }
  // }, []);

  const contactUs = () => {
    Linking.openURL(
      `mailto:${Constants.CONTACT_SUPPORT}?subject=${strings.contactSubject}&body=${strings.contactBody}`,
    ).catch(err => console.log('error: ' + err));
  };

  const onLogoutPress = () => {
    setShowLogOutAlert(true);
    // Alert.alert(strings.logout, strings.areYouSureLogout, [
    //   {
    //     text: strings.yes,
    //     onPress: logoutHandler,
    //   },
    //   {
    //     text: strings.cancel,
    //     onPress: () => console.log('user canceled logout'),
    //   },
    // ]);
  };

  const logoutHandler = () => {
    // console.log('accesstoken: ', authTokens);
    // console.log('accesstoken only: ', authTokens?.accessToken);
    setShowLogOutAlert(false);
    dispatch(
      logoutRequest({accessToken: authTokens?.accessToken}, res => {
        if (res === 'error') {
          navigation.navigate('SignIn');
        } else {
          navigation.navigate('SignIn');
        }
      }),
    );
  };

  const onLoginPress = isSignUp => {
    dispatch(clearUserData());
    AsyncStorage.setItem(Constants.USER_DATA, '').catch(e => console.log(e));
    AsyncStorage.setItem(Constants.AUTH_TOKENS, '').catch(e => console.log(e));
    if (isSignUp) {
      navigation.navigate('SignUp');
    } else {
      navigation.navigate('SignIn');
    }
  };

  const onProfilePress = () => {
    if (userData?.firstName?.includes('guest')) {
      return;
    } else {
      navigation.navigate('Profile');
    }
  };

  const loadingView = () => {
    return (
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          ...StyleSheet.absoluteFillObject,
        }}>
        <ActivityIndicator size={'large'} color={Colors.ORANGE.default} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/*<View style={styles.test} />*/}
      <View style={{backgroundColor: Colors.ORANGE.default}}>
        {/*<Header backIconStyle={{tintColor: Colors.WHITE.default}} />*/}
        <Header />
      </View>
      <ScrollView style={{flex: 1}}>
        <View>
          <View
            style={{
              backgroundColor: Colors.ORANGE.default,
              paddingHorizontal: '5%',
            }}>
            <TouchableOpacity onPress={onProfilePress}>
              <View style={styles.profileContainer}>
                <FastImage
                  style={styles.profilePic}
                  source={{uri: userData?.avatar}}
                  fallback
                  defaultSource={require('../../../assets/images/imgPlaceholder.png')}
                />
                <View style={styles.nameAndEmailContainer}>
                  <Text style={styles.name}>{name}</Text>
                  {!userData?.firstName?.includes('guest') && (
                    <Text style={styles.email}>{userData?.email}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
          </View>
          <View style={styles.screenMargin}>
            <View style={styles.notificationsContainer}>
              <View style={styles.notifications}>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/images/ic_notifications.png')}
                />
                <Text style={styles.title}>{strings.notifications}</Text>
              </View>
              <RNSwitch />
            </View>
            <Action
              icon={require('../../../assets/images/ic_promo_code.png')}
              title="Promo code"
              lineIcon={require('../../../assets/images/ic_line.png')}
            />
            {/*<Action*/}
            {/*  icon={require('../../../assets/images/ic_payment_methods.png')}*/}
            {/*  title="Payment methods"*/}
            {/*  lineIcon={require('../../../assets/images/ic_line.png')}*/}
            {/*/>*/}
            <Action
              onPress={() => openLinkInBrowser(Constants.TERMS_CONDITIONS)}
              icon={require('../../../assets/images/ic_terms_conditions.png')}
              title="Terms & conditions"
              lineIcon={require('../../../assets/images/ic_line.png')}
            />
            <Action
              onPress={() => openLinkInBrowser(Constants.PRIVACY_POLICY)}
              icon={require('../../../assets/images/ic_privacy_policy.png')}
              title="Privacy policy"
              lineIcon={require('../../../assets/images/ic_line.png')}
            />
            <Action
              onPress={contactUs}
              icon={require('../../../assets/images/ic_contact_us.png')}
              title="Contact us"
              lineIcon={require('../../../assets/images/ic_line.png')}
            />
            {/*<Action*/}
            {/*  onPress={() => openLinkInBrowser('https://www.google.com')}*/}
            {/*  icon={require('../../../assets/images/ic_help.png')}*/}
            {/*  title="Help"*/}
            {/*  lineIcon={require('../../../assets/images/ic_line.png')}*/}
            {/*/>*/}
          </View>
        </View>
      </ScrollView>
      <View style={styles.logout}>
        {/*<TouchableOpacity >*/}
        {/*  <Text>{strings.areYouNew}</Text>*/}
        {/*</TouchableOpacity>*/}

        {userData?.id === Constants.GUEST_USER && (
          <>
            <Button
              onPress={() => onLoginPress(true)}
              white
              title={strings.areYouNew}
            />
            <View style={{marginTop: '5%'}} />
            <Button onPress={onLoginPress} title={strings.log_in} />
          </>
        )}
        {userData?.id !== Constants.GUEST_USER && (
          <Action
            onPress={onLogoutPress}
            icon={require('../../../assets/images/ic_logout.png')}
            title={strings.log_out}
            lineIcon={null}
          />
          // <Action
          //   onPress={isGuest ? onLoginPress : onLogoutPress}
          //   icon={
          //     isGuest ? null : require('../../../assets/images/ic_logout.png')
          //   }
          //   title={isGuest ? strings.log_in : strings.log_out}
          //   lineIcon={null}
          // />
        )}
      </View>
      {isLoading && loadingView()}

      {showLogOutAlert && (
        <AlertBox
          title={strings.logout}
          message={strings.areYouSureLogout}
          onPress={logoutHandler}
          buttonText={strings.yes}
          firstButtonText={strings.cancel}
          onPressFirstButton={() => setShowLogOutAlert(false)}
        />
      )}
    </View>
  );
};

export default Settings;
