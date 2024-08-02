import React, { useEffect, useState } from 'react';
import instance from '~/apis';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Image } from 'antd';// Đảm bảo bạn đã import Bootstrap CSS

const Cart = () => {
    const [cart, setCart] = useState<any>(null);
    const history = useNavigate();

    const getCart = async () => {
        try {
            const response = await instance.get('/carts');
            return response.data.cart;
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
            throw error;
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            await instance.delete(`/carts/${productId}`);
            setCart((prevCart: any) => ({
                ...prevCart,
                products: prevCart.products.filter((item: any) => item.product._id !== productId),
                totalPrice: prevCart.totalPrice - prevCart.products.find((item: any) => item.product._id === productId)!.quantity * prevCart.products.find((item: any) => item.product._id === productId)!.product.price
            }));
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await getCart();
                setCart(cartData);
            } catch (err) {
                console.error('Lỗi khi lấy giỏ hàng:', err);
            }
        };

        fetchCart();
    }, []);

    if (!cart) return <p>Giỏ hàng của bạn đang trống.</p>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Giỏ hàng của bạn</h1>
            <table className="table table-bordered mb-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.products.map((item: any, index: any) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <Image
                                    src={item.product.image}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td className="text-truncate" style={{ maxWidth: '200px' }}>
                                {item.product.title}
                            </td>
                            <td>{item.product.price} VND</td>
                            <td>{item.quantity}</td>
                            <td>{item.product.price * item.quantity} VND</td>
                            <td>
                                <Button onClick={() => removeFromCart(item.product._id)}>Xoá</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Tổng tiền: {cart.totalPrice} VND</h3>
            <Link to="/bill"><Button >Mua Ngay</Button></Link>
        </div>
    );
};

export default Cart;
