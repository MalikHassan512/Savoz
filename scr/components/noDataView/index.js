import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const NoDataView = props => {
  const {text} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

export default NoDataView;
