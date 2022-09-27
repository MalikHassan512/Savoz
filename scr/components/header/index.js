import React, {useState} from 'react';
import {TouchableOpacity, Text, View, SafeAreaView, Image} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const {onPress, title, backIconStyle} = props;
  const navigation = useNavigation();
  const [disable, setDisable] = useState(false);

  const handleBackPress = () => {
    if (disable) {
      return;
    }
    if (onPress) {
      setDisable(true);
      onPress();
    } else {
      setDisable(true);
      navigation.goBack();
    }
    setTimeout(() => {
      setDisable(false);
    }, 500);
  };
  return (
    <View>
      <SafeAreaView />
      <View style={styles.container}>
        <TouchableOpacity
          disabled={disable}
          onPress={handleBackPress}
          style={styles.backButton}>
          <Image
            style={[styles.backIcon, backIconStyle]}
            source={require('../../assets/images/ic_back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.backButton} />
      </View>
    </View>
  );
};

export default Header;
