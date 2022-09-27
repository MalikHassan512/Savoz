import React, {useState} from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
import {Colors} from '../../constants';

const Button = props => {
  const {small, white, onPress, title, isLoading, style, isDisabled} = props;
  const [disable, setDisable] = useState(false);

  const buttonPress = () => {
    const {onPress} = props;
    setDisable(true);
    onPress && onPress();
    setTimeout(() => {
      setDisable(false);
    }, 1000);
  };

  return (
    <TouchableOpacity
      disabled={isLoading || isDisabled}
      onPress={buttonPress}
      style={[
        styles.button,
        small && styles.small,
        white && styles.white,
        style,
      ]}>
      {isLoading ? (
        <ActivityIndicator
          color={white ? Colors.ORANGE.default : Colors.WHITE.default}
        />
      ) : (
        <Text style={[styles.selectedText, white && styles.whiteBtnText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
