//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Fonts from '../../../constants/Fonts';

// create a component
const RiderTip = () => {
  const [selected, setSelected] = useState(null);

  const onTipPressed = tip => {
    if (tip === selected) {
      setSelected(null);
    } else {
      setSelected(tip);
    }
  };

  const tips = [1, 5, 10, 15, 20];

  return (
    <View style={styles.container}>
      {tips.map(tip => {
        return (
          <TouchableOpacity
            key={tip}
            onPress={() => onTipPressed(tip)}
            style={[
              styles.tipContainer,
              tip === selected && {borderColor: '#E1552F'},
            ]}>
            <Text
              style={[styles.tipText, tip === selected && {color: '#E1552F'}]}>
              ${tip}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    // backgroundColor: 'red',
    // marginHorizontal: 24,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tipContainer: {
    borderRadius: 8,
    borderColor: '#3D3D3D',
    borderWidth: 1,
    height: 30,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    fontSize: 14,
    color: '#3D3D3D',
    fontFamily: Fonts.GILROY.Medium,
  },
});

//make this component available to the app
export default RiderTip;
