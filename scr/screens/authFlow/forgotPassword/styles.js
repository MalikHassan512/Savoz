import {StyleSheet} from 'react-native';
import {Colors, height, width} from '../../../constants';
import Fonts from '../../../constants/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE.default,
  },
  mainText: {
    fontSize: 24,
    color: Colors.BLACK.default,
    fontFamily: Fonts.GILROY.Bold,
    textAlign: 'left',
    marginTop: height * 0.04,
    marginStart: width * 0.05,
  },
  inputField: {
    alignSelf: 'center',
    marginTop: height * 0.06,
  },
  infoText: {
    fontFamily: Fonts.GILROY.Medium,
    lineHeight: 16.41,
    fontSize: 14,
    textAlign: 'left',
    paddingHorizontal: width * 0.05,
    color: Colors.GRAY.default,
    marginTop: height * 0.01,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: height * 0.05,
    alignSelf: 'center',
  },
});
