import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { UserContext } from '~/contexts/userContext';
import { User } from '~/interfaces/User';

const productSchema = z.object({
    email: z.string().email().min(2).max(255),
    password: z.string().min(6).max(255),
    role: z.enum(["member", "admin"]),
});


const AddUser = () => {
    const { handleAdd } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({
        resolver: zodResolver(productSchema),
    });

    return (
        <>
            <form onSubmit={handleSubmit(handleAdd)} className="centered-form mb-3">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="card p-4 border border-secondary shadow">
                        <h1>Thêm Tài Khoản</h1>
                        <hr />
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Tên Tài Khoản</label>
                            <input type="text" className="form-control" id="email" placeholder="Mời Bạn Nhập Tên Tài Khoản" {...register('email', { required: true })} />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Mật khẩu Tài Khoản</label>
                            <input type="password" className="form-control" id="pwd" placeholder="Mời Bạn Nhập Mật Khẩu" {...register('password', { required: true })} />
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Vai Trò</label>
                            <select className="form-control" id="role" {...register('role', { required: true })}>
                                <option value="member">Member</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && <p className="text-danger">{errors.role.message}</p>}
                        </div>
                        <button className="btn btn-primary w-100" type="submit">Thêm</button>
                    </div>
                </div>
            </form>


        </>
    );
};

export default AddUser;