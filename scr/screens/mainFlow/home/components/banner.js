import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import styles from './styles';
const Banner = () => {
  let textBold = 'Look Good, Feel Better';
  let textLight = 'Start the new year off strong with';
  let textOffer = 'Flat 30% OFF';
  return (
    <ImageBackground style={styles.bannerCon}>
      <View style={styles.bannerMargin}>
        <Text style={styles.bannerTextBold}>{textBold}</Text>
        <Text style={styles.bannerTextLight}>{textLight}</Text>
        <Text style={styles.bannerTextOffer}>{textOffer}</Text>
        <TouchableOpacity style={styles.bannerBtn}>
          <Text style={styles.bannerBtnText}>Order Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addImgContainer}>
        <Image
          style={styles.addImageStyle}
          source={require('../../../../assets/images/add_img.png')}
        />
      </View>
    </ImageBackground>
  );
};

export default Banner;
