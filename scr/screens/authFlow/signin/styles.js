import {StyleSheet} from 'react-native';
import {Colors, height} from '../../../constants';
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
    textAlign: 'center',
    marginVertical: height * 0.05,
  },
  inputField: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  forgotText: {
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 14,
    textAlign: 'right',
    padding: '5%',
    color: Colors.ORANGE.default,
  },
  bottomText: {
    // position: 'absolute',
    // bottom: height * 0.05,
    alignSelf: 'center',
  },
  signUpText: {
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 14,
    color: Colors.GRAY.default,
  },
  signUp: {
    color: Colors.ORANGE.default,
  },
});
