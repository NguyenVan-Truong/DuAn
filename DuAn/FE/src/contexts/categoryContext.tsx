import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContext } from 'react';
import instance from '~/apis';
import { Category } from '~/interfaces/Category';
import categoryReducer from '../../reducers/categoryReducer';
import { message } from 'antd';

type CategoryContextType = {
    state: { categorys: Category[] };
    // onSubmitProduct: (data: TProduct) => void;
    onRemove: (_id: number | string) => void;
    handleAdd: (Category: Category) => void;
    handleEdit: (Category: Category) => void;
};

export const CategoryContext = createContext({} as CategoryContextType);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(categoryReducer, { categorys: [] });
    const nav = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get('/categorys');
                // console.log('Dữ liệu Danh Mục:', data.data);
                dispatch({ type: 'SET_CATEGORIES', payload: data.data });
            } catch (error) {
                console.error('Không thể lấy dữ liệu category:', error);
            }
        })();
    }, []);

    const onRemove = async (_id: number | string) => {
        try {
            await instance.delete(`/categorys/${_id}`);
            dispatch({ type: 'DELETE_CATEGORIES', payload: _id });

        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const handleAdd = async (product: Category) => {
        try {
            const { data } = await instance.post('/categorys', product);
            dispatch({ type: 'ADD_CATEGORIES', payload: data.data });
            nav('/admin/category');
            message.success('Thêm danh mục thành công');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = async (category: Category) => {
        try {
            await instance.patch(`/categorys/${category._id}`, category);
            dispatch({ type: 'UPDATE_CATEGORIES', payload: category });
            nav('/admin/category');
            message.success('Cập nhật danh mục thành công');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <CategoryContext.Provider value={{ state, onRemove, handleAdd, handleEdit }}>
            {children}
        </CategoryContext.Provider>
    );
};
