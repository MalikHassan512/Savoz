import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import styles from './styles';
import {Colors, Constants, height, width} from '../../constants';
import {Alert, Button} from '../../components';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import strings from '../../constants/strings';
import useState from 'react-usestateref';
import {useSelector, useDispatch} from 'react-redux';
import {removeProductToCart, updateProductQty} from '../../store/actions';

const ProductDetailsModal = props => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.reducer.auth);
  const {item, onBarPress, onAddPress, onFavouritePress} = props;
  const {currentCart, totalPrice} = useSelector(state => state.reducer.cart);
  // const [isFav, setIsFav] = useState(false);
  const [count, setCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [fullView, setFullView] = useState(false);
  const [inCart, setInCart, inCartRef] = useState(false);
  const [cartIndex, setCartIndex, cartIndexRef] = useState(null);
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    checkInCart();
  }, [currentCart]);

  const checkInCart = () => {
    currentCart.forEach((i, index) => {
      if (i.productId === item.productId) {
        setInCart(true);
        setCartIndex(index);
        setCount(currentCart[index].purchaseQty);
        return;
      }
    });
  };

  const countChange = type => {
    if (type === 'Add') {
      setCount(count + 1);
    }
    if (type === 'Minus' && count > 1) {
      setCount(count - 1);
    }
  };

  const addToCart = () => {
    if (inCart) {
      dispatch(updateProductQty({qty: count, index: cartIndexRef.current}));
      // alert(strings.quantityUpdated);
      setAlertMsg(strings.quantityUpdated);
      setShowAlert(true);
    } else {
      onAddPress(item, count);
      onBarPress();
    }
  };

  const increment = () => {
    if (inCartRef.current) {
      dispatch(updateProductQty({qty: count + 1, index: cartIndexRef.current}));
    } else {
      setInCart(true);
      onAddPress(item, count + 1);
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

  const favouritePress = () => {
    onFavouritePress(item);
    onBarPress();
  };

  const renderImage = ({i, index}) => {
    return (
      <TouchableOpacity
        disabled={fullView}
        onPress={() => setFullView(true)}
        style={{width: width * 0.9, alignItems: 'center', marginBottom: '10%'}}>
        <FastImage
          resizeMode={'contain'}
          style={[styles.imgProduct, {aspectRatio: fullView ? 0.7 : 1.6}]}
          source={{uri: item?.productItemImage}}
          fallback
          defaultSource={require('../../assets/images/imgPlaceholder.png')}
        />
      </TouchableOpacity>
    );
  };

  const onViewRef = React.useRef(viewableItems => {
    console.log('Data OnVIewRef=====>', viewableItems);
    setImageIndex(viewableItems.changed[0].index);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const renderCounter = () => {
    return (
      <View style={styles.modalCounterContainer}>
        {count > 0 && (
          <TouchableOpacity style={styles.counterBtn} onPress={decrement}>
            <Image
              style={styles.icCount}
              source={
                count === 1
                  ? require('../../assets/images/minus.png')
                  : require('../../assets/images/minus.png')
              }
            />
          </TouchableOpacity>
        )}
        <Text style={[styles.buttonText, count === 0 && {marginLeft: '7%'}]}>
          {`$${item.productUnitPrice}`} {count > 0 && ` x ${count}`}
        </Text>
        <TouchableOpacity style={styles.counterBtn} onPress={increment}>
          <Image
            style={styles.icCount}
            source={require('../../assets/images/plus.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderView = () => {
    return (
      <>
        <View style={[styles.modalCon, fullView && {height: height * 0.8}]}>
          <TouchableWithoutFeedback onPress={onBarPress}>
            <View style={styles.barCon}>
              <View style={styles.bar} />
            </View>
          </TouchableWithoutFeedback>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginHorizontal: '5%'}}>
            {!fullView &&
              onFavouritePress &&
              userData?.id !== Constants.GUEST_USER && (
                <TouchableOpacity
                  disabled={!onFavouritePress}
                  onPress={favouritePress}
                  style={[styles.favIconCon, {marginTop: '4%', zIndex: 10}]}>
                  <Image
                    style={[styles.favIcon, {width: 22, height: 22}]}
                    source={
                      item?.productFavouriteId
                        ? require('../../assets/images/ic_favRed.png')
                        : require('../../assets/images/ic_fav.png')
                    }
                  />
                </TouchableOpacity>
              )}

            {fullView && (
              <TouchableOpacity
                onPress={() => setFullView(false)}
                style={styles.closeIconBtn}>
                <Image
                  style={styles.closeIcon}
                  source={require('../../assets/images/ic_close.png')}
                />
              </TouchableOpacity>
            )}

            <FlatList
              data={list}
              renderItem={renderImage}
              keyExtractor={item => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              viewabilityConfig={viewConfigRef.current}
              onViewableItemsChanged={onViewRef.current}
            />
            <View style={styles.dotsContainer}>
              <View style={imageIndex === 0 ? styles.dash : styles.dot} />
              <View style={imageIndex === 1 ? styles.dash : styles.dot} />
              <View style={imageIndex === 2 ? styles.dash : styles.dot} />
            </View>

            {!fullView && (
              <>
                <Text style={styles.productNameModal}>
                  {item?.productItemName}
                </Text>
                <Text style={styles.productQuantityModal}>
                  {item?.productItemSize}
                </Text>
                <Text style={styles.productDetailsModal}>
                  {item?.productItemDescription}
                </Text>
                {renderCounter()}
              </>
            )}
          </ScrollView>
        </View>
        <Alert
          show={showAlert}
          message={alertRef.current}
          onPress={() => setShowAlert(false)}
        />
      </>
    );
  };

  console.log('item: ', item);
  let list = [1, 2, 3];
  return (
    <>
      <TouchableWithoutFeedback onPress={onBarPress}>
        <View style={styles.transparentView} />
      </TouchableWithoutFeedback>
      {renderView()}
    </>
  );
};

export default ProductDetailsModal;
