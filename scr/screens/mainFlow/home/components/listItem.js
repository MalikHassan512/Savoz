import React from 'react';
import {TouchableOpacity, Text, ImageBackground} from 'react-native';
import styles from './styles';

const ListItem = props => {
  const {onItemPress, categoryTitle, categoryImage} = props;
  return (
    <TouchableOpacity onPress={onItemPress} style={styles.listItemContainer}>
      <ImageBackground style={{flex: 1}} source={{uri: categoryImage}}>
        <Text style={styles.listItemText}>{categoryTitle}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ListItem;
