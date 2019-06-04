import { GET_ALL_ORDER } from '../action/types';

const initialState = {
    orders: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ORDER:
            return {
                ...state,
                orders: action.payload,
            };

        default:
            return state;
    }
}
