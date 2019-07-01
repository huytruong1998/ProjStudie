import axios from 'axios';
import { GET_ALL_PRODUCT, CLEAR_ALL_PRODUCT, GET_PRODUCT, ADD_TO_CART, GET_ERRORS, BUY_PRODUCT, CHECK_STOCK, SHOW_CART } from './types';


export const getallProduct = () => (dispatch) => {
    axios
        .get('/api/products/showallproducts')
        .then(res => dispatch({
            type: GET_ALL_PRODUCT,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
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
                type: GET_ERRORS,
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
export const addproduct = (addData) => (dispatch) => {
    axios
        .post(`/api/products/addproducts`, addData)
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}



export const addtocart = (cartData) => ({
    type: ADD_TO_CART,
    payload: cartData
});

export const showcart = ()=>({
    type: SHOW_CART
})

export const checkstock = (itemData) => (dispatch) => {
    axios
        .post(`/api/products/checkstock`, itemData)
        .then(res =>
            dispatch({
                type: CHECK_STOCK,
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

export const clearallProduct = () => ({
    type: CLEAR_ALL_PRODUCT
});

export const editproduct = (productdata,id) => (dispatch)=>{
    axios
        .post(`/api/products/${id}/admin/edit`, productdata)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}