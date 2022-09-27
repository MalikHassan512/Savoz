import {StyleSheet} from 'react-native';
import {Colors, height, IS_IPHONE_X, width} from '../../../constants';
import Fonts from '../../../constants/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE.primary,
  },
  screeMargin: {
    paddingHorizontal: '5%',
  },
  shadow: {
    shadowColor: Colors.GRAY.default,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    elevation: 12,
  },
  orderHeaderCon: {
    // marginHorizontal: '5%',
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '1%',
    borderColor: Colors.GRAY.default,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 58,
    backgroundColor: Colors.WHITE.default,
  },
  orderBtnCon: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  OrderBtn: {
    width: width * 0.4,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBtnText: {
    // color:Colors.WHITE.default,
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 14,
  },
});
