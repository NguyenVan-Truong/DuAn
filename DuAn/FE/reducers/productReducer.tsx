
import { TProduct } from '../src/interfaces/Product';

type State = {
    products: TProduct[];
};

type Action =
    | { type: 'SET_PRODUCTS'; payload: TProduct[] }
    | { type: 'ADD_PRODUCT'; payload: TProduct }
    | { type: 'UPDATE_PRODUCT'; payload: TProduct }
    | { type: 'DELETE_PRODUCT'; payload: number | string }

const productReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            };
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                ),
            };
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter((item) => item._id !== action.payload),
            };
        default:
            return state;
    }
};

export default productReducer;
