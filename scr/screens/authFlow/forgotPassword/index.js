import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Alert, Button, Header, InputField} from '../../../components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordRequest} from '../../../store/actions';
import {validateEmail} from '../../../store/util';
import useState from 'react-usestateref';
import strings from '../../../constants/strings';

const ForgotPassword = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const {isLoading, errorMessage} = useSelector(state => state.reducer.auth);

  const [email, setEmail] = useState('');
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setAlertMsg(errorMessage);
  }, [errorMessage]);

  const onSendLinkPress = () => {
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
    }

    let params = {
      email: email,
    };

    dispatch(
      resetPasswordRequest(params, res => {
        if (res === 'error') {
          setShowAlert(true);
          // setTimeout(() => {
          //   alert(alertRef.current);
          // }, 500);
        } else {
          console.log('res: ', res);
          // alert(res.message);
          setAlertMsg(res.message);
          setShowAlert(true);
        }
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.mainText}>Reset Password</Text>
      <Text style={styles.infoText}>
        Enter your registered email, We will send link to change your password
      </Text>
      <InputField
        title={strings.emailAddress}
        style={styles.inputField}
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType={'email-address'}
      />
      <View style={styles.bottomContainer}>
        <Button
          onPress={onSendLinkPress}
          title={strings.sendLink}
          style={styles.inputField}
          isLoading={isLoading}
        />
      </View>
      <Alert
        show={showAlert}
        message={alertRef.current}
        onPress={() => setShowAlert(false)}
      />
    </View>
  );
};

export default ForgotPassword;
