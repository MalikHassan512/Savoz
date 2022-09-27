import {StyleSheet, Platform} from 'react-native';
import {Colors, height, width} from '../../constants';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.1,
  },

  textStyle: {
    fontFamily: Fonts.GILROY.SemiBold,
    color: Colors.ORANGE.default,
    width: width * 0.5,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
  },
});
