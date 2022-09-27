import React from 'react';
import {View, Image} from 'react-native';
import {height, width} from '../../constants';

const BottomTabBG = () => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        height: '10%',
        width: width,
      }}>
      <Image
        style={{
          resizeMode: 'stretch',
          height: height * 0.1,
          width: width,
          alignSelf: 'center',
        }}
        source={require('../../assets/images/tabBar.png')}
      />
    </View>
  );
};

export default BottomTabBG;
