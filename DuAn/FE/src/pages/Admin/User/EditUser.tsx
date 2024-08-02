import z from 'zod';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import instance from '~/apis';
import { User } from '~/interfaces/User';
import { UserContext } from '~/contexts/userContext';

const userSchema = z.object({
    email: z.string().email().min(2).max(255),
    role: z.enum(["member", "admin"]),
    avatar: z.string().optional(), // Thêm trường avatar nếu cần
});

const EditUser = () => {
    const { id } = useParams();
    const { handleEdit } = useContext(UserContext);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<User>({
        resolver: zodResolver(userSchema),
    });

    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get(`/users/${id}`);
                // Nếu dữ liệu có ảnh, đảm bảo nó được reset vào form
                reset(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
        })();
    }, [id, reset]);

    const onSubmit = async (data: User) => {
        try {
            // Đảm bảo bạn gửi toàn bộ dữ liệu bao gồm ảnh nếu cần
            await handleEdit({ ...data, _id: id });
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="centered-form mb-3">
                <div className="container d-flex justify-content-center align-items-center ">
                    <div className="card p-4 border border-secondary shadow">
                        <h1>Sửa Tài Khoản</h1>
                        <hr />
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Tên tài khoản</label>
                            <input
                                type="email"
                                className="form-control"
                                disabled
                                id="email"
                                placeholder="Mời Bạn Nhập Tên Tài Khoản"
                                {...register('email', { required: true })}
                            />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Vai Trò</label>
                            <select className="form-control" id="role" {...register('role', { required: true })}>
                                <option value="member">Member</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && <p className="text-danger">{errors.role.message}</p>}
                        </div>
                        {/* Hiển thị ảnh nếu có */}
                        <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                            <input
                                type="text"
                                className="form-control"
                                id="avatar"
                                placeholder="URL ảnh đại diện"
                                {...register('avatar')} readOnly
                            />
                        </div>
                        <button className="btn btn-primary w-100" type="submit">Sửa</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditUser;
