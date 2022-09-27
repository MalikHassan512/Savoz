import {StyleSheet, Platform} from 'react-native';
import {Colors, IS_IPHONE_X} from '../../../constants';
import Fonts from '../../../constants/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE.container,
  },
  header: {
    // marginTop: Platform.OS === 'android' ? -10 : IS_IPHONE_X ? 5 : 15,
    marginTop: -10,
    marginHorizontal: 8,
  },
  listViewContainer: {
    paddingHorizontal: '5%',
  },
  transparentView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.BLACK.default,
    opacity: 0.4,
  },
  searchSuggestionContainer: {
    position: 'absolute',
    backgroundColor: Colors.WHITE.default,
    width: '100%',
    paddingHorizontal: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderWidth: 0.5,
    borderColor: Colors.BORDER.default,
    borderTopWidth: 0,
    marginTop: 20,
  },
  searchSuggestionText: {
    fontSize: 14,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    fontFamily: Fonts.GILROY.Regular,
  },
});
