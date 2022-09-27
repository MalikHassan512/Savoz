import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Alert, BottomTabBG, Button, Header} from '../../../components';
import styles from './styles';
import ActiveOrders from './components/activeOrder';
import PreviousOrders from './components/previousOrder';
import {Colors, Constants, IS_IPHONE_X} from '../../../constants';
import strings from '../../../constants/strings';
import {useDispatch, useSelector} from 'react-redux';
import {getAllOrders} from '../../../store/actions';
import useState from 'react-usestateref';

const Orders = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.reducer.auth);
  const {isLoading, errorMessage, myOrders} = useSelector(
    state => state.reducer.cart,
  );
  const [isActiveOrder, setIsActiveOrder] = useState(1);
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setAlertMsg(errorMessage);
  }, [errorMessage]);

  // useEffect(() => {
  //   console.log('my order list is: ', myOrders);
  // }, [myOrders]);

  useEffect(() => {
    if (userData?.id === Constants.GUEST_USER) {
      return;
    }
    dispatch(
      getAllOrders({}, res => {
        if (res === 'error') {
          setShowAlert(true);
          // setTimeout(() => {
          //   alert(alertRef.current);
          // }, 500);
        } else {
          //  Success case
        }
      }),
    );
  }, []);

  const renderHeader = () => {
    return (
      <>
        <View style={[styles.orderHeaderCon, styles.shadow]}>
          <View style={styles.orderBtnCon}>
            <TouchableOpacity
              onPress={() => setIsActiveOrder(1)}
              style={[
                styles.OrderBtn,
                {
                  backgroundColor:
                    isActiveOrder === 1
                      ? Colors.ORANGE.default
                      : Colors.WHITE.default,
                },
              ]}>
              <Text
                style={[
                  styles.orderBtnText,
                  {
                    color:
                      isActiveOrder === 1
                        ? Colors.WHITE.default
                        : Colors.BLACK.default,
                  },
                ]}>
                Active Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsActiveOrder(2)}
              style={[
                styles.OrderBtn,
                {
                  backgroundColor:
                    isActiveOrder === 2
                      ? Colors.ORANGE.default
                      : Colors.WHITE.default,
                },
              ]}>
              <Text
                style={[
                  styles.orderBtnText,
                  {
                    color:
                      isActiveOrder === 2
                        ? Colors.WHITE.default
                        : Colors.BLACK.default,
                  },
                ]}>
                Previous Orders
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const renderActiveOrders = () => {
    return <>{myOrders?.length > 0 && <ActiveOrders data={myOrders} />}</>;
  };

  const renderPreviousOrders = () => {
    return <>{myOrders?.length > 0 && <PreviousOrders data={myOrders} />}</>;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header title={strings.myOrders} />

      {renderHeader()}
      <ScrollView style={{flex: 1}}>
        <View style={styles.screeMargin}>
          {isLoading && (
            <ActivityIndicator
              color={Colors.ORANGE.default}
              style={{marginTop: 20}}
            />
          )}
          {userData?.id !== Constants.GUEST_USER && isActiveOrder === 1
            ? renderActiveOrders()
            : renderPreviousOrders()}
          <View style={{marginBottom: 20}} />
        </View>
        <View style={{paddingBottom: IS_IPHONE_X ? '24%' : '20%'}} />
      </ScrollView>
      <BottomTabBG />
      <Alert
        show={showAlert}
        message={alertRef.current}
        onPress={() => setShowAlert(false)}
      />
    </View>
  );
};

export default Orders;
