import {StyleSheet, Platform} from 'react-native';
import {height, width, Colors, IS_IPHONE_X} from '../../constants';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: IS_IPHONE_X ? 0 : 10,
  },
  backButton: {
    height: width * 0.1,
    width: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  headerText: {
    fontFamily: Fonts.GILROY.SemiBold,
    fontSize: 16,
    color: Colors.BLACK.default,
    // fontWeight: Platform.OS === 'ios' ? '600' : '700',
  },
});
