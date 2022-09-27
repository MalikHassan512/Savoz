import {StyleSheet} from 'react-native';
import {height, width, Colors} from '../../constants';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  container: {
    width: '90%',
    borderWidth: 1,
    borderColor: Colors.BORDER.default,
    borderRadius: 8,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 14,
    color: Colors.BLACK.default,
  },
  titleText: {
    fontFamily: Fonts.GILROY.Regular,
    fontSize: 12,
    marginBottom: 5,
    opacity: 0.6,
  },
  downButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
  },
  downArrow: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  onBlurText: {
    fontSize: 14,
    fontFamily: Fonts.GILROY.Medium,
    opacity: 0.6,
    color: Colors.BLACK.default,
    paddingVertical: height * 0.012,
  },
  listContainer: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  itemText: {
    color: Colors.BLACK.default,
    fontSize: 14,
    fontFamily: Fonts.GILROY.Medium,
    paddingVertical: 5,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: Colors.BORDER.default,
    marginBottom: 10,
  },
});
