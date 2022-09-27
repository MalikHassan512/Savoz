import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import {Button, Header, InputField, DropDown, Alert} from '../../../components';
import styles from './styles';
import {signUpRequest} from '../../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {validateEmail, validatePassword} from '../../../store/util';
import useState from 'react-usestateref';
import PhoneInput from 'react-native-phone-input';
import strings from '../../../constants/strings';
import {Constants} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = props => {
  const {navigation} = props;
  const {userData, isLoading, errorMessage} = useSelector(
    state => state.reducer.auth,
  );

  const dispatch = useDispatch();

  const [title, setTitle] = useState('Mr');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setShowPassword] = useState(true);
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('country')
      .then(mCountry => {
        setCountry(mCountry);
      })
      .catch(err => {
        console.log('response (err) ===> ', JSON.stringify(err));
      });
    return () => {};
  }, []);

  useEffect(() => {
    setAlertMsg(errorMessage);
  }, [errorMessage]);

  const onSignUpPress = () => {
    let dataCheck = validateSignUpData();

    if (dataCheck !== true) {
      // alert(dataCheck);
      setAlertMsg(dataCheck);
      setShowAlert(true);
      return;
    }
    let params = {
      email: email,
      password: password,
      title: title,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      // roleId: Constants.USER_ROLE_ID,
    };

    dispatch(
      signUpRequest(params, res => {
        if (res === 'error') {
          setShowAlert(true);
          // setTimeout(() => {
          //   alert(alertRef.current);
          // }, 500);
        } else {
          navigation.navigate('Main');
        }
      }),
    );
  };

  const validateSignUpData = () => {
    let error = '';
    if (title === '') {
      error = strings.titleRequired;
    } else if (firstName.length < 2) {
      error = strings.firstNameRequired;
    } else if (lastName.length < 2) {
      error = strings.lastNameRequired;
    } else if (validateEmail(email) === null) {
      error = strings.enterValidEmail;
    } else if (phone.length < 12) {
      error = strings.phoneRequired;
    } else if (validatePassword(password) === false) {
      error = strings.passwordMinLength;
    }

    if (error.length > 0) {
      return error;
    } else {
      return true;
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'android' ? 'position' : 'padding'}
        keyboardVerticalOffset={Constants.CONST_KEYBOARD_VERTICAL_OFFSET}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.mainText}>{strings.signUp}</Text>
          {/*<DropDown*/}
          {/*  title={'Title'}*/}
          {/*  style={styles.inputField}*/}
          {/*  onChangeItem={item => setTitle(item)}*/}
          {/*  value={title}*/}
          {/*/>*/}
          <View style={styles.rowContainer}>
            <InputField
              small
              title={strings.firstName}
              style={styles.inputField}
              onChangeText={text => setFirstName(text)}
              value={firstName}
            />
            <InputField
              small
              title={strings.lastName}
              style={styles.inputField}
              onChangeText={text => setLastName(text)}
              value={lastName}
            />
          </View>
          <InputField
            keyboardType={'email-address'}
            title={strings.emailAddress}
            style={styles.inputField}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          {country.length > 1 && (
            <>
              <PhoneInput
                autoFormat={true}
                initialCountry={country.toLowerCase()}
                onChangePhoneNumber={setPhone}
                textProps={{
                  style: styles.inputStyle,
                  placeholder: strings.phoneNumber,
                  maxLength: 15,
                  color: '#000000',
                }}
                flagStyle={{height: 25, width: 35}}
                style={styles.phoneInputContainer}
              />
            </>
          )}

          <InputField
            title={strings.password}
            style={styles.inputField}
            isPass={true}
            hideInput={hidePassword}
            onShowPassPress={() => setShowPassword(!hidePassword)}
            onChangeText={text => setPassword(text)}
            value={password}
            onEnterPressed={onSignUpPress}
          />
          <Button
            onPress={onSignUpPress}
            title={strings.signUp}
            style={styles.buttonStyle}
            isLoading={isLoading}
          />
          <View style={{marginTop: '12%'}} />
          <View style={styles.bottomText}>
            <Text style={styles.signUpText}>
              {strings.haveAnAccount}
              <Text onPress={onSignInPress} style={styles.signUp}>
                {` ${strings.signIn}`}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Alert
          show={showAlert}
          message={alertRef.current}
          onPress={() => setShowAlert(false)}
      />
    </View>
  );
};

export default SignUp;
