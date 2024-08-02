import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContext } from 'react';
import instance from '~/apis';
import { User } from '~/interfaces/User';
import userReducer from './../../reducers/userRedecer';
import { message } from 'antd';

type UserContextType = {
    state: { users: User[] };
    // onSubmitProduct: (data: TProduct) => void;
    onRemove: (_id: number | string) => void;
    handleAdd: (user: User) => void;
    handleEdit: (user: User) => void;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, { users: [] });
    const nav = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get('/users');
                // console.log('Dữ liệu tài khoản:', data.data);
                dispatch({ type: 'SET_USERS', payload: data.data });
            } catch (error) {
                console.error('Không thể lấy dữ liệu tài khoản:', error);
            }
        })();
    }, []);

    const onRemove = async (_id: number | string) => {
        try {
            await instance.delete(`/users/${_id}`);
            dispatch({ type: 'DELETE_USERS', payload: _id });
            messageApi.open({
                type: 'success',
                content: 'Tài khoản đã được xóa thành công!',
            });
        } catch (error) {
            console.error('Failed to delete user:', error);
            messageApi.open({
                type: 'error',
                content: 'Tài khoản đã được xóa không thành công!',
            });
        }
    };

    const handleAdd = async (user: User) => {
        try {
            const { data } = await instance.post('/users/signup', user);
            dispatch({ type: 'ADD_USERS', payload: data.data });
            messageApi.open({
                type: 'success',
                content: 'Tài khoản đã được thêm thành công!',
            });
            nav('/admin/user');
        } catch (error) {
            console.error('Error:', error);
            messageApi.open({
                type: 'error',
                content: 'Tài khoản đã được thêm không thành công!',
            });
        }
    };

    const handleEdit = async (user: User) => {
        try {
            await instance.patch(`/users/${user._id}`, user);
            dispatch({ type: 'UPDATE_USERS', payload: user });
            messageApi.open({
                type: 'success',
                content: 'Tài khoản đã được sửa thành công!',
            });
            nav('/admin/user');
        } catch (error) {
            console.error('Error:', error);
            messageApi.open({
                type: 'error',
                content: 'Tài khoản đã được sửa không thành công!',
            });
        }
    };

    return (
        <UserContext.Provider value={{ state, onRemove, handleAdd, handleEdit }}>
            {contextHolder}
            {children}
        </UserContext.Provider>
    );
};
