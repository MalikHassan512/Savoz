import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {Colors} from '../../../../constants';
const AddressBar = props => {
  const {timeBarPress, filter, address, getCurrentLocation} = props;
  return (
    <View style={styles.addressBarContainer}>
      <TouchableOpacity
        // onPress={getCurrentLocation}
        disabled={true}
        style={{padding: 10}}>
        <Image
          style={[styles.iconSmall, {tintColor: Colors.ORANGE.default}]}
          source={require('../../../../assets/images/ic_location.png')}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.addressText}>
        {address}
      </Text>

      <View style={{flex: 1}} />
      <TouchableOpacity onPress={timeBarPress} style={styles.addBarOrangeBox}>
        <Image
          style={styles.iconSmall}
          source={require('../../../../assets/images/ic_delivery.png')}
        />
        <Text style={styles.timeText}>{`${filter}\n${
          filter === 20 ? 'mins' : 'hrs'
        }`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressBar;
