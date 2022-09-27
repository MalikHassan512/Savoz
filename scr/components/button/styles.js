import {StyleSheet} from 'react-native';
import {height, width, Colors, IS_IPHONE_X} from '../../constants';
import Fonts from '../../constants/Fonts';
export default StyleSheet.create({
  button: {
    width: width * 0.9,
    height: IS_IPHONE_X ? height * 0.056 : height * 0.065,
    backgroundColor: Colors.ORANGE.default,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    width: '48%',
    height: IS_IPHONE_X ? height * 0.056 : height * 0.065,
  },
  white: {
    backgroundColor: Colors.WHITE.default,
    borderWidth: 1,
    borderColor: Colors.ORANGE.default,
  },
  selectedText: {
    color: Colors.WHITE.default,
    fontSize: 16,
    fontFamily: Fonts.GILROY.Bold,
    fontWeight: '500',
  },
  whiteBtnText: {
    color: Colors.ORANGE.default,
  },
});
