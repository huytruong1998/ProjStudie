import axios from 'axios';
import { GET_ALL_PRODUCT, CLEAR_ALL_PRODUCT } from './types';
import setAuthToken from '../utils/setAuthToken';

export const getallProduct = () => (dispatch) => {
    axios
        .get('/api/products/showallproducts')
        .then(res => dispatch({
            type: GET_ALL_PRODUCT,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ALL_PRODUCT,
            payload: {}
        }));
};

export const clearallProduct = () => ({
    type: CLEAR_ALL_PRODUCT
});