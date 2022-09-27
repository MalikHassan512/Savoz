import {StyleSheet} from 'react-native';
import {Colors, height, width} from '../../../constants';
import Fonts from '../../../constants/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE.default,
  },
  bgImage: {
    width: width * 0.9,
    height: width * 0.7,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.15,
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  mainText: {
    fontSize: 24,
    color: Colors.BLACK.default,
    lineHeight: 28,
    fontFamily: Fonts.GILROY.SemiBold,
    textAlign: 'center',
    marginTop: height * 0.01,
    paddingHorizontal: '10%',
  },
  infoText: {
    fontSize: 14,
    fontFamily: Fonts.GILROY.Medium,
    textAlign: 'center',
    marginTop: height * 0.02,
    lineHeight: 14.41,
    paddingHorizontal: '10%',
    color: Colors.GRAY.default,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: height * 0.03,
    alignSelf: 'center',
  },
  guestText: {
    fontSize: 16,
    fontFamily: Fonts.GILROY.Bold,
    color: Colors.ORANGE.default,
    fontWeight: '500',
    padding: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    width: '100%',
  },
});
