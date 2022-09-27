import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  ADD_FAVOURITE_SUCCESS,
  ADD_FAVOURITE_REQUEST,
  ADD_FAVOURITE_FAILURE,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';
import {useSelector} from 'react-redux';

function* fetchData(action) {
  try {
    const {authTokens} = yield select(state => state.reducer.auth);
    const {payload, extras, onResponse} = action;
    const URL = url.addToFavourite;

    let params = {};

    Object.keys(payload).forEach(key => {
      if (key !== 'currentId') {
        params = {...params, [key]: payload[key]};
        // alert('this is current id');
      }
    });

    const sendData = {
      method: 'POST',
      url: URL,
      data: params,
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
    };
    console.log('ADD_FAVOURITE API send data: ', JSON.stringify(sendData));
    const data = yield call(axiosInstance, sendData);

    console.log('ADD_FAVOURITE API success ', data.data.data);
    let obj = {...extras.item, productFavouriteId: data.data.data.id};
    yield put({
      type: ADD_FAVOURITE_SUCCESS,
      data: obj,
    });
    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    console.log('ADD_FAVOURITE API fails: ', error?.response?.data);
    yield put({
      type: ADD_FAVOURITE_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(ADD_FAVOURITE_REQUEST, fetchData);
}

export default dataSaga;
