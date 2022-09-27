import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Modal,
  ActivityIndicator,
  // Alert,
} from 'react-native';
import {
  Header,
  ProductItems,
  ProductDetailsModal,
  Alert,
  BottomTabBG,
  NoDataView,
} from '../../../components';
import styles from './styles';
import {
  productListingRequest,
  addProductToCart,
  addProductToFavourite,
  removeProductFromFavourite,
} from '../../../store/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Colors, height} from '../../../constants';
import useState from 'react-usestateref';
import strings from '../../../constants/strings';

const Products = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {category} = route.params;
  const {productList, isLoading, errorMessage, paginationData, currentId} =
    useSelector(state => state.reducer.product);
  const {userData} = useSelector(state => state.reducer.auth);
  const [isProductDetails, setIsProductDetails] = useState(false);
  const [currentProduct, setCurrentProduct, productRef] = useState('');
  const [currentIndex, setCurrentIndex, indexRef] = useState(0);
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setAlertMsg(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    console.log('error message updated: ', errorMessage);
  }, [errorMessage]);

  const onRefresh = () => {
    if (!isLoading) {
      getProductList();
    }
  };

  const onProductPress = (item, index) => {
    setCurrentProduct(item);
    setCurrentIndex(index);
    setIsProductDetails(true);
  };

  const getProductList = () => {
    if (
      paginationData?.nextPage === 0 &&
      currentId === category.subCategoryId
    ) {
      console.log('no more page to load');
      return;
    }

    let params = {
      subCategoryId: category.subCategoryId,
      currentId: category.subCategoryId,
      userId: userData?.id,
    };
    dispatch(
      productListingRequest(params, res => {
        if (res === 'error') {
          setShowAlert(true);
          // setTimeout(() => {
          //   alert(alertRef.current);
          // }, 500);
        } else {
          //  Success case
        }
      }),
    );
  };

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

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header title={category?.subCategoryName} />
      {!isLoading && productList.length === 0 && (
        <NoDataView text={strings.noProductAvailable} />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        // style={styles.listViewContainer}
        data={productList}
        numColumns={2}
        keyExtractor={(item, index) => index}
        // ListHeaderComponent={headerComponent}
        renderItem={({item, index}) => renderItem(item, index)}
        onRefresh={onRefresh}
        refreshing={false}
        onEndReached={onRefresh}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          return (
            <>
              {isLoading && (
                <ActivityIndicator
                  style={{alignSelf: 'center', flex: 1}}
                  size={'large'}
                  color={Colors.ORANGE.default}
                />
              )}
              <View style={{height: height * 0.18}} />
            </>
          );
        }}
        // refreshing={isLoading}
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
      <Alert
        show={showAlert}
        message={alertRef.current}
        onPress={() => setShowAlert(false)}
      />
      <BottomTabBG />
    </View>
  );
};

export default Products;
