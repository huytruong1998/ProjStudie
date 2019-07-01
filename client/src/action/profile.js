import axios from 'axios';
import { GET_ERRORS, GET_PROFILE_INFO } from './types';

export const getallProfile = (id) => (dispatch) => {
    axios
        .get(`/api/users/profileinfo/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE_INFO,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: null
        }));
};


export const editprofile = (profiledata, id) => (dispatch) => {
    axios
        .post(`/api/users/addprofile/${id}`, profiledata)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}