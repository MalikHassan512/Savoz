import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  // Alert,
} from 'react-native';
import {Button, Header, AccountItem, Alert} from '../../../components';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {placeOrderRequest, savePaymentMethod} from '../../../store/actions';
import {Colors, Constants, Fonts, width} from '../../../constants';
import PaymentScreen from './components/paymentScreen';
import useState from 'react-usestateref';
import {
  googleMapAPIKey,
  calculateTotalDiscount,
  calculateTotalTax,
} from '../../../store/util';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import strings from '../../../constants/strings';

const CheckOut = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const ref = useRef();
  const {
    currentCart,
    totalPrice,
    errorMessage,
    isLoading,
    orderType,
    settings,
  } = useSelector(state => state.reducer.cart);
  const {
    errorMessage: error,
    userData,
    userCards,
    orderAddresses,
  } = useSelector(state => state.reducer.profile);

  // console.log('user data: ', userData);

  const [promoCode, setPromoCode] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [isPickup, setIsPickup] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [address, setAddress] = useState(userData?.address || '');
  const [userLat, setUserLat] = useState(userData?.userLat || '');
  const [userLng, setUserLong] = useState(userData?.userLong || '');
  const [cards, setCards] = useState([]);
  const [subTotal, setSubTotal] = useState(totalPrice);
  const [taxAmount, setTaxAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAddressList, setShowAddressList] = useState(false);
  const [addressArray, setAddressArray] = useState([]);
  const [selectedAdd, setSelectedAdd] = useState(null);

  useEffect(() => {
    let userAdd = {
      orderDeliveryAddress: userData?.address,
      orderDeliveryLatLng: `${userData?.userLat},${userData?.userLong}`,
    };
    setSelectedAdd(userAdd);
    setAddressArray([userAdd, ...orderAddresses]);
  }, [orderAddresses]);

  useEffect(() => {
    console.log('ref is: ', ref);
    if (userData?.address) {
      ref.current.setAddressText(userData?.address);
    }
    // if (selectedAdd) {
    //   ref.current.setAddressText(selectedAdd);
    // }
    calculateTotal();
  }, []);

  useEffect(() => {
    setAlertMsg(error);
  }, [error]);

  useEffect(() => {
    setAlertMsg(errorMessage);
  }, [errorMessage]);

  const calculateTotal = () => {
    let tax = calculateTotalTax(currentCart);
    let dis = calculateTotalDiscount(currentCart);
    let total = totalPrice + tax - dis;
    setTaxAmount(tax);
    setDiscountAmount(dis);
    setTotalAmount(total);
  };

  const handlePlaceOrderPress = () => {
    // navigation.navigate('OrderPlaced');
    // return;

    if (deliveryMethod === 1 && address?.length < 5) {
      // alert(strings.pleaseProvideValidAddressToContinue);
      setAlertMsg(strings.pleaseProvideValidAddressToContinue);
      setShowAlert(true);
      return;
    } else if (userCards?.length < 1) {
      // alert(strings.pleaseAddCardForPayment);
      setAlertMsg(strings.pleaseAddCardForPayment);
      setShowAlert(true);
      return;
    }

    let prod = [];

    currentCart.forEach(item => {
      let temp = {
        productName: item.productItemName,
        productUnitPrice: item.productUnitPrice,
        productId: item.productId,
        quantity: item.purchaseQty,
        totalPrice: (item.productUnitPrice * item.purchaseQty).toFixed(2),
        totalTax: item?.productTaxPercentage || 0,
        // totalDiscount: item?.productDiscountAvailable || 0,
      };
      prod.push(temp);
    });

    if (currentCart?.length > 0) {
      let params = {
        cardId: userCards[selectedAccount].cardId,
        deliveryMethod:
          deliveryMethod === 1 ? Constants.DELIVERY : Constants.PICKUP,
        totalTax: taxAmount?.toFixed(2),
        totalPayable: totalAmount?.toFixed(2),
        discount: discountAmount?.toFixed(2),
        totalPrice: subTotal?.toFixed(2),
        orderType: orderType,
        paymentMethod: 'cc',
        deliveryLatLng: selectedAdd?.orderDeliveryLatLng,
        // deliveryLatLng: `${userLat},${userLng}`,
        // deliveryAddress: address,
        deliveryAddress: selectedAdd?.orderDeliveryAddress,
        products: prod,
      };
      dispatch(
        placeOrderRequest(params, res => {
          setLoading(false);
          if (res === 'error') {
            setTimeout(() => {
              setShowAlert(true);
            }, 500);
          } else {
            setShowPaymentModal(false);
            navigation.navigate('OrderPlaced');
          }
        }),
      );
    } else {
      setAlertMsg(strings.noProductInCart);
      setShowAlert(true);
    }
  };

  const saveCard = token => {
    setLoading(true);
    dispatch(
      savePaymentMethod({id: token}, res => {
        setLoading(false);
        if (res === 'error') {
          setShowAlert(true);
          // setTimeout(() => {
          //   alert(alertRef.current);
          // }, 500);
        } else {
          setShowPaymentModal(false);
        }
      }),
    );
  };

  const showInfo = () => {
    // Alert.alert(null, strings.youWillGetCashBack);
    setAlertMsg(strings.youWillGetCashBack);
    setShowAlert(true);
  };

  const updateSelectedAddress = () => {};

  const renderAddressList = () => {
    return (
      <View style={styles.addressDropDown}>
        {addressArray
          .filter(
            add =>
              add.orderDeliveryAddress !== selectedAdd.orderDeliveryAddress,
          )
          .map(add => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedAdd(add);
                  ref.current.setAddressText(add.orderDeliveryAddress);
                  setShowAddressList(false);
                }}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.bulletDot} />
                <Text numberOfLines={1} style={styles.dropDownAddressText}>
                  {add.orderDeliveryAddress}
                </Text>
              </TouchableOpacity>
            );
          })}
        {/*{addressArray.map(add => {*/}
        {/*  return (*/}
        {/*    <TouchableOpacity*/}
        {/*      style={{flexDirection: 'row', alignItems: 'center'}}>*/}
        {/*      <View style={styles.bulletDot} />*/}
        {/*      <Text numberOfLines={1} style={styles.dropDownAddressText}>*/}
        {/*        {add.orderDeliveryAddress}*/}
        {/*      </Text>*/}
        {/*    </TouchableOpacity>*/}
        {/*  );*/}
        {/*})}*/}
      </View>
    );
  };

  const renderAddressView = () => {
    return (
      <View style={{paddingHorizontal: '5%'}}>
        <Text style={styles.textDelivery}>{strings.deliveryAddress}</Text>
        <View style={styles.addressContainer}>
          <Image
            style={styles.icon}
            source={require('../../../assets/images/ic_location.png')}
          />
          <GooglePlacesAutocomplete
            ref={ref}
            styles={{
              textInputContainer: {
                // backgroundColor: 'grey',
              },
              textInput: {
                height: 38,
                color: Colors.BLACK.default,
                fontFamily: Fonts.GILROY.Medium,
                fontSize: 16,
              },
            }}
            // textInputProps={{onChange: setAddress}}
            enablePoweredByContainer={false}
            placeholder={strings.enterAddressHere}
            onPress={(data, details = null) => {
              let lat = details?.geometry?.location.lat;
              let long = details?.geometry?.location.lng;
              let add = {
                orderDeliveryAddress: data.description,
                orderDeliveryLatLng: `${lat},${long}`,
              };
              const userLocation = {
                latitude: lat,
                longitude: long,
              };
              setAddress(data.description);
              setUserLat(userLocation.latitude);
              setUserLong(userLocation.longitude);
              setSelectedAdd(add);
            }}
            fetchDetails={true}
            query={{
              key: googleMapAPIKey,
              language: 'en',
            }}
          />

          {orderAddresses.length > 0 && (
            <TouchableOpacity
              onPress={() => setShowAddressList(!showAddressList)}
              style={styles.dropButton}>
              <Image
                style={[
                  styles.downArrow,
                  showAddressList && {transform: [{rotate: '180deg'}]},
                ]}
                source={require('../../../assets/images/ic_down_arrow.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        {showAddressList && renderAddressList()}
      </View>
    );
  };

  const renderPromoCodeView = () => {
    return (
      <View style={styles.codeContainer}>
        <TextInput
          maxLength={20}
          style={[styles.textMedium, {flex: 1}]}
          onChangeText={setPromoCode}
          placeholder={strings.enterPromoCodeHere}
          placeholderStyle={styles.placeHolderText}
          placeholderTextColor={Colors.GRAY.default}
          value={promoCode}
        />
        <TouchableOpacity>
          <Text style={styles.textSemiBold}>{strings.apply}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderOrderSummaryView = () => {
    return (
      <View style={styles.orderSummaryContainer}>
        <Text style={[styles.textSemiBold, {fontSize: 16}]}>
          {strings.orderSummary}
        </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.textMedium}>{strings.subTotal}</Text>
          <Text style={styles.textMedium}>$ {subTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textMedium}>{strings.taxes}</Text>
          <Text style={styles.textMedium}>$ {taxAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textMedium}>{strings.discounts}</Text>
          <Text style={styles.textMedium}>$ {discountAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textSemiBold}>{strings.total}</Text>
          <Text style={styles.textSemiBold}>$ {totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  const renderDeliveryMethodView = () => {
    return (
      <View style={styles.deliveryMethodContainer}>
        <Text style={styles.textSemiBold}>Delivery Method</Text>
        {/*<View style={[styles.rowContainer, {marginTop: 0}]}>*/}
        {/*  <View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
        {/*    <TouchableOpacity onPress={() => setIsPickup(false)}>*/}
        {/*      <Image*/}
        {/*        style={styles.checkIcon}*/}
        {/*        source={*/}
        {/*          isPickup*/}
        {/*            ? require('../../../assets/images/ic_uncheck.png')*/}
        {/*            : require('../../../assets/images/ic_check.png')*/}
        {/*        }*/}
        {/*      />*/}
        {/*    </TouchableOpacity>*/}
        {/*    <Text>Delivery</Text>*/}
        {/*  </View>*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      flexDirection: 'row',*/}
        {/*      alignItems: 'center',*/}
        {/*      marginStart: 30,*/}
        {/*    }}>*/}
        {/*    <TouchableOpacity onPress={() => setIsPickup(true)}>*/}
        {/*      <Image*/}
        {/*        style={styles.checkIcon}*/}
        {/*        source={*/}
        {/*          isPickup*/}
        {/*            ? require('../../../assets/images/ic_check.png')*/}
        {/*            : require('../../../assets/images/ic_uncheck.png')*/}
        {/*        }*/}
        {/*      />*/}
        {/*    </TouchableOpacity>*/}
        {/*    <Text>Pickup</Text>*/}
        {/*  </View>*/}
        {/*  <View style={{flex: 1}} />*/}
        {/*</View>*/}

        <View>
          <View style={[styles.rowContainer, {marginTop: 0}]}>
            <TouchableOpacity
              onPress={() => setDeliveryMethod(0)}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setDeliveryMethod(0)}>
                <Image
                  style={styles.checkIcon}
                  source={
                    deliveryMethod === 0
                      ? require('../../../assets/images/ic_check.png')
                      : require('../../../assets/images/ic_uncheck.png')
                  }
                />
              </TouchableOpacity>
              <Text style={styles.mediumText}>{strings.pickup}</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={showInfo}>
                <Image
                  style={styles.checkIcon}
                  source={require('../../../assets/images/ic_info.png')}
                />
              </TouchableOpacity>
              <Text style={styles.mediumText}>{strings.cashBack}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setDeliveryMethod(1)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: -10,
            }}>
            <TouchableOpacity onPress={() => setDeliveryMethod(1)}>
              <Image
                style={styles.checkIcon}
                source={
                  deliveryMethod === 1
                    ? require('../../../assets/images/ic_check.png')
                    : require('../../../assets/images/ic_uncheck.png')
                }
              />
            </TouchableOpacity>
            <Text style={styles.mediumText}>{strings.doorSteps}</Text>
            <Text
              style={[
                styles.mediumText,
                {color: Colors.GREEN.default},
              ]}>{` (${strings.free})`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderPaymentMethodView = () => {
    return (
      <View style={styles.deliveryMethodContainer}>
        <Text style={styles.textSemiBold}>{strings.paymentMethod}</Text>
        <TouchableOpacity onPress={() => setShowPaymentModal(true)}>
          <Text style={styles.addCardText}>{strings.addCardForPayment}</Text>
        </TouchableOpacity>
        {userCards.map((cc, index) => (
          <AccountItem
            key={index}
            title={`${cc.brand} ${cc.type}`}
            account={`**** ${cc.last4}`}
            icon={require('../../../assets/images/ic_cards.png')}
            onPress={() => {
              setSelectedAccount(index);
            }}
            isSelected={index === selectedAccount}
          />
        ))}
      </View>
    );
  };

  const lowAmountAlert = () => {
    return (
      <View style={styles.lowAmountAlertBox}>
        <Image
          style={[styles.checkIcon, {tintColor: Colors.ORANGE.default}]}
          source={require('../../../assets/images/ic_alert.png')}
        />
        <Text style={[styles.textMedium, {width: '90%'}]}>
          {strings.minimumOrderStart}
          {settings?.minOrderLimit}
          {strings.minimumOrderEnd}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header title={strings.checkOut} />
      {renderAddressView()}
      <ScrollView style={styles.scrollViewStyle}>
        {renderPromoCodeView()}
        {subTotal < settings?.minOrderLimit && lowAmountAlert()}
        {renderOrderSummaryView()}
        {renderDeliveryMethodView()}
        {renderPaymentMethodView()}
        <View style={{marginBottom: 30}} />
        <View style={{marginBottom: 30}} />
      </ScrollView>
      {showPaymentModal && (
        <PaymentScreen
          onCardAdded={cc => setCards([...cards, cc])}
          saveCard={tok => saveCard(tok)}
          isLoading={loading}
          onClosePress={() => setShowPaymentModal(false)}
        />
      )}
      <View style={{alignSelf: 'center', marginBottom: 30}}>
        <Button
          isDisabled={subTotal < 30}
          onPress={handlePlaceOrderPress}
          title={strings.placeOrder}
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

export default CheckOut;
