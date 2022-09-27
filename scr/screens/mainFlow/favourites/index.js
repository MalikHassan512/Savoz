import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  BottomTabBG,
  Button,
  Header,
  ProductDetailsModal,
  ProductItems,
  NoDataView,
} from '../../../components';
import styles from './styles';
import strings from '../../../constants/strings';
import useState from 'react-usestateref';
import {
  addProductToCart,
  addProductToFavourite,
  getFavouriteList,
  productListingRequest,
  removeProductFromFavourite,
} from '../../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, Constants, Fonts, height} from '../../../constants';
const Favourites = () => {
  const dispatch = useDispatch();
  const {favouriteProductsList, isLoading, errorMessage, favouritePagination} =
    useSelector(state => state.reducer.product);
  const {userData} = useSelector(state => state.reducer.auth);

  const [currentProduct, setCurrentProduct, productRef] = useState('');
  const [currentIndex, setCurrentIndex, indexRef] = useState(0);
  const [isProductDetails, setIsProductDetails] = useState(false);

  useEffect(() => {
    if (userData?.id !== Constants.GUEST_USER) {
      getFavourites();
    }
  }, []);

  const handleAddPress = (item, qty, showAlert) => {
    item = {...item, purchaseQty: qty ? qty : 1};
    console.log('item data is: ', item);
    dispatch(addProductToCart(item));
    // showAlert && Alert.alert(null, strings.itemAddedSuccessfully);
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

  const onProductPress = (item, index) => {
    setCurrentProduct(item);
    setCurrentIndex(index);
    setIsProductDetails(true);
  };

  const renderItem = (item, index) => {
    return (
      <View
        style={{
          marginHorizontal: 16,
          flex: 1,
          alignItems: index % 2 === 1 ? 'flex-end' : 'flex-start',
        }}>
        <ProductItems
          item={item}
          onAdd={() => handleAddPress(item, null, true)}
          onFavouritePress={() => favouritePressHandler(item, index)}
          onItemPress={() => onProductPress(item, index)}
        />
      </View>
    );
  };

  const onRefresh = () => {
    if (!isLoading) {
      getFavourites();
    }
  };

  const getFavourites = () => {
    if (favouritePagination?.nextPage === 0) {
      console.log('no more page to load');
      return;
    }

    console.log('going to load data');
    dispatch(getFavouriteList());
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header title={strings.favourites} />
      {!isLoading && favouriteProductsList.length === 0 && (
        <NoDataView text={strings.noItemInFavourite} />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={favouriteProductsList}
        numColumns={2}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => renderItem(item, index)}
        onRefresh={onRefresh}
        refreshing={false}
        onEndReached={onRefresh}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          return (
            <View style={{marginBottom: height * 0.15}}>
              {isLoading && (
                <ActivityIndicator
                  style={{alignSelf: 'center', flex: 1}}
                  size={'large'}
                  color={Colors.ORANGE.default}
                />
              )}
            </View>
          );
        }}
      />
      {isProductDetails && (
        <Modal transparent={true}>
          <ProductDetailsModal
            item={productRef.current}
            index={indexRef.current}
            onBarPress={() => setIsProductDetails(false)}
            onAddPress={(item, qty) => handleAddPress(item, qty)}
            onFavouritePress={item => favouritePressHandler(item)}
          />
        </Modal>
      )}
      <BottomTabBG />
    </View>
  );
};

export default Favourites;
