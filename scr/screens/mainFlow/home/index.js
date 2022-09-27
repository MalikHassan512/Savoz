import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import styles from './styles';
import {AddressBar, SearchBar, ListItem, Banner, TimeModal} from './components';
import {CategoryCardView, BottomTabBG, Alert} from '../../../components';
import {Colors, height, IS_IPHONE_X, width} from '../../../constants';
import {
  categoryListingRequest,
  updateProfile,
  updateUser,
  updateOrderType,
  getAllAddresses,
  getAppSettings,
} from '../../../store/actions';
import {useSelector, useDispatch} from 'react-redux';
import useState from 'react-usestateref';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {RecyclerListView, DataProvider} from 'recyclerlistview';
import {layoutProvider, googleMapAPIKey} from '../../../store/util';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const {userData, authTokens} = useSelector(state => state.reducer.auth);
  const {categoryList, isLoading, errorMessage} = useSelector(
    state => state.reducer.product,
  );
  const [categoryType, setCategoryType, categoryRef] = useState(24);
  const [categories, setCategories] = useState([]);

  const [isTimeModal, setIsTimeModal] = useState(false);
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [searchText, setSearchText, searchRef] = useState('');
  const [searchFocus, setSearchFocus, searchFocusRef] = useState(false);
  const [address, setAddress] = useState(userData?.address || '');

  let defaultDataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  const [dataProvider, setDataProvider] = useState(defaultDataProvider);

  useEffect(() => {
    setAlertMsg(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (userData?.address != null && userData?.address !== '') {
      setAddress(userData?.address);
    }
  }, [userData?.address]);

  useEffect(() => {
    Geocoder.init(googleMapAPIKey);

    getCategoryList();
    getUserAppData();

    if (userData?.address === '' || userData?.address == undefined) {
      locationPermission().catch();
    }
  }, []);

  useEffect(() => {
    setCategories(categoryList);
    setDataProvider(defaultDataProvider.cloneWithRows(categoryList));
  }, [categoryList]);

  const onRefresh = () => {
    getCategoryList();
  };

  const locationPermission = async () => {
    if (Platform.OS === 'android') {
      androidPermission().then(() => getAddress());
    } else {
      await Geolocation.requestAuthorization('whenInUse');
      getAddress();
    }
  };

  const getAddress = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('position ==> ', position);
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            console.log('address is: ', json);
            // let addressComponent = json.results[0].address_components[0];
            setAddress(json.results[0].formatted_address);
            updateAddress(json.results[0].formatted_address);
            // console.log('address is: ', addressComponent);
          })
          .catch(error => console.warn(error));
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const updateAddress = address => {
    let user = {...userData, address: address};
    dispatch(
      updateUser({
        user: user,
        tokens: authTokens,
      }),
    );
    dispatch(updateProfile({userData: user}));
  };

  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'App needs access to your Location ' +
            'so you can take awesome Service.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getUserAppData = () => {
    dispatch(getAllAddresses(() => {}));
    dispatch(getAppSettings());
  };
  const getCategoryList = () => {
    let params = {
      type: categoryRef.current,
    };
    dispatch(
      categoryListingRequest(params, res => {
        if (res === 'error') {
          setShowAlert(true);
          // setTimeout(() => {
          //   alert(alertRef.current);
          // }, 500);
        } else {
          // navigation.navigate('Main');
        }
      }),
    );
  };
  const headerComponent = () => {
    return (
      <View style={styles.header}>
        <Banner />
        {isLoading && (
          <ActivityIndicator
            style={{alignSelf: 'center', marginTop: '10%'}}
            size={'large'}
            color={Colors.ORANGE.default}
          />
        )}
      </View>
    );
  };

  const search = searchText => {
    console.log('search text: ', searchText);
    setSearchText(searchText);
    let filteredData = categoryList.filter(function (item) {
      return item.subCategoryName
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    setCategories(filteredData);
    setDataProvider(defaultDataProvider.cloneWithRows(filteredData));
  };

  const changeFilter = val => {
    setIsTimeModal(false);
    console.log('val is: ', val);
    if (val && val !== categoryType) {
      setCategoryType(val);
      dispatch(updateOrderType({type: val}));
      getCategoryList();
    }
  };

  const onCategorySelect = item => {
    // navigation.navigate('Products', {
    navigation.push('Products', {
      categoryId: item?.subCategoryId,
      category: item,
    });
  };

  const rowRenderer = (type, data, index) => {
    //You can return any view here, CellContainer has no special significance
    return (
      <>
        <CategoryCardView
          onPress={() => onCategorySelect(data)}
          type={type}
          data={data}
          index={index}
        />
      </>
    );
  };

  const renderItem = (item, index) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: index % 2 === 1 ? 'flex-end' : 'flex-start',
        }}>
        <ListItem
          categoryTitle={item?.subCategoryName}
          categoryImage={item?.subCategoryImage}
          // categoryImage={item.bgImage}
          onItemPress={() => onCategorySelect(item)}
        />
      </View>
    );
  };
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : -200;
  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/*<KeyboardAvoidingView*/}
      {/*  style={{flex: 1}}*/}
      {/*  behavior="padding"*/}
      {/*  keyboardVerticalOffset={keyboardVerticalOffset}>*/}
      <View style={{marginHorizontal: '5%', zIndex: 10}}>
        <AddressBar
          getCurrentLocation={locationPermission}
          address={address}
          filter={categoryType}
          timeBarPress={() => setIsTimeModal(true)}
        />
        <SearchBar
          onBlur={() => setSearchFocus(false)}
          onFocus={() => setSearchFocus(true)}
          style={{zIndex: 15, borderWidth: 0}}
          searchText={searchText}
          onChangeText={text => search(text)}
        />

        {searchText !== '' && searchFocus && categories.length > 0 && (
          <View style={{borderWidth: 0, zIndex: 12, marginTop: -30}}>
            <View style={styles.searchSuggestionContainer}>
              {categories?.map(item => {
                return (
                  <TouchableOpacity onPress={() => onCategorySelect(item)}>
                    <Text style={styles.searchSuggestionText}>
                      {item?.subCategoryName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
      {headerComponent()}
      {categories.length > 0 && (
        <RecyclerListView
          showsVerticalScrollIndicator={false}
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          renderHeader={headerComponent}
          rowRenderer={rowRenderer}
          renderFooter={() => {
            return <View style={{height: height * 0.15}} />;
          }}
        />
      )}
      {isTimeModal && (
        <Modal transparent={true}>
          <TimeModal
            selected={categoryType}
            onBarPress={val => changeFilter(val)}
          />
        </Modal>
      )}

      <BottomTabBG />
      <Alert
        show={showAlert}
        message={alertRef.current}
        onPress={() => setShowAlert(false)}
      />
      {/*<View*/}
      {/*  style={{*/}
      {/*    position: 'absolute',*/}
      {/*    bottom: 0,*/}
      {/*    height: '10%',*/}
      {/*    width: width,*/}
      {/*  }}>*/}
      {/*  <Image*/}
      {/*    style={{*/}
      {/*      height: height * 0.1,*/}
      {/*      width: width,*/}
      {/*      alignSelf: 'center',*/}
      {/*      // borderWidth: 1,*/}
      {/*    }}*/}
      {/*    source={require('../../../assets/images/tabBar.png')}*/}
      {/*  />*/}
      {/*</View>*/}
    </View>
  );
};

export default Home;
