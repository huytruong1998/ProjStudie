import axios from 'axios';
import { GET_ALL_PRODUCT, CLEAR_ALL_PRODUCT, GET_PRODUCT, ADD_TO_CART, GET_ERRORS, BUY_PRODUCT } from './types';
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

export const getproduct = (id) => (dispatch) =>{
    axios
        .get(`/api/products/${id}`)
        .then(res =>
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PRODUCT,
                payload: null
            })
        );
}

export const buyproduct = (buyData) => (dispatch) => {
    axios
        .post(`/api/products/buyproducts`, buyData)
        .then(res =>
            dispatch({
                type: BUY_PRODUCT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const addtocart = (cartData) => ({
    type: ADD_TO_CART,
    payload: cartData
});

export const clearallProduct = () => ({
    type: CLEAR_ALL_PRODUCT
});