import axios from 'axios';
import { MAKE_ORDER, GET_ERRORS, GET_ALL_ORDER, CHANGE_ORDER_STATUS } from './types';

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

export const changestatus =(changeData) =>(dispatch)=>{
    axios
        .post('api/order/changestatus',changeData)
        .then(res=>dispatch({
            type: CHANGE_ORDER_STATUS,
            payload:res.data
        }))
        .catch(err=>dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
} 