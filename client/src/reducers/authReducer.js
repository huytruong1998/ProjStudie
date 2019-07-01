import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER,GET_PROFILE_INFO } from '../action/types';


const initialState = {
    isAuthenticated: false,
    user: {},
    profile:{}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case GET_PROFILE_INFO:
            return {
                ...state,
                profile: action.payload
            }; 
        default:
            return state;
    }
}