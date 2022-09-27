import {Platform, StyleSheet} from 'react-native';
import {height, width, Colors, IS_IPHONE_X} from '../../constants';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  container: {
    width: '90%',
    height: IS_IPHONE_X ? height * 0.06 : height * 0.07,
    borderWidth: 1,
    borderColor: Colors.BORDER.default,
    borderRadius: 8,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 14,
    color: '#000000',
    fontFamily: Fonts.GILROY.Medium,
    padding: 0,
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 12,
    fontFamily: Fonts.GILROY.Medium,
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
    opacity: 0.6,
    color: '#000000',
    paddingHorizontal: 15,
  },
  showPass: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  onBlurText: {
    fontSize: 14,
    fontFamily: Fonts.GILROY.Medium,
    opacity: 0.4,
    color: '#000',
  },
});
