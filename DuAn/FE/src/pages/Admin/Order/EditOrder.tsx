import z from 'zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import instance from '~/apis';
import { Order } from '~/interfaces/Order';

// Schema xác thực cho form
const orderSchema = z.object({
    status: z.enum(['Hàng chờ', 'Đang giao', 'Đã Giao', 'Huỷ']),
});

const EditOrder = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<Order>({
        resolver: zodResolver(orderSchema),
    });

    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get(`/orders/${id}`);
                if (data && data.order) {
                    const fetchedOrder = data.order;
                    setOrder(fetchedOrder);
                    setValue('status', fetchedOrder.status);
                } else {
                    console.error('Dữ liệu đơn hàng không hợp lệ:', data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
            }
        })();
    }, [id, setValue]);

    useEffect(() => {
        if (order) {
            reset(order);
        }
    }, [order, reset]);

    const onSubmit: SubmitHandler<Order> = async (data) => {
        try {
            await instance.patch(`/orders/${id}`, { status: data.status });
            navigate('/admin/order');
        } catch (error) {
            console.error('Lỗi khi cập nhật đơn hàng:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card p-4 border border-secondary shadow" style={{ maxWidth: '600px', width: '100%' }}>
                <h1 className="text-center">Sửa Trạng Thái Đơn Hàng</h1>
                <hr />
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Trạng Thái</label>
                    <select
                        className="form-control"
                        id="status"
                        {...register('status')}
                    >
                        <option value="pending">pending</option>
                        <option value="completed">completed</option>
                        <option value="shipping">shipping</option>
                        <option value="cancel">cancel</option>
                    </select>
                    {errors.status && <p className="text-danger">{errors.status.message}</p>}
                </div>
                <button className="btn btn-primary w-100" type="submit">
                    Sửa
                </button>
            </form>
        </div>
    );
};

export default EditOrder;
