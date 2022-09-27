import {StyleSheet} from 'react-native';
import {Colors, height, IS_IPHONE_X} from '../../../constants';
import Fonts from '../../../constants/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE.default,
  },
  mainText: {
    color: Colors.BLACK.default,
    fontFamily: Fonts.GILROY.Bold,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: height * 0.025,
  },
  inputField: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  forgotText: {
    fontSize: 14,
    textAlign: 'right',
    padding: '5%',
    color: Colors.ORANGE.default,
  },
  bottomText: {
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    // left: 0,
    alignItems: 'center',
    // height: height * 0.06,
    // justifyContent: 'center',
    backgroundColor: Colors.WHITE.default,
  },
  signUpText: {
    fontFamily: Fonts.GILROY.SemiBold,
    fontSize: 14,
    color: Colors.GRAY.default,
  },
  signUp: {
    color: Colors.ORANGE.default,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: '10%',
  },
  phoneInputContainer: {
    paddingLeft: 20,
    backgroundColor: Colors.WHITE.default,
    width: '90%',
    height: IS_IPHONE_X ? height * 0.06 : height * 0.07,
    borderWidth: 1,
    borderColor: Colors.BORDER.default,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    overflow: 'hidden',
  },
  inputStyle: {
    alignSelf: 'flex-start',
    width: '98%',
    backgroundColor: Colors.WHITE.default,
    fontSize: 14,
    flex: 1,
  },
});
