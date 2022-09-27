import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  UPLOAD_PROFILE_PIC_REQUEST,
  UPLOAD_PROFILE_PIC_SUCCESS,
  UPLOAD_PROFILE_PIC_FAILURE,
  UPDATE_USER_DATA,
} from '../../actions/types';

import axiosInstance from '../../../api';
import url from '../../../api/url';

function* fetchData(action) {
  try {
    const {authTokens} = yield select(state => state.reducer.auth);
    const {payload, onResponse} = action;

    const URL = url._profilePicUpload;

    const sendData = {
      method: 'POST',
      url: URL,
      data: {
        image: payload.imageBase64,
        imageName: payload.imageName,
      },
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
    };

    const data = yield call(axiosInstance, sendData);

    yield put({
      type: UPLOAD_PROFILE_PIC_SUCCESS,
      data: data.data,
    });

    yield put({
      type: UPDATE_USER_DATA,
      payload: {user: data?.data?.data, tokens: authTokens},
    });

    yield call(onResponse, data.data);
  } catch (error) {
    const {onResponse} = action;
    yield put({
      type: UPLOAD_PROFILE_PIC_FAILURE,
      error,
    });
    yield call(onResponse, 'error');
  }
}

function* dataSaga() {
  yield takeEvery(UPLOAD_PROFILE_PIC_REQUEST, fetchData);
}

export default dataSaga;
