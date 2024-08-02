// Login.jsx

import zod from 'zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '~/interfaces/User';
import { zodResolver } from '@hookform/resolvers/zod';
import instance from '~/apis';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { message } from 'antd';

const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(255),
});

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<User>({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = async (user: User) => {
        try {
            const { data } = await instance.post(`/users/signin`, user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.accessToken);
            console.log(data);
            message.success('Đăng Nhập Thành Công');
            navigate("/");
        } catch (error) {
            message.error('Tài khoản hoặc mật khẩu không chính xác');
            navigate("/signin");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container d-flex justify-content-center align-items-center mb-3">
            <div className="card p-4 border border-secondary shadow-sm">
                <h1 className="text-center">Đăng Nhập</h1>
                <hr />
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Email là bắt buộc',
                            minLength: {
                                value: 2,
                                message: 'Email phải có ít nhất 2 ký tự',
                            },
                            maxLength: {
                                value: 255,
                                message: 'Email không được vượt quá 255 ký tự',
                            },
                        })}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        placeholder="Password"
                        {...register('password', {
                            required: 'Password là bắt buộc',
                            minLength: {
                                value: 6,
                                message: 'Password phải có ít nhất 6 ký tự',
                            },
                            maxLength: {
                                value: 255,
                                message: 'Password không được vượt quá 255 ký tự',
                            },
                        })}
                    />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div>
                <Link to="/forgot" className="btn btn-link text-decoration-none">
                    <i className="bi bi-question-diamond-fill"></i>
                    <span className="ms-2">Quên mật khẩu</span>
                </Link>
                <button className="btn btn-primary w-100" type="submit">Đăng Nhập</button>
            </div>
        </form>


    );
};

export default Login;
