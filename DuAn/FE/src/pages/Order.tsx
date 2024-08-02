import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '~/apis';
import { Order } from '~/interfaces/Order';

const Orders: React.FC = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        (async () => {
            try {
                if (!id) {
                    console.error('orderId is undefined');
                    return;
                }

                // Fetch dữ liệu từ API
                const response = await instance.get(`/orders/${id}`);
                console.log('Dữ liệu trả về từ API:', response.data.order);

                // Kiểm tra và set dữ liệu đơn hàng
                if (response.data) {
                    setOrder(response.data.order);
                } else {
                    console.error('Expected an order object but got:', typeof response.data);
                    setOrder(null);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách đơn hàng:', error);
                setOrder(null); // Đảm bảo setOrder là null trong trường hợp có lỗi
            }
        })();
    }, [id]);

    if (!order) return <p className="text-center">Không có đơn hàng nào.</p>;

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="card-body">
                    <h5 className="card-title text-center">Thông tin đơn hàng</h5>
                    <p><strong>Mã đơn hàng:</strong> {order._id}</p>
                    <p><strong>Trạng thái:</strong> {order.status}</p>
                    <p><strong>Tổng tiền:</strong> {order.totalPrice} VND</p>
                    <h6 className="mt-4 text-center">Sản phẩm:</h6>
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Ảnh</th>
                                <th className="text-nowrap">Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.products && Array.isArray(order.products) ? (
                                order.products.map((item, index) => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>Không có sản phẩm nào.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <p className="text-center"><strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Orders;
