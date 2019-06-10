import { GET_ALL_ORDER, CHANGE_ORDER_STATUS } from '../action/types';

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

        case CHANGE_ORDER_STATUS:
            return {
                ...state
            };

        default:
            return state;
    }
}
