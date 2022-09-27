import React from 'react';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import styles from './styles';

const Action = ({icon, title, lineIcon, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.actionContainer}>
        <View style={styles.action}>
          <Image style={styles.icon} source={icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        {lineIcon && <Image style={styles.lineIcon} source={lineIcon} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Action;
