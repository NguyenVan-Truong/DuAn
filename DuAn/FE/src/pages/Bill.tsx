import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '~/apis';
import { Cart } from '~/interfaces/Cart';

const Bill: React.FC = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const navigator = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await instance.get('/carts');
                setCart(response.data.cart);
                console.log(response.data.cart);
            } catch (error) {
                console.error('Lỗi khi lấy giỏ hàng:', error);
            }
        };

        fetchCart();
    }, []);

    const handleCheckout = async () => {
        try {
            if (!cart) return;

            // Gọi API tạo đơn hàng
            const response = await instance.post('/orders', {
                userId: cart.userId._id,
                products: cart.products.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity
                })),
                totalPrice: cart.totalPrice,
                status: 'pending',
            });
            message.success('Tạo đơn hàng thành công!');
            // Xóa giỏ hàng sau khi tạo đơn hàng thành công
            // await instance.delete('/carts');
            // Chuyển đến trang hiển thị đơn hàng
            navigator(`/orders/${response.data.order._id}`);

        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng:', error);
        }
    };

    const handleCancel = () => {
        navigator('/cart');
    };

    if (!cart) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
                    <div className="card-body">
                        <h1 className="card-title mb-4 text-center">Xác nhận thanh toán</h1>

                        <div className="mb-4">
                            <h5 className="card-title">Thông tin người dùng</h5>
                            {/* <p>Tên: {cart.userId._id}</p> */}
                            <p>Email: {cart.userId.email}</p>
                        </div>

                        <div className="mb-4">
                            <h5 className="card-title">Thông tin sản phẩm</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ảnh</th>
                                        <th>Tên Sản Phẩm</th>
                                        <th>Giá</th>
                                        <th>Số</th>
                                        <th>Tổng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.products.map((item, index) => (
                                        <tr key={item.product._id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.title}
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td className="text-truncate" style={{ maxWidth: '150px' }}>
                                                {item.product.title}
                                            </td>
                                            <td>{item.product.price} VND</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.quantity * item.product.price} VND</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-center">Tổng tiền: {cart.totalPrice} VND</h3>
                        {/* <div>
                            <select name="" id=""> Mời chọn thanh toán</select>
                            <option value="">Thanh toán tiến mắt</option>
                            <option value="">Thanh toán Online</option>
                        </div> */}
                        <div className="d-flex  mt-4">
                            <Button type="text" danger onClick={handleCancel}>
                                Hủy
                            </Button>
                            <Button onClick={handleCheckout}>
                                Xác nhận thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bill;
