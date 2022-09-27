// axios

import axios from 'axios';
import Env from './env';
// import constants from '../const';
import {Alert} from 'react-native';

const baseURL = Env.baseURL;

axios.defaults.timeout = 30 * 1000;

const axiosInstance = axios.create({baseURL});

axiosInstance.interceptors.request.use(
  async config => {
    config.headers['x-api-key'] = Env.apiKey;
    return config;
  },
  error => Promise.reject(error),
);
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.log(error.response);
      if (error.response.data.message) {
      }
      if (error.response.status === 401) {
        //  TODO: navigate back to login screen
        // constants.DropDownAlert.showDropdownAlert(
        //   'error',
        //   '',
        //   error.response.data.message.toString(),
        // );
        // Alert.alert('error', error.response.data.message.toString());
      } else if (error.response.status === 403) {
      } else if (error.response.status === 404) {
      } else if (error.response.status === 405) {
      } else if (error.response.status === 422) {
      } else if (error.response.status >= 500) {
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
