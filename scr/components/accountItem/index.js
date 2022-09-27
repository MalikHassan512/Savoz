import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import styles from './styles';

const AccountItem = props => {
  const {title, icon, account, isSelected, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.paymentItem}>
      <Image style={styles.paymentIcon} source={icon} />
      <View style={{borderWidth: 0}}>
        <Text style={[styles.textSemiBold, {fontSize: 16, marginTop: 0}]}>
          {title}
        </Text>
        <Text style={[styles.textMedium, {fontSize: 12, opacity: 0.6}]}>
          {account}
        </Text>
      </View>
      <View style={{flex: 1}} />
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.checkIcon}
          source={
            isSelected
              ? require('../../assets/images/ic_check_round.png')
              : require('../../assets/images/ic_uncheck_round.png')
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default AccountItem;
