
import z from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User } from '~/interfaces/User';
import { zodResolver } from '@hookform/resolvers/zod';
import instance from '~/apis';
import { message } from 'antd';

const registerSchema = z.object({
	email: z.string().email().min(2).max(255),
	password: z.string().min(6).max(255),
});



const Register = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors }, } = useForm<User>({
		resolver: zodResolver(registerSchema),
	});
	const onSubmit = async (user: User) => {
		try {
			const { data } = await instance.post(`/users/signup`, user)
			console.log(data)
			message.success('Đăng Ký Thành Công')
			navigate("/signin")
		} catch (error) {
			message.error('Đã có tài khoản này')
			console.error('Error:', error);
		}
	}
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="register-form mb-3">
				<div className="container d-flex justify-content-center align-items-center">
					<div className="card p-4 border border-secondary shadow">
						<h1 className="text-center">Đăng Ký Tài Khoản</h1>
						<hr />
						<div className="mb-3 mt-3">
							<label htmlFor="email" className="form-label">Email</label>
							<input
								className="form-control"
								type="email"
								id="email"
								placeholder="email"
								{...register('email', {
									required: true,
									minLength: 2,
									maxLength: 255,
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
								placeholder="password"
								{...register('password', {
									required: true,
									minLength: 6,
									maxLength: 255,
								})}
							/>
							{errors.password && <p className="text-danger">{errors.password.message}</p>}
						</div>
						<button className="btn btn-primary w-100" type="submit">Đăng Ký</button>
					</div>
				</div>
			</form>


		</div>
	);
};

export default Register;