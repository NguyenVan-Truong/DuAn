
import z from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User } from '~/interfaces/User';
import { zodResolver } from '@hookform/resolvers/zod';
import instance from '~/apis';
import { message } from 'antd';

const registerSchema = z.object({
    email: z.string().email().min(2).max(255),
});



const FogotPasword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm<User>({
        resolver: zodResolver(registerSchema),
    });
    const onSubmit = async (user: User) => {
        try {
            const { data } = await instance.post(`/users/forgot`, user)
            console.log(data)
            message.success('Đã gửi yêu cầu thành công')
            message.success('Vui lòng kiểm tra email của bạn')
            navigate("/signin")
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="register-form mb-3">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="card p-4 border border-secondary shadow">
                        <h1 className="text-center">Quên mật khẩu</h1>
                        <hr />
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                className="form-control"
                                type="email"
                                id="email"
                                placeholder="Mời bạn nhập email"
                                {...register('email', {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 255,
                                })}
                            />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </div>
                        <button className="btn btn-primary w-100" type="submit">Tìm</button>
                    </div>
                </div>
            </form>


        </div>
    );
};

export default FogotPasword;