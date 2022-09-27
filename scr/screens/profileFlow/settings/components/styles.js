import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants';
import Fonts from '../../../../constants/Fonts';

export default StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.GILROY.Medium,
    color: Colors.BLACK.default,
    marginLeft: 16,
  },
  lineIcon: {
    width: 6,
    height: 12,
    marginRight: 12,
  },
});
