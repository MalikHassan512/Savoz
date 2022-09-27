import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {Alert, Button} from '../../../components';
import styles from './styles';
import {guestLoginRequest} from '../../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../constants';
import useState from 'react-usestateref';
import strings from '../../../constants/strings';

const Landing = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {isLoading, errorMessage} = useSelector(state => state.reducer.auth);
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setAlertMsg(errorMessage);
  }, [errorMessage]);

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };
  const onLoginPress = () => {
    navigation.navigate('SignIn');
  };
  const guestLogin = () => {
    dispatch(
      guestLoginRequest(res => {
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
      <SafeAreaView />
      <Image
        style={styles.bgImage}
        source={require('../../../assets/images/bg_landing.png')}
      />
      <Text style={styles.mainText}>{strings.landingText}</Text>
      <Text style={styles.infoText}>{strings.enterNewPassword}</Text>

      <View style={styles.bottomContainer}>
        <View style={styles.btnContainer}>
          <Button title={'Login'} small onPress={onLoginPress} />
          <Button title={'Sign up'} small white onPress={onSignUpPress} />
        </View>
        <TouchableOpacity onPress={guestLogin}>
          <Text style={styles.guestText}>{strings.continueAsGuest}</Text>
        </TouchableOpacity>
      </View>

      {isLoading && loadingView()}
      <Alert
        show={showAlert}
        message={alertRef.current}
        onPress={() => setShowAlert(false)}
      />
    </View>
  );
};

export default Landing;
