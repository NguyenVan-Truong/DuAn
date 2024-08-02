import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
// import axios from 'axios';
import { Order } from '~/interfaces/Order';
import instance from '~/apis';
// import './OrderYour.css'; // Đảm bảo đường dẫn chính xác

const OrderYour: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Lấy userId từ localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await instance.get(`/orders/user/${userId}`);

                // Kiểm tra kiểu dữ liệu của response.data
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    console.error('Dữ liệu không phải là mảng:', response.data);
                    message.error('Dữ liệu không hợp lệ');
                }
            } catch (error) {
                console.error('Lỗi khi tải đơn hàng:', error);
                message.error('Lỗi khi tải danh sách đơn hàng');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    const columns = [
        { title: 'Mã đơn hàng', dataIndex: '_id', key: '_id' },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
        { title: 'Tổng tiền', dataIndex: 'totalPrice', key: 'totalPrice' },
        {
            title: 'Tên sản phẩm',
            key: 'productName',
            render: (text: any, record: Order) => (
                <div>
                    {record.products.map((item, index) => (
                        <div key={index}>{item.product.title}</div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            render: (text: any, record: Order) => (
                <div>
                    {record.products.map((item, index) => (
                        <div key={index}>{item.quantity}</div>
                    ))}
                </div>
            ),
        },
        { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
    ];

    return (
        <div className="container">
            <h2 className="text-center mb-4">Đơn Hàng của bạn</h2>
            <div className="table-container">
                <Table
                    dataSource={orders}
                    columns={columns}
                    rowKey="_id"
                    loading={loading}
                    locale={{ emptyText: 'Không có đơn hàng nào' }}
                />
            </div>
        </div>
    );
};

export default OrderYour;
