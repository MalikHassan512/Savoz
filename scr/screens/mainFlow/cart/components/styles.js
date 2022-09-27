import {StyleSheet, Platform} from 'react-native';
import {Colors, height, IS_IPHONE_X, width} from '../../../../constants';
import Fonts from '../../../../constants/Fonts';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.WHITE.default,
    flexDirection: 'row',
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 15,
    shadowColor: Colors.BLACK.default,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  titleText: {
    color: Colors.BLACK.default,
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 16,
    width: width * 0.5,
  },
  qtyText: {
    color: Colors.GRAY.default,
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 14,
    marginTop: -5,
  },
  priceText: {
    color: Colors.BLACK.default,
    fontFamily: Fonts.GILROY.SemiBold,
    fontSize: 18,
  },
  delIcon: {
    tintColor: Colors.GRAY.default,
    height: 18,
    width: 18,
    resizeMode: 'contain',
    margin: 10,
  },
  delIconContainer: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  icCount: {
    width: 24,
    height: 24,
  },
  countText: {
    paddingHorizontal: 10,
    color: Colors.BLACK.default,
    fontFamily: Fonts.GILROY.SemiBold,
    fontSize: 18,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  button: {
    width: width * 0.9,
    height: IS_IPHONE_X ? height * 0.056 : height * 0.065,
    backgroundColor: Colors.ORANGE.default,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '7%',
  },
  selectedText: {
    color: Colors.WHITE.default,
    fontSize: 16,
    fontFamily: Fonts.GILROY.Medium,
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
  modalCon: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.WHITE.default,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? '7%' : 0,
  },
  transparentView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  barCon: {
    padding: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: '18%',
    height: 4,
    borderRadius: 3,
    backgroundColor: Colors.BACKGROUND.gray,
  },
  productNameModal: {
    color: Colors.BLACK.default,
    fontFamily: Fonts.GILROY.Bold,
    fontSize: 24,
  },
  productQuantityModal: {
    marginTop: '2%',
    color: Colors.GRAY.default,
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 16,
  },
  productDetailsModal: {
    marginTop: '5%',
    color: Colors.GRAY.default,
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 14,
    lineHeight: 16,
  },
  priceContainer: {
    alignItems: 'center',
    marginTop: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPriceModal: {
    color: Colors.BLACK.default,
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 24,
  },
  modalBtn: {
    marginTop: '11%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: Colors.ORANGE.default,
    borderRadius: 8,
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.WHITE.default,
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 16,
  },
  imgProduct: {
    marginBottom: '10%',
    resizeMode: 'contain',
    width: 375,
    height: 217,
    alignSelf: 'center',
  },
  dot: {
    marginHorizontal: 2,
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.ORANGE.default,
    opacity: 0.4,
  },
  activeDott: {
    marginHorizontal: 2,
    width: 20,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.ORANGE.default,
  },
});
