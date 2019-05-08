import { GET_ALL_PRODUCT, CLEAR_ALL_PRODUCT} from '../action/types';

const initialState = {
    products: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                products: action.payload,
            };
        case CLEAR_ALL_PRODUCT:
            return {
                ...state,
                products: null
            };
        default:
            return state;
    }
}
