import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import styles from './styles';
import {Button} from '../../../components';
import strings from '../../../constants/strings';

const OrderPlaced = props => {
  const {navigation} = props;

  const backToHome = () => {
    navigation.popToTop();
    navigation.navigate('HomeTab');
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Image
        style={styles.bgImage}
        source={require('../../../assets/images/order_placed.png')}
      />

      <Text style={styles.textStyle}>{strings.yourOrderHasBeenAccepted}</Text>
      <Text style={styles.textSmall}>{strings.yourItemsHasBeenPlaced}</Text>

      <View style={styles.bottomContainer}>
        <Button
          onPress={() => {
            navigation.popToTop();
            navigation.navigate('OrdersTab');
          }}
          style={{alignSelf: 'center'}}
          title={strings.trackYourOrder}
        />
        <TouchableOpacity onPress={backToHome}>
          <Text style={styles.backText}>{strings.backToHome}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderPlaced;
