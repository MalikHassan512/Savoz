import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Alert, Button, Header, InputField} from '../../../components';
import styles from './styles';
import {validateEmail, validatePassword} from '../../../store/util';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../../../store/actions';
import useState from 'react-usestateref';
import strings from '../../../constants/strings';
import {Constants} from '../../../constants';

const SignIn = props => {
  const dispatch = useDispatch();

  const {userData, isLoading, errorMessage} = useSelector(
    state => state.reducer.auth,
  );
  const {navigation} = props;

  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setShowPassword] = useState(true);

  useEffect(() => {
    setAlertMsg(errorMessage);
  }, [errorMessage]);

  const onSignInPress = () => {
    if (email === '') {
      // alert(strings.emailRequired);
      setAlertMsg(strings.emailRequired);
      setShowAlert(true);
      return;
    } else if (validateEmail(email) === null) {
      // alert(strings.enterValidEmail);
      setAlertMsg(strings.enterValidEmail);
      setShowAlert(true);
      return;
    } else if (validatePassword(password) === false) {
      // alert(strings.passwordMinLength);
      setAlertMsg(strings.passwordMinLength);
      setShowAlert(true);
      return;
    }

    let params = {email: email, password: password};

    dispatch(
      loginRequest(params, res => {
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
  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };
  const onForgotPassPress = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'android' ? 'position' : 'padding'}
        keyboardVerticalOffset={Constants.CONST_KEYBOARD_VERTICAL_OFFSET}>
        <Text style={styles.mainText}>{strings.signIn}</Text>
        <InputField
          title={strings.emailPlaceHolder}
          style={styles.inputField}
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType={'email-address'}
        />
        <InputField
          title={strings.password}
          style={styles.inputField}
          isPass={true}
          hideInput={hidePassword}
          onShowPassPress={() => setShowPassword(!hidePassword)}
          onChangeText={text => setPassword(text)}
          onEnterPressed={onSignInPress}
          value={password}
        />
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={onForgotPassPress}>
          <Text style={styles.forgotText}>{strings.forgotPass}</Text>
        </TouchableOpacity>

        <Button
          onPress={onSignInPress}
          title={strings.login}
          style={styles.inputField}
          isLoading={isLoading}
        />

        <View style={{marginTop: '12%'}} />

        <View style={styles.bottomText}>
          <Text style={styles.signUpText}>
            {strings.dontHaveAnAccount}
            <Text onPress={onSignUpPress} style={styles.signUp}>
              {` ${strings.signUp}`}
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
      <Alert
          show={showAlert}
          message={alertRef.current}
          onPress={() => setShowAlert(false)}
      />
    </View>
  );
};

export default SignIn;
