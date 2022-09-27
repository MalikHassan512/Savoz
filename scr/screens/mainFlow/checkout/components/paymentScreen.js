// PaymentScreen.ts
import React, {useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {CardField, useStripe, CardForm} from '@stripe/stripe-react-native';
import {Colors, Fonts, height} from '../../../../constants';
import {Alert, Button} from '../../../../components';
import strings from '../../../../constants/strings';

export default function PaymentScreen(props) {
  const {confirmPayment, createToken, createPaymentMethod} = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const {onClosePress, isLoading, saveCard, onCardAdded} = props;
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const addCard = () => {
    setLoading(true);
    let params = {
      type: 'Card',
    };
    createPaymentMethod(params)
      .then(res => {
        console.log('createPaymentMethod response is: ', res);
        if (res?.error) {
          // alert(res.error?.message);
          setAlertMsg(res.error?.message);
          setShowAlert(true);
        } else {
          onCardAdded(res.paymentMethod.Card);
          saveCard(res.paymentMethod.id);
        }
        setLoading(false);
      })
      .catch(e => {
        // alert(e?.error?.message);
        setLoading(false);
        // alert('Card not Added. Please try again\n');
        console.log('createPaymentMethod error: ', e);
      });
  };

  return (
    <Modal transparent={true}>
      <View style={styles.cardInputModal}>
        <ScrollView style={{flex: 1}}>
          <TouchableOpacity
            onPress={onClosePress}
            style={{alignSelf: 'flex-end', padding: 20}}>
            <Image
              style={styles.downArrow}
              source={require('../../../../assets/images/ic_down_arrow.png')}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>{strings.pleaseEnterCardDetails}</Text>
            {showDone && (
              <TouchableOpacity
                disabled={isLoading || loading}
                onPress={addCard}
                style={styles.doneBtn}>
                <Text style={styles.doneText}>{strings.done}</Text>
              </TouchableOpacity>
            )}
          </View>
          <CardForm
            postalCodeEnabled={false}
            // backgroundColor={'red'}
            placeholder={{
              number: strings.cardPlaceHolder,
            }}
            // cardStyle={{
            //   backgroundColor: Colors.WHITE.default,
            //   textColor: Colors.BLACK.default,
            // }}
            style={{
              width: '95%',
              height: Platform.OS === 'android' ? height * 0.4 : height * 0.25,
              marginVertical: 30,
              alignSelf: 'center',
            }}
            onFormComplete={card => {
              setCardDetails(card);
              setShowDone(true);
              Platform.OS === 'ios' && Keyboard.dismiss();
              console.log('complete card: ', card);
            }}
            onCardChange={cardDetails => {
              console.log('cardDetails: ', cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
          <Button
            isLoading={isLoading || loading}
            onPress={addCard}
            style={styles.buttonStyle}
            title={strings.done}
          />
        </ScrollView>
      </View>
      <Alert
        show={showAlert}
        message={alertMsg}
        onPress={() => setShowAlert(false)}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  cardInputModal: {
    // backgroundColor: 'balck',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.BORDER.light,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.WHITE.default,
    width: '99%',
    paddingBottom: height * 0.05,
    height: Platform.OS === 'ios' ? height * 0.8 : height * 0.7,
    shadowColor: Colors.BLACK.default,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  text: {
    fontFamily: Fonts.GILROY.Medium,
    paddingLeft: 10,
    fontSize: 18,
  },
  buttonStyle: {
    // position: 'absolute',
    alignSelf: 'center',
    bottom: height * 0.05,
  },
  downArrow: {
    tintColor: Colors.GRAY.default,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  doneBtn: {
    position: 'absolute',
    // paddingTop: 20,
    // paddingLeft: 15,
    paddingRight: 25,
    paddingVertical: 5,
    right: 0,
    // backgroundColor: 'red',
  },
  doneText: {
    color: Colors.BLACK.default,
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 14,
  },
});
