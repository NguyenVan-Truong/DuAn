import React, { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import instance from '~/apis';
import { TProduct } from '~/interfaces/Product';
import productReducer from '../../reducers/productReducer';

type ProductContextType = {
    state: { products: TProduct[] };
    onRemove: (_id: number | string) => void;
    handleAdd: (product: TProduct) => void;
    handleEditProduct: (product: TProduct) => void;
};

export const ProductContext = createContext({} as ProductContextType);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(productReducer, { products: [] });
    const nav = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get('/products/list');
                // console.log('Dữ liệu sản phẩm:', data.data.docs);
                dispatch({ type: 'SET_PRODUCTS', payload: data.data });
                // console.log('data:', data);
            } catch (error) {
                console.error('Không thể lấy dữ liệu sản phẩm:', error);
            }
        })();
    }, []);

    const onRemove = async (_id: number | string) => {
        try {
            await instance.delete(`/products/${_id}`);
            dispatch({ type: 'DELETE_PRODUCT', payload: _id });
            messageApi.open({
                type: 'success',
                content: 'Sản phẩm đã được xóa thành công!',
            });
        } catch (error) {
            console.error('Failed to delete product:', error);
            messageApi.open({
                type: 'error',
                content: 'Xóa sản phẩm thất bại!',
            });
        }
    };

    const handleAdd = async (product: TProduct) => {
        try {
            console.log('product:', product);
            const { data } = await instance.post('/products', product);
            dispatch({ type: 'ADD_PRODUCT', payload: data.data });
            console.log('data:', data.data);
            nav('/admin');
            messageApi.open({
                type: 'success',
                content: 'Sản phẩm đã được thêm thành công!',
            });
        } catch (error) {
            console.error('Error:', error);
            messageApi.open({
                type: 'error',
                content: 'Thêm sản phẩm thất bại!',
            });
        }
    };

    const handleEditProduct = async (product: TProduct) => {
        try {
            await instance.patch(`/products/${product._id}`, product);
            dispatch({ type: 'UPDATE_PRODUCT', payload: product });
            nav('/admin');
            messageApi.open({
                type: 'success',
                content: 'Sản phẩm đã được sửa thành công!',
            });
        } catch (error) {
            console.error('Error:', error);
            messageApi.open({
                type: 'error',
                content: 'Cập nhật sản phẩm thất bại!',
            });
        }
    };

    return (
        <ProductContext.Provider value={{ state, onRemove, handleAdd, handleEditProduct }}>
            {contextHolder}
            {children}
        </ProductContext.Provider>
    );
};
