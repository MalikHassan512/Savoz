import {StyleSheet} from 'react-native';
import {height, width, Colors, IS_IPHONE_X, Fonts} from '../../constants';
export default StyleSheet.create({
  paymentIcon: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
    marginRight: 15,
  },
  paymentItem: {
    backgroundColor: Colors.WHITE.default,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    shadowColor: Colors.BLACK.default,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textMedium: {
    fontSize: 14,
    fontFamily: Fonts.GILROY.Medium,
    color: Colors.BLACK.default,
  },
  textSemiBold: {
    fontSize: 18,
    fontFamily: Fonts.GILROY.SemiBold,
    color: Colors.BLACK.default,
    marginVertical: 10,
  },
  checkIcon: {
    height: 20,
    width: 20,
    margin: 10,
    marginLeft: 0,
  },
});
