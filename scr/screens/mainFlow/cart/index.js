import React from 'react';
import {View, SafeAreaView, FlatList, Modal} from 'react-native';
import {
  Header,
  ProductDetailsModal,
  Alert,
  AlertBox,
  NoDataView,
} from '../../../components';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {CartItemView, CheckOutButton} from './components';
import useState from 'react-usestateref';
import strings from '../../../constants/strings';
import {
  addProductToFavourite,
  removeProductFromFavourite,
} from '../../../store/actions/product';
import {
  addProductToCart,
  removeProductToCart,
} from '../../../store/actions/cart';
import {Constants} from '../../../constants';

const Cart = props => {
  const dispatch = useDispatch();
  const {navigation} = props;

  const {isLoading, errorMessage} = useSelector(state => state.reducer.product);
  const {userData} = useSelector(state => state.reducer.auth);
  const {currentCart, totalPrice} = useSelector(state => state.reducer.cart);
  const [currentProduct, setCurrentProduct, productRef] = useState('');
  const [isProductDetails, setIsProductDetails] = useState(false);
  const [currentInd, setCurrentInd] = useState(0);
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const [delIndex, setDelIndex, delRef] = useState(null);

  const handlePlaceOrderPress = () => {
    if (currentCart.length > 0) {
      console.log('need to place this order');
      navigation.navigate('CheckOut');
    } else {
      setAlertMsg(strings.noProductInCart);
      setShowAlert(true);
      // Alert.alert(null, strings.noProductInCart);
    }
  };

  const removeItem = () => {
    dispatch(removeProductToCart({index: delRef.current}));
    setShowRemoveAlert(false);
  };
  const handleAddPress = (item, qty, showAlert) => {
    item = {...item, purchaseQty: qty ? qty : 1};
    console.log('item data is: ', item);
    dispatch(addProductToCart(item));
  };

  const onProductPress = (item, index) => {
    setCurrentProduct(item);
    setCurrentInd(index);
    setIsProductDetails(true);
  };
  const favouritePressHandler = item => {
    if (isLoading) {
      return;
    }
    if (item?.productFavouriteId) {
      dispatch(
        removeProductFromFavourite(
          {favouriteId: item.productFavouriteId},
          () => {},
        ),
      );
    } else {
      let params = {
        userId: userData?.id,
        productId: item.productId,
      };
      let extras = {item};
      dispatch(addProductToFavourite(params, extras, () => {}));
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header title={strings.myCart} />
      {currentCart.length === 0 && (
        <NoDataView text={strings.addProductsToCart} />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={currentCart}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <CartItemView
            index={index}
            item={item}
            onItemPress={() => onProductPress(item, index)}
            onDelPress={index => {
              setDelIndex(index);
              setShowRemoveAlert(true);
            }}
          />
        )}
        ListFooterComponent={() => <View style={{marginBottom: 20}} />}
      />
      <View style={{alignSelf: 'center', marginBottom: 30}}>
        <CheckOutButton
          isDisabled={userData?.id === Constants.GUEST_USER}
          onPress={handlePlaceOrderPress}
          totalPrice={totalPrice}
          title={strings.checkout}
          // isLoading={isLoading}
        />
      </View>
      {isProductDetails && (
        <Modal transparent={true}>
          <ProductDetailsModal
            index={currentInd}
            item={productRef.current}
            onBarPress={() => setIsProductDetails(false)}
            onAddPress={(item, qty) => handleAddPress(item, qty)}
            // onFavouritePress={item => favouritePressHandler(item)}
          />
        </Modal>
      )}

      <Alert
        show={showAlert}
        message={alertRef.current}
        onPress={() => setShowAlert(false)}
      />

      {showRemoveAlert && (
        <AlertBox
          title={strings.removeItem}
          message={strings.areYouSureYouWantToRemove}
          onPress={removeItem}
          buttonText={strings.yes}
          firstButtonText={strings.no}
          onPressFirstButton={() => setShowRemoveAlert(false)}
        />
      )}
    </View>
  );
};

export default Cart;
