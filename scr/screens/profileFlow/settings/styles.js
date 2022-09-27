import {StyleSheet} from 'react-native';
import {Colors, IS_IPHONE, width} from '../../../constants';
import Fonts from '../../../constants/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.ORANGE.default,
    backgroundColor: Colors.WHITE.default,
  },
  screenMargin: {
    paddingHorizontal: '5%',
  },
  profileContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  profilePic: {
    width: 72,
    height: 72,
    borderRadius: 50,
    borderWidth: 0.5,
    // borderColor: Colors.ORANGE.default,
    borderColor: Colors.BORDER.default,
  },
  nameAndEmailContainer: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontFamily: Fonts.GILROY.SemiBold,
    // color: Colors.WHITE.default,
    color: Colors.BLACK.default,
  },
  email: {
    fontSize: 14,
    fontFamily: Fonts.GILROY.Regular,
    color: Colors.BLACK.default,
    // color: Colors.GRAY.default,
    // color: Colors.GRAY.light,
    marginTop: 7,
  },
  divider: {
    marginHorizontal: 40,
    marginTop: 32,
    height: 1,
    // backgroundColor: Colors.ORANGE.default,
    // opacity: 0.4,
    // backgroundColor: Colors.BORDER.light,
    width: width * 0.95,
    alignSelf: 'center',
  },
  notificationsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  notifications: {
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
  logout: {
    marginLeft: '5%',
    marginBottom: 32,
  },
  test: {
    position: 'absolute',
    width: width,
    height: IS_IPHONE ? '24%' : '23%',
    // height: IS_IPHONE_X ? '24%' : '23%',
    backgroundColor: Colors.ORANGE.default,
  },
});
