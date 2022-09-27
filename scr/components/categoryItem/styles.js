import {Platform, StyleSheet} from 'react-native';
import {height, width, Colors} from '../../constants';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 8,
    margin: 8,
    borderWidth: 0.5,
    overflow: 'hidden',
    borderColor: Colors.BORDER.default,
  },
  text: {
    // marginTop: Platform.OS === 'ios' ? '9%' : '7%',
    // margin: '6%',
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    color: Colors.BLACK.default,
    fontFamily: Fonts.GILROY.Bold,
    // fontFamily: Fonts.GILROY.Medium,
    marginBottom: 5,
    // flexShrink: 1,
  },
  textContainer: {
    flexDirection: 'row',
    margin: 8,
    marginBottom: 0,
  },
  imageContainer: {
    alignItems: 'flex-end',
    // height: 110,
    // alignItems: 'center',
    flex: 1,
    // borderWidth: 1
  },
  image: {
    // width: '100%',
    // height: 110,
    flex: 1,
  },
});
