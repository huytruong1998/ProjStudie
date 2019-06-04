import axios from 'axios';
import { MAKE_ORDER, GET_ERRORS, GET_ALL_ORDER } from './types';

export const makeorder = (orderdata) => (dispatch) => {
    axios
        .post('/api/order/array', orderdata)
        .then(res => dispatch({
            type: MAKE_ORDER,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};


export const getallorder = () => (dispatch) =>{
    axios
        .get('api/order/getallorder')
        .then(res => dispatch({
            type: GET_ALL_ORDER,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: {}
        }));
}