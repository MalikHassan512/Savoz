import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
    Platform
} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors} from '../../constants';
import FastImage from 'react-native-fast-image';

const CategoryCardView = ({type, data, index, onPress}) => {
  // categoryTitle={item?.subCategoryName}
  // categoryImage={item?.subCategoryImage}
  // console.log('data image: ', data?.subCategoryImage);

  let i = index;
  let bgColor = Colors.BACKGROUND.orange;
  let imageWidth = '100%';

  let imageArray = [
    require('../../assets/images/demo/01.png'),
    require('../../assets/images/demo/02.png'),
    require('../../assets/images/demo/03.png'),
    require('../../assets/images/demo/04.png'),
    require('../../assets/images/demo/05.png'),
    require('../../assets/images/demo/06.png'),
    require('../../assets/images/demo/07.png'),
    require('../../assets/images/demo/08.png'),
    require('../../assets/images/demo/09.png'),
    require('../../assets/images/demo/10.png'),
  ];

  if (type === 0) {
    imageWidth = '80%';
  }
  // else if (type === 3 || type === 4) {
  //   imageWidth = '90%';
  // }

  do {
    if (i > 9) {
      i = i - 10;
    }
  } while (i > 9);

  if (i === 0 || i === 1 || i === 7) {
    bgColor = Colors.BACKGROUND.green;
  } else if (i === 2 || i === 3 || i === 8 || i === 9) {
    bgColor = Colors.BACKGROUND.silver;
  }

  let demoImage = imageArray[i];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: bgColor}]}>
      <ImageBackground
        resizeMode={'contain'}
        // resizeMode={Platform.OS === 'ios' ? 'contain' : 'center'}
        style={{flex: 1}}
        source={demoImage}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{data?.subCategoryName}</Text>
        </View>

        {/*<View style={styles.imageContainer}>*/}
        {/*  <FastImage*/}
        {/*    resizeMode={'cover'}*/}
        {/*    source={require('../../assets/images/img_meat.png')}*/}
        {/*    // source={{uri: data?.subCategoryImage}}*/}
        {/*    style={[styles.image, {width: imageWidth}]}*/}
        {/*    // fallback*/}
        {/*    // defaultSource={require('../../assets/images/imgPlaceholder.png')}*/}
        {/*  />*/}
        {/*</View>*/}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoryCardView;
