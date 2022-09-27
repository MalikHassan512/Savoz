import React, {useState} from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
import {Colors} from '../../../../constants';

const CheckOutButton = props => {
  const {onPress, title, isLoading, totalPrice, isDisabled} = props;

  return (
    <TouchableOpacity
      disabled={isLoading || isDisabled}
      onPress={onPress}
      style={styles.button}>
      <Text style={styles.selectedText}>{title}</Text>
      {isLoading ? (
        <ActivityIndicator color={Colors.WHITE.default} />
      ) : (
        <Text style={styles.selectedText}>$ {totalPrice.toFixed(2)}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CheckOutButton;
