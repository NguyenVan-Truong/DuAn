
import { Category } from '../src/interfaces/Category';

type State = {
    categorys: Category[];
};

type Action =
    | { type: 'SET_CATEGORIES'; payload: Category[] }
    | { type: 'ADD_CATEGORIES'; payload: Category }
    | { type: 'UPDATE_CATEGORIES'; payload: Category }
    | { type: 'DELETE_CATEGORIES'; payload: number | string }

const categoryReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                categorys: action.payload,
            };
        case 'ADD_CATEGORIES':
            return {
                ...state,
                categorys: [...state.categorys, action.payload],
            };
        case 'UPDATE_CATEGORIES':
            return {
                ...state,
                categorys: state.categorys.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                ),
            };
        case 'DELETE_CATEGORIES':
            return {
                ...state,
                categorys: state.categorys.filter((item) => item._id !== action.payload),
            };
        default:
            return state;
    }
};

export default categoryReducer;
