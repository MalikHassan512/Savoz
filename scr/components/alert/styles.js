import {StyleSheet} from 'react-native';
import {height, width, Colors, IS_IPHONE_X} from '../../constants';
import Fonts from '../../constants/Fonts';
export default StyleSheet.create({
  absoluteScreen: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    backgroundColor: 'transparent',
  },
  alertBody: {
    backgroundColor: Colors.WHITE.default,
    width: '90%',
    padding: 20,
    borderRadius: 20,
    shadowColor: Colors.BLACK.default,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textBold: {
    textAlign: 'center',
    fontFamily: Fonts.GILROY.SemiBold,
    fontSize: 24,
    marginVertical: 20,
  },
  textDescription: {
    textAlign: 'center',
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 14,
    width: '95%',
    alignSelf: 'center',
    lineHeight: 20,
    color: Colors.GRAY.light_2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 15,
  },
  crossIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  closeIconButton: {
    position: 'absolute',
    padding: 15,
    right: 0,
  },
  xText: {
    fontFamily: Fonts.GILROY.SemiBold,
    fontSize: 20,
  },
  alertButton: {
    width: '50%',
    marginTop: 30,
    marginBottom: 15,
    alignSelf: 'center',
  },
});
