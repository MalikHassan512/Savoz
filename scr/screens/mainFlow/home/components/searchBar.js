import React from 'react';
import {View, TouchableOpacity, Image, TextInput} from 'react-native';
import styles from './styles';
import strings from '../../../../constants/strings';
import {Colors} from '../../../../constants';
const SearchBar = props => {
  const {onChangeText, searchText, style, onBlur, onFocus} = props;
  return (
    <View style={[styles.addressBarContainer, styles.searchContainer, style]}>
      <TextInput
        autoFocus={true}
        style={styles.searchInput}
        onChangeText={onChangeText}
        placeholder={strings.searchHere}
        placeholderStyle={styles.placeHolderText}
        placeholderTextColor={Colors.GRAY.default}
        onBlur={onBlur}
        onFocus={onFocus}
        value={searchText}
      />
      <TouchableOpacity>
        <Image
          style={styles.iconSmall}
          source={require('../../../../assets/images/ic_search.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
