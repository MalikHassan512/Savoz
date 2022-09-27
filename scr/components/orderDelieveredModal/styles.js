import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../constants';
import Fonts from '../../constants/Fonts';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  modalContentView: {
    // backgroundColor: 'white',
    backgroundColor: Colors.WHITE.default,
    borderTopEndRadius: 26,
    borderTopLeftRadius: 26,
    paddingHorizontal: 24,
    // height: height / 1.7,
    height: height * 0.7,
  },
  successMsg: {fontFamily: Fonts.GILROY.SemiBold, fontSize: 24, color: 'black'},
  TopTextView: {
    marginTop: '6.5%',
    alignItems: 'center',
  },
  RateTextView: {alignItems: 'center', marginTop: 16},
  rateText: {fontSize: 15, fontFamily: Fonts.GILROY.Medium, color: '#7C7C7C'},
  textInputView: {
    height: 88,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginVertical: 5,
  },
  inputStyle: {
    color: '#979797',
    fontSize: 14,
    fontFamily: Fonts.GILROY.Medium,
    marginHorizontal: 8,
    width: width / 1.2,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  TipTextView: {
    marginTop: 24,
  },
  tipText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: Fonts.GILROY.SemiBold,
  },
  imageView: {alignItems: 'center'},

  crossSign: {
    width: 14,
    height: 14,
  },
  crossCon: {
    padding: 5,
    // backgroundColor: 'red',
    alignSelf: 'flex-start',
    // top: 22,
    top: '3%',
    marginLeft: -5,
  },
  closeModal: {alignItems: 'center', height: height * 0.36},
});
