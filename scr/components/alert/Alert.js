import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';
import {Button} from '../index';
import strings from '../../constants/strings';
import {Colors, Fonts} from '../../constants';

const Alert = props => {
  const {title, message, onPress, buttonText, show} = props;

  if (show) {
    return (
      <View style={styles.absoluteScreen}>
        <View style={[styles.alertBody, {width: '80%'}]}>
          <Text style={[styles.textBold, {color: Colors.ORANGE.default}]}>
            {title || 'Alert'}
          </Text>
          <Text style={styles.textDescription}>{message}</Text>
          <Button
            style={styles.alertButton}
            onPress={onPress}
            small
            title={buttonText || 'OK'}
          />
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default Alert;
