
import { User } from '../src/interfaces/User';

type State = {
    users: User[];
};

type Action =
    | { type: 'SET_USERS'; payload: User[] }
    | { type: 'ADD_USERS'; payload: User }
    | { type: 'UPDATE_USERS'; payload: User }
    | { type: 'DELETE_USERS'; payload: number | string }

const userReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload,
            };
        case 'ADD_USERS':
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case 'UPDATE_USERS':
            return {
                ...state,
                users: state.users.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                ),
            };
        case 'DELETE_USERS':
            return {
                ...state,
                users: state.users.filter((item) => item._id !== action.payload),
            };
        default:
            return state;
    }
};

export default userReducer;
