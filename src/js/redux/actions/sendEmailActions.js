import { actionTypes as types, urls } from '../constants';
import { post, get } from '../helpers';

export const sendEmail = ({data, serviceUrl}) => (dispatch) => {
  // console.log('inside action');
  // console.log(data);
  dispatch({ type: types.SEND_EMAIL_REQUEST });
  post({
    url: serviceUrl,
    body: data,
    success: types.SEND_EMAIL_SUCCESS,
    dispatch
  })
};

export const dismissError = () => (dispatch) => {
  const data = '';
  dispatch({ type: types.SERVICE_ERROR, data });
}

export const dismissSuccess = () => (dispatch) => {
  const data = '';
  dispatch({ type: types.SEND_EMAIL_SUCCESS, data });
}
