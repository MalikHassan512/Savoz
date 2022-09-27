//import liraries
import React, {useState} from 'react';
import {View, ImageBackground, Pressable, Image} from 'react-native';
import Header from '../../../components/header';
import {useNavigation} from '@react-navigation/native';
import OrderTrackInfoModal from './components/orderTrackInfoModal';
import styles from './styles';

// create a component
const OrderTrack = () => {
  const [fullView, setFullView] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      {fullView ? (
        <ImageBackground
          source={require('../../../assets/images/mapBgImage.png')}
          style={styles.bgStyle}>
          <Pressable
            style={styles.crossSign}
            onPress={() => setFullView(!fullView)}>
            <Image
              source={require('../../../assets/images/ic_close.png')}
              style={styles.crossImage}
            />
          </Pressable>
        </ImageBackground>
      ) : (
        <ImageBackground
          source={require('../../../assets/images/mapBgImage.png')}
          style={styles.bgStyle}>
          <View style={styles.headerCon}>
            <Header onPress={() => navigation.goBack()} />
          </View>

          <Pressable onPress={() => setFullView(!fullView)}>
            <View style={{height: '66%'}}></View>
          </Pressable>

          <OrderTrackInfoModal />
        </ImageBackground>
      )}
    </>
  );
};

export default OrderTrack;
