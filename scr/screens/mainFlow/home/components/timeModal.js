import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import {Colors} from '../../../../constants';
const TimeModal = ({onBarPress, selected}) => {
  const renderButton = (val, text, icon) => {
    return (
      <TouchableOpacity
        onPress={() => onBarPress(val)}
        style={[
          styles.modalBtn,
          {
            backgroundColor:
              val === selected ? Colors.ORANGE.default : Colors.WHITE.default,
          },
        ]}>
        <Image
          style={[styles.iconSmall, {marginStart: '5%'}]}
          tintColor={
            val !== selected ? Colors.ORANGE.default : Colors.WHITE.default
          }
          source={icon}
        />
        <Text
          style={[
            styles.buttonText,
            {
              color:
                val !== selected ? Colors.ORANGE.default : Colors.WHITE.default,
            },
          ]}>
          {text}
        </Text>
        <View style={{flex: 1}} />
        {val === selected && (
          <Image
            style={[styles.iconSmall, {marginHorizontal: '5%'}]}
            source={require('../../../../assets/images/ic_checkbox.png')}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => onBarPress(null)}>
        <View style={styles.transparentView} />
      </TouchableWithoutFeedback>
      <View style={styles.modalCon}>
        <TouchableWithoutFeedback onPress={() => onBarPress(null)}>
          <View style={styles.barCon}>
            <View style={styles.bar} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonsCon}>
          {renderButton(
            20,
            'Within 20 minutes delivery',
            require('../../../../assets/images/ic_delivery.png'),
          )}
          <View style={{marginTop: '5%'}} />
          {renderButton(
            24,
            'Within 24 hours delivery',
            require('../../../../assets/images/ic_clock.png'),
          )}
        </View>
      </View>
    </>
  );
};

export default TimeModal;
