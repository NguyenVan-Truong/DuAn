import React, { useState, useEffect } from 'react';
import { Table, Spin, message, Button, Popconfirm } from 'antd';
import instance from '~/apis';
import { Order } from '~/interfaces/Order';
import { useNavigate } from 'react-router-dom';

const OrdersList = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigator = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await instance.get('/orders'); // Đường dẫn API để lấy danh sách đơn hàng
                setOrders(response.data.orders);
            } catch (error) {
                setError('Lỗi khi lấy danh sách đơn hàng');
                console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleUpdate = (orderId: string) => {
        // Xử lý logic cập nhật đơn hàng
        console.log('Cập nhật đơn hàng với ID:', orderId);
        navigator(`/admin/order/${orderId}`);
    };

    const handleConfirm = async (orderId: string) => {
        // Xử lý logic huỷ đơn hàng
        console.log('Huỷ đơn hàng với ID:', orderId);

        try {
            await instance.delete(`/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId));
            message.success('Đơn hàng đã được huỷ thành công');
        } catch (error) {
            message.error('Lỗi khi huỷ đơn hàng');
            console.error('Lỗi khi huỷ đơn hàng:', error);

        }
    };

    const handleCancel = () => {
        // Xử lý logic khi huỷ hành động huỷ đơn hàng
        console.log('Huỷ hành động huỷ đơn hàng');
        message.error('Huỷ Xoá Đơn hàng Thành Công ');
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'userId',
            key: 'userId',
            render: (userId: { email: string } | null) => userId ? userId.email : 'Đã bị xoá tài khoản',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            render: (products: { product: { title: string } }[]) => products.map(product => product.product.title).join(', '),
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
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice: number) => totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Ngày mua',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: Date) => new Date(createdAt).toLocaleDateString(),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_id: string, record: Order) => (
                <span>
                    <Button
                        onClick={() => handleUpdate(record._id)}
                        style={{ marginRight: 8 }}
                    >
                        Cập nhật
                    </Button>
                    <Popconfirm
                        title="Bạn chắc chắn muốn huỷ đơn hàng này?"
                        onConfirm={() => handleConfirm(record._id)}
                        onCancel={handleCancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>
                            Huỷ
                        </Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    if (loading) return <Spin size="large" />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Danh sách đơn hàng</h2>
            <Table dataSource={orders} columns={columns} rowKey="_id" />
        </div>
    );
};

export default OrdersList;
