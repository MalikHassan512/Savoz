import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Modal, Pressable} from 'react-native';
import styles from './styles';
import strings from '../../../../constants/strings';
import moment from 'moment';
import {Colors} from '../../../../constants';
import {NoDataView, OrderDelieveredModal} from '../../../../components';
import {useNavigation} from '@react-navigation/native';

const ActiveOrders = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const {data} = props;

  let statusColor = Colors.GREEN.dark;
  let dataLength = data.filter(order => order.orderStatus !== 'Delivered');
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('CartTab', {screen: 'OrderTrack'});
        // alert('Clicked');
      }}>
      {/* // <Pressable onPress={() => setModalVisible(!modalVisible)}> */}
      {/* //   <OrderDelieveredModal */}
      {/* //     modalVisible={modalVisible} */}
      {/* //     onPress={() => setModalVisible(false)} */}
      {/* //   /> */}

      {dataLength.length === 0 && (
        <NoDataView text={strings.noOrderToDisplay} />
      )}
      {data.map(order => {
        if (order?.orderId == null) {
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
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '6%',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.textsAll]}>{strings.date}</Text>
                <Text style={[styles.textsAll]}>
                  {moment(order.orderCreatedAt).format('DD-MM-YY')}
                </Text>
                {/*<Text style={[styles.textsAll]}>{OrderDate}</Text>*/}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '6%',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.textsAll]}>{strings.totalPrice}</Text>
                <Text
                  style={[
                    styles.textsAll,
                  ]}>{`$ ${order?.orderTotalPayable?.toFixed(2)}`}</Text>
                {/*<Text style={[styles.textsAll]}>{OrderTotalPrice}</Text>*/}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '6%',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.orderStatus, {color: statusColor}]}>
                  {strings.orderStatus}
                </Text>
                <Text style={[styles.orderStatus, {color: statusColor}]}>
                  {order.orderStatus}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
      {/* // </Pressable> */}
    </Pressable>
  );
};

export default ActiveOrders;
