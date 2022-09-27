import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button, Header, InputField, Alert} from '../../../components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {newPasswordRequest, validateResetToken} from '../../../store/actions';
import useState from 'react-usestateref';
import strings from '../../../constants/strings';

const ResetPassword = props => {
  const dispatch = useDispatch();
  const {navigation, route} = props;

  const {isLoading, errorMessage} = useSelector(state => state.reducer.auth);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setAlertMsg(errorMessage);
  }, [errorMessage]);

  const onResetPassPress = () => {
    let errorMsg = '';
    if (password === '') {
      errorMsg = strings.pleaseEnterPassword;
    } else if (confirmPassword === '') {
      errorMsg = strings.enterConfirmPassword;
    } else if (password.length < 8) {
      errorMsg = strings.passwordMinLength;
    } else if (password !== confirmPassword) {
      errorMsg = strings.confirmPassNotMatch;
    }

    if (errorMsg !== '') {
      setAlertMsg(errorMsg);
      setShowAlert(true);
      return;
    }

    let params = {
      id: route.params.id,
      token: route.params.token,
    };
    dispatch(
      validateResetToken(params, res => {
        if (res === 'error') {
          setShowAlert(true);
        } else {
          let params = {
            userId: res.data.userId,
            token: res.data.token,
            password: password,
          };

          dispatch(
            newPasswordRequest(params, res => {
              if (res === 'error') {
                setAlertMsg(alertRef.current);
                setShowAlert(true);
              } else {
                setAlertMsg(strings.passwordUpdated);
                  setShowAlert(true);
              }
            }),
          );
        }
      }),
    );
  };

  const alertOnPress = () => {
    setShowAlert(false);
    if (alertRef.current === strings.passwordUpdated) {
      navigation.navigate('SignIn');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.mainText}>Create New Password</Text>
      <Text style={styles.infoText}>
        Enter new password & it must be different from previous passwords
      </Text>

      <InputField
        title={strings.password}
        style={styles.inputField}
        isPass={true}
        hideInput={hidePass1}
        onShowPassPress={() => setHidePass1(!hidePass1)}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <InputField
        title={strings.confirmPassword}
        style={styles.inputField}
        isPass={true}
        hideInput={hidePass2}
        onShowPassPress={() => setHidePass2(!hidePass2)}
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <View style={styles.bottomContainer}>
        <Button
          isLoading={isLoading}
          onPress={onResetPassPress}
          title={strings.resetPassword}
          style={styles.inputField}
        />
      </View>
      <Alert
        show={showAlert}
        message={alertRef.current}
        onPress={alertOnPress}
      />
    </View>
  );
};

export default ResetPassword;
