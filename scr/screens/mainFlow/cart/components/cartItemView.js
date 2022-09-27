import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {Colors, Constants} from '../../../../constants';
import {updateProductQty} from '../../../../store/actions';
import {useDispatch} from 'react-redux';

const CartItemView = props => {
  const {item, index, onItemPress, onDelPress} = props;
  const dispatch = useDispatch();

  console.log('cart item: ', item);

  const updateQuantity = type => {
    let count = item.purchaseQty;
    if (type === Constants.ADD) {
      count = count + 1;
    } else {
      if (count > 1) {
        count = count - 1;
      }
    }
    dispatch(updateProductQty({qty: count, index: index}));
  };
  return (
    <TouchableOpacity onPress={onItemPress} style={styles.container}>
      <FastImage
        style={styles.image}
        source={{uri: item?.productItemImage}}
        fallback
        defaultSource={require('../../../../assets/images/imgPlaceholder.png')}
      />
      <View
        style={{
          justifyContent: 'space-around',
          paddingVertical: 2,
          marginStart: 5,
        }}>
        <Text numberOfLines={1} style={styles.titleText}>
          {item?.productItemName}
        </Text>
        <Text style={styles.qtyText}>{item?.productItemSize}</Text>
        <Text style={styles.priceText}>${item?.productUnitPrice}</Text>
      </View>
      <View style={styles.delIconContainer}>
        <TouchableOpacity onPress={() => onDelPress(index)}>
          <Image
            style={styles.delIcon}
            source={require('../../../../assets/images/ic_delete.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={() => updateQuantity(Constants.REMOVE)}>
          <Image
            style={styles.icCount}
            source={require('../../../../assets/images/ic_minus.png')}
          />
        </TouchableOpacity>
        <Text style={styles.countText}>{item.purchaseQty}</Text>
        <TouchableOpacity onPress={() => updateQuantity(Constants.ADD)}>
          <Image
            style={styles.icCount}
            source={require('../../../../assets/images/ic_add.png')}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CartItemView;
