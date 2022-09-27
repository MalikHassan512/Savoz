import {StyleSheet} from 'react-native';
import {Colors, width, height} from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ORANGE.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    // width: width * 0.6,
    width: width * 0.5,
    resizeMode: 'contain',
  },
});
