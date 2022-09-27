import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';

const DropDown = props => {
  const [isFocus, setFocus] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const ref_input = useRef();
  const {isPass, title, onShowPassPress, onChangeItem, small, style, value} =
    props;

  const list = ['Mr', 'Miss', 'Other'];

  const onItemPress = item => {
    onChangeItem(item);
    setOpen(false);
  };

  return (
    <View style={[styles.container, small && {width: '48%'}, style]}>
      <View
        style={{
          paddingHorizontal: small ? '10%' : '5%',
          justifyContent: 'center',
        }}>
        <Text style={[styles.onBlurText, value.length > 0 && {opacity: 1}]}>
          {value.length > 0 ? value : title}
        </Text>
        <TouchableOpacity
          onPress={() => setOpen(!isOpen)}
          style={styles.downButton}>
          <Image
            style={[
              styles.downArrow,
              isOpen && {transform: [{rotate: '180deg'}]},
            ]}
            source={require('../../assets/images/ic_down_arrow.png')}
          />
        </TouchableOpacity>
      </View>

      {isOpen && (
        <View style={styles.listContainer}>
          <View style={styles.separator} />
          {list.map(item => {
            return (
              <TouchableOpacity key={item} onPress={() => onItemPress(item)}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DropDown;
