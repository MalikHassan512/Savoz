import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text, TextInput, Image} from 'react-native';
import styles from './styles';
import {Colors} from '../../constants';

const InputField = props => {
  const [isFocus, setFocus] = useState(props?.value?.length > 0 ? true : false);
  let ref_input = useRef(null);
  const {
    isPass,
    hideInput,
    title,
    onShowPassPress,
    onChangeText,
    placeholder,
    small,
    style,
    keyboardType,
    value,
    readOnly,
    onEnterPressed,
  } = props;

  const onFocus = () => {
    setFocus(true);
  };
  const onBlurCall = () => {
    if (value.trim().length === 0) {
      setFocus(false);
    }
  };

  return (
    <View style={[styles.container, small && {width: '48%'}, style]}>
      {isFocus && !readOnly && <Text style={styles.titleText}>{title}</Text>}
      <TextInput
        autoCapitalize="none"
        keyboardType={keyboardType}
        editable={!readOnly}
        style={[
          styles.textInput,
          readOnly && {color: 'rgba(0, 0, 0, 0.6)'},
          !isFocus && {flex: 1},
        ]}
        secureTextEntry={isPass && hideInput}
        onChangeText={onChangeText}
        placeholder={!isFocus ? (value ? value : title) : ''}
        placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
        onBlur={onBlurCall}
        onFocus={onFocus}
        value={value}
        onSubmitEditing={onEnterPressed ? onEnterPressed : null}
      />
      {isPass && (
        <TouchableOpacity onPress={onShowPassPress} style={[styles.showPass]}>
          <Image
            style={styles.eyeIcon}
            source={require('../../assets/images/ic_eye.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
