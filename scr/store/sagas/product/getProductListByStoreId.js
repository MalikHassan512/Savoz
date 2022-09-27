// import {put, takeEvery, call} from 'redux-saga/effects';
// import {
//   PRODUCT_LISTING_BY_STORE_ID_SUCCESS,
//   PRODUCT_LISTING_BY_STORE_ID_REQUEST,
//   PRODUCT_LISTING_BY_STORE_ID_FAILURE,
// } from '../../actions/types';
//
// import axiosInstance from '../../../api';
// import url from '../../../api/url';
//
// function* fetchData(action) {
//   try {
//     const {payload, onResponse} = action;
//     const URL = url.productListing;
//     const sendData = {
//       method: 'POST',
//       url: URL,
//       data: payload,
//     };
//     console.log('PRODUCT_LISTING_BY_STORE_ID API send data: ', JSON.stringify(sendData));
//     const data = yield call(axiosInstance, sendData);
//     yield put({
//       type: PRODUCT_LISTING_BY_STORE_ID_SUCCESS,
//       data: data.data,
//     });
//     console.log('PRODUCT_LISTING_BY_STORE_ID API success');
//     yield call(onResponse, data.data);
//   } catch (error) {
//     const {onResponse} = action;
//     console.log('PRODUCT_LISTING_BY_STORE_ID API fails: ', error?.response?.data);
//     yield put({
//       type: PRODUCT_LISTING_BY_STORE_ID_FAILURE,
//       error,
//     });
//     yield call(onResponse, 'error');
//   }
// }
//
// function* dataSaga() {
//   yield takeEvery(PRODUCT_LISTING_BY_STORE_ID_REQUEST, fetchData);
// }
//
// export default dataSaga;
