import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import styles from './styles';
import RiderTip from './components/riderTip';
import RatingStars from './components/ratingStars';
import strings from '../../constants/strings';
import Button from '../button';

const OrderDelieveredModal = props => {
  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      transparent={true}>
      <View>
        <Pressable
          style={styles.closeModal}
          onPress={() => props.onPress(false)}>
          <Text> </Text>
        </Pressable>

        {/* <OrderDelieveredModal onPress={() => setModalVisible(false)} /> */}
      </View>

      <KeyboardAvoidingView behavior="position">
        <View style={styles.modalContentView}>
          <TouchableOpacity
            style={styles.crossCon}
            onPress={() => props.onPress(false)}>
            <Image
              resizeMode="contain"
              //   source={require('../../assets/Images/ratingCross.png')}
              source={require('../../assets/images/ratingCross.png')}
              style={styles.crossSign}
            />
          </TouchableOpacity>
          <View style={styles.TopTextView}>
            <Text style={styles.successMsg}>{strings.grocerryDelivered}</Text>
            <Text style={styles.successMsg}>successfully</Text>
          </View>

          <View style={styles.RateTextView}>
            <Text style={styles.rateText}>Rate your Experience</Text>
          </View>

          <RatingStars />

          <View style={styles.textInputView}>
            <TextInput
              multiline={true}
              placeholder="your review"
              style={styles.inputStyle}
            />
          </View>

          <View style={styles.TipTextView}>
            <Text style={styles.tipText}>Give your rider tip</Text>
          </View>

          <RiderTip />

          <Button
            title={strings.rateExperience}
            onPress={() => props.onPress(false)}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// const styles = StyleSheet.create({});

export default OrderDelieveredModal;
