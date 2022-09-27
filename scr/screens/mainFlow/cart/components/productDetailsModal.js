import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import strings from '../../../../constants/strings';

import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {updateProductQty} from '../../../../store/actions/cart';
import {useDispatch} from 'react-redux';
const ProductDetailsModal = ({item, onBarPress, index}) => {
  const [isFav, setIsFav] = useState(false);
  const [count, setCount] = useState(item?.purchaseQty);

  const dispatch = useDispatch();
  const countChange = type => {
    if (type === 'Add') {
      setCount(count + 1);
    }
    if (type === 'Minus' && count > 1) {
      setCount(count - 1);
    }
  };

  const updateQuantity = () => {
    dispatch(updateProductQty({qty: count, index: index}));
    onBarPress();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={onBarPress}>
        <View style={styles.transparentView} />
      </TouchableWithoutFeedback>
      <View style={styles.modalCon}>
        <TouchableWithoutFeedback onPress={onBarPress}>
          <View style={styles.barCon}>
            <View style={styles.bar} />
          </View>
        </TouchableWithoutFeedback>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: '5%'}}>
          <TouchableOpacity
            onPress={() => setIsFav(!isFav)}
            style={[styles.favIconCon, {marginTop: '4%'}]}>
            <Image
              style={[styles.favIcon, {width: 22, height: 22}]}
              source={
                item?.productFavouriteId
                  ? require('../../../../assets/images/ic_favRed.png')
                  : require('../../../../assets/images/ic_fav.png')
              }
            />
          </TouchableOpacity>

          <Swiper
            style={{justifyContent: 'center'}}
            height={'50%'}
            showsButtons={false}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDott} />}>
            <FastImage
              resizeMode="contain"
              style={styles.imgProduct}
              source={{uri: item?.productItemImage}}
              fallback
              defaultSource={require('../../../../assets/images/imgPlaceholder.png')}
            />
          </Swiper>

          <Text style={styles.productNameModal}>{item?.productItemName}</Text>
          <Text style={styles.productQuantityModal}>
            {item?.productItemSize}
          </Text>
          <Text style={styles.productDetailsModal}>
            {item?.productItemDescription}
          </Text>
          <View style={styles.priceContainer}>
            <Text
              style={
                styles.productPriceModal
              }>{`$${item.productUnitPrice}`}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => countChange('Minus')}>
                <Image
                  style={styles.icCount}
                  source={require('../../../../assets/images/ic_minus.png')}
                />
              </TouchableOpacity>
              <Text style={styles.countText}>{count}</Text>
              <TouchableOpacity onPress={() => countChange('Add')}>
                <Image
                  style={styles.icCount}
                  source={require('../../../../assets/images/ic_add.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={updateQuantity} style={styles.modalBtn}>
            <Text style={styles.buttonText}>{strings.updateCart}</Text>
          </TouchableOpacity>
          <View style={{marginBottom: '5%'}} />
        </ScrollView>
      </View>
    </>
  );
};

export default ProductDetailsModal;
