import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants';
import Fonts from '../../../../constants/Fonts';

export default StyleSheet.create({
  shadow: {
    shadowColor: Colors.GRAY.default,
    shadowRadius: 16,
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 0},
    elevation: 12,
  },
  activeOrderCon: {
    marginTop: 16,
    backgroundColor: Colors.WHITE.default,
    width: '100%',
    borderRadius: 16,
  },
  margin: {
    margin: '5%',
  },
  textsAll: {
    color: Colors.GRAY.darkgrey,
    fontSize: 14,
    fontFamily: Fonts.GILROY.Medium,
  },
  orderStatus: {
    color: Colors.GREEN.dark,
    fontFamily: Fonts.GILROY.SemiBold,
    fontSize: 14,
  },
  ratingCon: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icStar: {
    alignSelf: 'center',
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: '6%',
    justifyContent: 'space-between',
  },
});
