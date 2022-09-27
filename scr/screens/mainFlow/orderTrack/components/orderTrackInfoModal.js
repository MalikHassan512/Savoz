//import liraries
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import TimeToDeliver from './timeToDeliever';
import ContactToPerson from './contactToPerson';
import Button from '../../../../components/button';
import strings from '../../../../constants/strings';
// create a component
const OrderTrackInfoModal = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={require('../../../../assets/images/topModalLine.png')}
          style={styles.topLineStyle}
        />
      </View>
      <TimeToDeliver />
      <ContactToPerson />

      <View style={styles.btnView}>
        <Button title={strings.cancelOrder} />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '44%',
    backgroundColor: 'white',
    borderTopEndRadius: 32,
    borderTopLeftRadius: 32,
    // height: 340,
  },
  imageView: {alignSelf: 'center', justifyContent: 'center', marginTop: 24},
  topLineStyle: {width: 60, height: 4},
  btnView: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    marginHorizontal: 16,
  },
});

export default OrderTrackInfoModal;
