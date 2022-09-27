import {StyleSheet} from 'react-native';
import {Colors, height, IS_IPHONE_X, width} from '../../../constants';
import Fonts from '../../../constants/Fonts';

console.log('my height is: ', height);

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE.default,
  },
  bgImage: {
    width: width,
    height: height > 800 ? width : width * 0.9,
    // height: IS_IPHONE_X ? width : width * 0.9,
    resizeMode: 'contain',
    // borderWidth: 1,
  },
  textStyle: {
    fontSize: 28,
    lineHeight: 32,
    textAlign: 'center',
    fontFamily: Fonts.GILROY.Medium,
    width: width * 0.8,
    alignSelf: 'center',
    marginTop: 20,
  },
  textSmall: {
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    fontFamily: Fonts.GILROY.Medium,
    width: width * 0.8,
    alignSelf: 'center',
    marginVertical: 20,
    color: Colors.GRAY.light_2,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: height * 0.07,
    right: 0,
    left: 0,
  },
  backText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts.GILROY.Medium,
    color: Colors.ORANGE.default,
    padding: 10,
    marginTop: 10,
  },
});
