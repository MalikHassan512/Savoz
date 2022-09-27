import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';
import {Button} from '../index';
import strings from '../../constants/strings';
import {Fonts} from '../../constants';

const AlertBox = props => {
  const {
    title,
    message,
    onPress,
    onClosePress,
    buttonText,
    firstButtonText,
    onPressFirstButton,
  } = props;

  return (
    <View style={styles.absoluteScreen}>
      <View style={styles.alertBody}>
        <Text style={styles.textBold}>{title}</Text>
        <Text style={styles.textDescription}>{message}</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={onPressFirstButton}
            small
            white
            title={firstButtonText}
          />
          <Button onPress={onPress} small title={buttonText} />
        </View>
        {onClosePress && (
          <TouchableOpacity
            onPress={onClosePress}
            style={styles.closeIconButton}>
            {/*<Image*/}
            {/*  style={styles.crossIcon}*/}
            {/*  source={require('../../assets/images/ic_minus.png')}*/}
            {/*/>*/}
            <Text style={styles.xText}>x</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AlertBox;
