import React, {useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import useState from 'react-usestateref';
import {removeProductToCart, updateProductQty} from '../../store/actions';
import {Constants} from '../../constants';

const ProductItems = props => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.reducer.auth);
  const {currentCart, totalPrice} = useSelector(state => state.reducer.cart);
  const {onItemPress, onAdd, item, onFavouritePress, isFavourite} = props;
  const [inCart, setInCart, inCartRef] = useState(false);
  const [cartIndex, setCartIndex, cartIndexRef] = useState(null);
  const [count, setCount] = useState(0);

  const productCount = currentCart[cartIndexRef.current]?.purchaseQty;

  useEffect(() => {
    // console.log('cart update called');
    checkInCart();
  }, [currentCart.length, currentCart]);

  useEffect(() => {
    // console.log('count updated: ', productCount);
    if (productCount) {
      setCount(productCount);
    }
  }, [productCount]);

  const checkInCart = () => {
    setInCart(false);

    currentCart.forEach((i, index) => {
      if (i.productId === item.productId) {
        setInCart(true);
        setCartIndex(index);
        // setCount(currentCart[index].purchaseQty);
        setCount(i.purchaseQty);
        return;
      }
    });
  };

  const addButtonHandler = () => {
    onAdd();
    setCartIndex(currentCart.length);
    setCount(1);

    // if (inCart) {
    //   dispatch(removeProductToCart({index: cartIndexRef.current}));
    //   // alert('Item removed from cart');
    //   setInCart(false);
    //   setCartIndex(null);
    // } else {
    //   onAdd();
    //   setInCart(true);
    //   setCartIndex(currentCart.length);
    // }
  };

  const increment = () => {
    console.log('item stock: ', item?.productQuantity);
    // if (count < 5) {
    //   return;
    // }
    if (inCartRef.current) {
      dispatch(updateProductQty({qty: count + 1, index: cartIndexRef.current}));
    } else {
      setInCart(true);
    }
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      dispatch(updateProductQty({qty: count - 1, index: cartIndexRef.current}));
      setCount(count - 1);
    } else if (count === 1) {
      dispatch(removeProductToCart({index: cartIndexRef.current}));
      setCount(0);
      setInCart(false);
    }
  };

  const renderCounterBar = () => {
    return (
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={decrement} style={styles.counterBtn}>
          <Image
            style={styles.icCount}
            source={
              currentCart[cartIndexRef.current]?.purchaseQty === 1
                ? require('../../assets/images/minus.png')
                : require('../../assets/images/minus.png')
            }
          />
        </TouchableOpacity>
        <Text style={styles.buttonText}>
          {`$${item.productUnitPrice} x ${
            currentCart[cartIndexRef.current]?.purchaseQty
          }`}
        </Text>
        <TouchableOpacity onPress={increment} style={styles.counterBtn}>
          <Image
            style={styles.icCount}
            source={require('../../assets/images/plus.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={onItemPress} style={styles.productItemContainer}>
      <View style={styles.productItemMargin}>
        <FastImage
          resizeMode={'contain'}
          style={styles.productImage}
          source={{uri: item?.productItemImage}}
          fallback
          defaultSource={require('../../assets/images/imgPlaceholder.png')}
        />
        <Text numberOfLines={1} style={styles.productName}>
          {item?.productItemName}
        </Text>
        <Text style={styles.productQuantity}>{item?.productItemSize}</Text>
        {inCartRef.current ? (
          renderCounterBar()
        ) : (
          <View style={styles.priceCon}>
            <Text style={styles.productPrice}>${item?.productUnitPrice}</Text>
            <TouchableOpacity onPress={addButtonHandler}>
              <Image
                style={styles.addIcon}
                // source={require('../../assets/images/ic_add.png')}
                source={
                  inCartRef.current
                    ? require('../../assets/images/ic_minus.png')
                    : require('../../assets/images/ic_add.png')
                }
              />
            </TouchableOpacity>
          </View>
        )}

        {/*disabled favourite from guest user, ID:5 is for guest user */}
        {userData?.id !== Constants.GUEST_USER && (
          <TouchableOpacity
            onPress={onFavouritePress}
            style={styles.favIconCon}>
            <Image
              style={styles.favIcon}
              source={
                item?.productFavouriteId
                  ? require('../../assets/images/ic_favRed.png')
                  : require('../../assets/images/ic_fav.png')
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductItems;
