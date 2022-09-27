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
    fontFamily: Fonts.GILROY.Bold,
    color: Colors.BLACK.default,
    textAlign: 'left',
    marginTop: height * 0.04,
    marginStart: width * 0.05,
  },
  inputField: {
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 16.41,
    fontFamily: Fonts.GILROY.Medium,
    textAlign: 'left',
    paddingHorizontal: width * 0.05,
    color: Colors.GRAY.default,
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: height * 0.05,
    alignSelf: 'center',
  },
});
