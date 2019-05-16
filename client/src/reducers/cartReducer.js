import isEmpty from '../validation/is-empty';

import { ADD_TO_CART } from '../action/types';

const initialState = {
    cart: []
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            console.log(action.payload);
        
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };

        default:
            return state;
    }
}
