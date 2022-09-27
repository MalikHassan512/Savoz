import {StyleSheet, Platform} from 'react-native';
import {Colors, height, width} from '../../constants';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  productItemContainer: {
    width: width * 0.44,
    backgroundColor: Colors.WHITE.default,
    // backgroundColor: Colors.WHITE.primary,
    borderRadius: 16,
    marginTop: 16,
  },
  productImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 120,
    height: Platform.OS === 'ios' ? 95 : 80,
    marginTop: 10,
  },
  productItemMargin: {
    margin: '6%',
    flex: 1,
  },
  favIconCon: {
    padding: 2,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  favIcon: {
    width: 16.2,
    height: 14.3,
    resizeMode: 'contain',
  },
  productName: {
    fontFamily: Fonts.GILROY.SemiBold,
    marginTop: '6%',
    fontSize: 14,
    color: Colors.BLACK.default,
  },
  productQuantity: {
    fontFamily: Fonts.GILROY.Medium,
    marginTop: '5%',
    color: Colors.BACKGROUND.gray,
    fontSize: 12,
  },
  productPrice: {
    color: Colors.BLACK.default,
    fontSize: 18,
    fontFamily: Fonts.GILROY.Bold,
  },
  addIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  counterContainer: {
    // marginTop: '11%',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? '5%' : '6%',
    justifyContent: 'space-between',
    height: 35,
    // backgroundColor: Colors.ORANGE.default,
    borderWidth: 1,
    borderColor: Colors.ORANGE.default,
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
  },
  priceCon: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? '5%' : '6%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 35,
  },
  counterBtn: {
    // borderWidth: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '7%',
  },
  icCount: {
    width: 15,
    height: 15,
    tintColor: Colors.ORANGE.default,
    // tintColor: Colors.WHITE.default,
    resizeMode: 'contain',
  },
  buttonText: {
    color: Colors.ORANGE.default,
    // color: Colors.WHITE.default,
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 14,
  },
});
