import { GET_ALL_PRODUCT, GET_PRODUCT, CLEAR_ALL_PRODUCT, BUY_PRODUCT} from '../action/types';

const initialState = {
    products: null,
    product:null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                products: action.payload,
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            };

        case BUY_PRODUCT:
            return {
                ...state
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
