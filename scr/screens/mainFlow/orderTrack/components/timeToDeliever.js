import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Fonts} from '../../../../constants';
import strings from '../../../../constants/strings';

const TimeToDeliever = () => {
  return (
    <>
      <View style={styles.row}>
        <View style={styles.container}>
          <Image
            source={require('../../../../assets/images/delieveryClock.png')}
            style={styles.clockImage}
          />
          <Image
            source={require('../../../../assets/images/dottedDieleveryLines.png')}
            style={styles.dottedLine}
          />
          <Image
            source={require('../../../../assets/images/pinLocation.png')}
            style={styles.pinlocation}
          />
        </View>

        <View style={styles.textDetailContainer}>
          <Text style={styles.heading}>{strings.deliveryTime}</Text>
          <Text style={styles.mainDetail}>{strings.mints15}</Text>

          <Text style={[styles.heading, {marginTop: 28}]}>
            {strings.yourAddress}
          </Text>
          <Text style={styles.mainDetail} numberOfLines={1}>
            {strings.fakeadress}
          </Text>
        </View>
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  container: {
    marginLeft: 35.7,
    marginTop: 45,
    alignSelf: 'flex-start',
  },

  clockImage: {width: 24, height: 24},
  dottedLine: {height: 40, width: 2, marginLeft: 11},
  pinlocation: {width: 24, height: 24, marginTop: 5},
  mainDetail: {
    fontFamily: Fonts.GILROY.Medium,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  heading: {fontFamily: Fonts.GILROY.Medium, fontSize: 14},
  textDetailContainer: {marginTop: 36, marginLeft: 14},
});

//make this component available to the app
export default TimeToDeliever;
