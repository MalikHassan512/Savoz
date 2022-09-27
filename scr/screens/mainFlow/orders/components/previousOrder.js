import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import strings from '../../../../constants/strings';
import moment from 'moment';
import {NoDataView} from '../../../../components';

const PreviousOrders = props => {
  const {data} = props;

  let dataLength = data.filter(order => order.orderStatus === 'Delivered');
  return (
    <>
      {dataLength.length === 0 && (
        <NoDataView text={strings.noOrderToDisplay} />
      )}
      {data.map(order => {
        if (order.orderStatus !== 'Delivered' || order?.orderId == null) {
          return null;
        }
        return (
          <View
            key={order?.orderId}
            style={[styles.activeOrderCon, styles.shadow]}>
            <View style={styles.margin}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.textsAll}>{strings.orderID}</Text>
                <Text style={styles.textsAll}>{order.orderId}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={[styles.textsAll]}>{strings.date}</Text>
                <Text style={[styles.textsAll]}>
                  {moment(order.orderCreatedAt).format('DD-MM-YY')}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={[styles.textsAll]}>{strings.totalPrice}</Text>
                <Text
                  style={[
                    styles.textsAll,
                  ]}>{`$ ${order?.orderTotalPayable?.toFixed(2)}`}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={[styles.textsAll]}>{strings.yourRated}</Text>
                <View style={styles.ratingCon}>
                  <Image
                    style={styles.icStar}
                    source={require('../../../../assets/images/ic_star.png')}
                  />
                  <Text
                    style={[
                      styles.textsAll,
                      {alignSelf: 'flex-end', marginStart: 5},
                    ]}>
                    {order?.orderRating || '0.0'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default PreviousOrders;
