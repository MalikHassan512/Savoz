import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Fonts} from '../../../../constants';

const ContactToPerson = () => {
  return (
    <View style={styles.container}>
      <View style={styles.personDetailView}>
        <Image
          source={require('../../../../assets/images/profile_pic.png')}
          style={styles.picStyle}
        />
        <View style={styles.personTextView}>
          <Text style={styles.personName}>Hello</Text>
          <Text style={styles.subHeading}>Dasher</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Image
          source={require('../../../../assets/images/callDelieveryIcon.png')}
          style={styles.callAndSmsImage}
        />

        <Image
          source={require('../../../../assets/images/smsDelievery.png')}
          style={styles.callAndSmsImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '31%',
    // width: 112,
    justifyContent: 'space-between',
  },
  container: {
    paddingHorizontal: 16,
    marginTop: 42,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  personDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picStyle: {width: 50, height: 50},
  personTextView: {marginLeft: 11},
  personName: {
    fontFamily: Fonts.GILROY.SemiBold,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeading: {fontFamily: Fonts.GILROY.Medium, color: '#979797'},
  callAndSmsImage: {width: 48, height: 48},
});

export default ContactToPerson;
