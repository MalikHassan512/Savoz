import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  // Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  DropDown,
  InputField,
  Button,
  AlertBox,
  Alert,
} from '../../../components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  googleMapAPIKey,
  validateEmail,
  validatePassword,
} from '../../../store/util';
import RNFS from 'react-native-fs';
import {
  logoutRequest,
  uploadProfilePicRequest,
  updateProfileRequest,
  updateUser,
  deleteProfile,
} from '../../../store/actions';
import {Colors, Constants, height, IS_IPHONE_X} from '../../../constants';
import useState from 'react-usestateref';
import PhoneInput from 'react-native-phone-input';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import FastImage from 'react-native-fast-image';
import strings from '../../../constants/strings';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const ref = useRef();
  const {userData, isLoading, errorMessage} = useSelector(
    state => state.reducer.profile,
  );
  const {authTokens} = useSelector(state => state.reducer.auth);

  console.log('userData: ', userData);

  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(userData?.title || 'Mr');
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [emailAddress, setEmailAddress] = useState(userData?.email);
  const [phoneNumber, setPhoneNumber] = useState(userData?.phone);
  const [date, setDate] = useState(userData?.dob);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(userData?.address || '');
  const [userLat, setUserLat] = useState(userData?.userLat);
  const [userLng, setUserLong] = useState(userData?.userLong);

  const [img, setImg] = useState(userData?.avatar);
  const [alertMsg, setAlertMsg, alertRef] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setDeleteAlert] = useState(false);
  const [showCamAlert, setCamAlert] = useState(false);
  const [country, setCountry] = useState('');

  useEffect(() => {
    console.log('ref is: ', ref);
    if (userData?.address) {
      ref.current.setAddressText(userData?.address);
    }
    AsyncStorage.getItem('country')
      .then(mCountry => {
        setCountry(mCountry);
      })
      .catch(err => {
        console.log('response (err) ===> ', JSON.stringify(err));
      });
  }, []);

  useEffect(() => {
    setAlertMsg(errorMessage);
  }, [errorMessage]);

  const deleteProfileHandler = () => {
    setDeleteAlert(false);
    let params = {
      userId: userData?.id,
      roleId: userData.roleId,
    };
    dispatch(
      deleteProfile(params, res => {
        if (res === 'error') {
          setShowAlert(true);
          // setTimeout(() => {
          //   alert(alertRef.current);
          // }, 500);
        } else {
          navigation.navigate('Landing');
        }
      }),
    );
  };
  const onButtonPress = () => {
    if (isEditable) {
      if (validateData() !== true) {
        // alert(validateData());
        setAlertMsg(validateData());
        setShowAlert(true);
        return;
      }
      let params = {
        email: emailAddress,
        title: title,
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
        // address: address,
      };
      if (address !== null && address !== '') {
        params = {...params, address: address};
      }
      if (date !== null) {
        params = {...params, dob: date};
      }
      if (userLat !== null) {
        params = {...params, userLat};
      }
      if (userLng !== null) {
        params = {...params, userLng};
      }

      dispatch(
        updateProfileRequest(params, res => {
          if (res === 'error') {
            setShowAlert(true);
            // setTimeout(() => {
            //   alert(alertRef.current);
            // }, 500);
          } else {
            // alert(strings.profileUpdatedSuccessfully);
            setAlertMsg(strings.profileUpdatedSuccessfully);
            setShowAlert(true);
            setIsEditable(!isEditable);
          }
        }),
      );
    } else {
      setIsEditable(!isEditable);
    }
  };

  const validateData = () => {
    let error = '';
    if (title === '') {
      error = strings.titleRequired;
    } else if (firstName.length < 2) {
      error = strings.firstNameRequired;
    } else if (lastName.length < 2) {
      error = strings.lastNameRequired;
    } else if (validateEmail(emailAddress) === null) {
      error = strings.enterValidEmail;
    } else if (phoneNumber.length < 12) {
      error = 'Phone number is required, please enter a valid number';
    }

    if (error.length > 0) {
      return error;
    } else {
      return true;
    }
  };

  const uploadImage = image => {
    setImg(image?.path);
    RNFS.readFile(image?.path, 'base64').then(b64String => {
      let mURI = image?.path.replace('///', '//');
      let fileName = mURI.split('/');
      fileName = fileName[fileName.length - 1].split('.')[0];

      dispatch(
        uploadProfilePicRequest(
          {imageBase64: b64String, imageName: fileName},
          res => {
            if (res === 'error') {
              setShowAlert(true);
              // setTimeout(() => {
              //   alert(alertRef.current);
              // }, 500);
            } else {
              // alert('Profile updated successfully');
              setAlertMsg(strings.profileUpdatedSuccessfully);
              setShowAlert(true);
            }
          },
        ),
      );
    });
  };
  const selectImageFromPhone = (isCamera: boolean) => {
    setCamAlert(false);

    let imageCropperResponse = isCamera
      ? ImagePicker.openCamera(Constants.CONST_CAMERA_OPTIONS)
      : ImagePicker.openPicker(Constants.CONST_CAMERA_OPTIONS);

    imageCropperResponse
      .then(image => uploadImage(image))
      .catch(e => console.log(e));
  };

  const onDelPress = () => {
    setDeleteAlert(true);
  };

  const loadingView = () => {
    return (
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          ...StyleSheet.absoluteFillObject,
        }}>
        <ActivityIndicator size={'large'} color={Colors.ORANGE.default} />
      </View>
    );
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : -200;

  return (
    <View style={styles.container}>
      <Header title={strings.profile} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView keyboardShouldPersistTaps={true} style={{flex: 1}}>
          <View style={styles.profilePicContainer}>
            <FastImage
              style={styles.profilePic}
              source={{uri: img}}
              fallback
              defaultSource={require('../../../assets/images/imgPlaceholder.png')}
            />
            <TouchableOpacity onPress={() => setCamAlert(true)}>
              <View style={styles.cameraIconContainer}>
                <Image
                  style={styles.cameraIcon}
                  source={require('../../../assets/images/ic_camera.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/*<DropDown*/}
          {/*  title="Title"*/}
          {/*  style={styles.inputField}*/}
          {/*  onChangeItem={item => setTitle(item)}*/}
          {/*  value={title}*/}
          {/*/>*/}
          <View style={styles.rowContainer}>
            <InputField
              readOnly={!isEditable}
              small
              title={strings.firstName}
              style={styles.inputField}
              onChangeText={text => setFirstName(text)}
              value={firstName}
            />
            <InputField
              readOnly={!isEditable}
              small
              title={strings.lastName}
              style={styles.inputField}
              onChangeText={text => setLastName(text)}
              value={lastName}
            />
          </View>
          <InputField
            // readOnly={!isEditable}
            readOnly={true}
            title={strings.emailAddress}
            style={styles.inputField}
            onChangeText={text => setEmailAddress(text)}
            value={emailAddress}
          />
          <PhoneInput
            disabled={!isEditable}
            autoFormat={true}
            initialValue={
              phoneNumber?.length > 3 && phoneNumber?.length < 16
                ? phoneNumber
                : ''
            }
            // initialCountry={country.toLowerCase()}
            onChangePhoneNumber={setPhoneNumber}
            textProps={{
              style: styles.inputStyle,
              placeholderTextColor: 'rgba(0, 0, 0, 0.6)',
              placeholder: strings.phoneNumber,
              maxLength: 15,
              color: Colors.BLACK.default,
            }}
            flagStyle={{height: 25, width: 35}}
            style={styles.phoneInputContainer}
          />

          <TouchableOpacity
            style={styles.datePickerBox}
            disabled={!isEditable}
            onPress={() => setOpen(true)}>
            <Text style={styles.dobText}>
              {date ? Moment(date).format('MMMM DD, yyy') : strings.dob}
            </Text>
          </TouchableOpacity>

          <View style={styles.addressBox}>
            <GooglePlacesAutocomplete
              minLength={2}
              ref={ref}
              enablePoweredByContainer={false}
              textInputProps={{
                editable: isEditable,
              }}
              placeholder={strings.enterAddressHere}
              onPress={(data, details = null) => {
                const userLocation = {
                  latitude: details?.geometry?.location.lat,
                  longitude: details?.geometry?.location.lng,
                };
                setAddress(data.description);
                setUserLat(userLocation.latitude);
                setUserLong(userLocation.longitude);
              }}
              fetchDetails={true}
              query={{
                key: googleMapAPIKey,
                language: 'en',
              }}
            />
          </View>
          {isEditable ? null : (
            <TouchableOpacity
              onPress={onDelPress}
              style={styles.deleteContainer}>
              <Image
                style={styles.deleteIcon}
                source={require('../../../assets/images/ic_delete.png')}
              />
              <Text style={styles.delete}>{strings.deleteYourProfile}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <Button
          isLoading={isLoading}
          white={isEditable ? false : true}
          onPress={onButtonPress}
          title={isEditable ? strings.save : strings.editProfile}
          style={styles.buttonStyle}
        />
        <DatePicker
          mode={'date'}
          modal
          open={open}
          date={new Date()}
          onConfirm={date => {
            console.log('date is: ', date);
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        {isLoading && loadingView()}
        {showDeleteAlert && (
          <AlertBox
            title={strings.deleteYourProfile}
            message={strings.profileDeleteConfirmation}
            onPress={deleteProfileHandler}
            buttonText={strings.delete}
            firstButtonText={'Cancel'}
            onPressFirstButton={() => setDeleteAlert(false)}
          />
        )}
      </KeyboardAvoidingView>
      {showCamAlert && (
        <AlertBox
          title={'Update Profile Pic'}
          onPress={() => selectImageFromPhone(false)}
          onPressFirstButton={() => selectImageFromPhone(true)}
          onClosePress={() => setCamAlert(false)}
          buttonText={'Open Gallery'}
          firstButtonText={'Open Camera'}
        />
      )}
      <Alert
        show={showAlert}
        message={alertRef.current}
        onPress={() => setShowAlert(false)}
      />
    </View>
  );
};

export default Profile;
