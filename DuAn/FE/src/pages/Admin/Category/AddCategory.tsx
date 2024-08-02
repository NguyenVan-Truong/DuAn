import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { CategoryContext } from '~/contexts/categoryContext';
import { Category } from '~/interfaces/Category';

const productSchema = z.object({
    name: z.string().min(3).max(255),
    slug: z.string().min(1),
});


const AddCategory = () => {
    const { handleAdd } = useContext(CategoryContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Category>({
        resolver: zodResolver(productSchema),
    });

    return (
        <>
            <form onSubmit={handleSubmit(handleAdd)} className="centered-form mb-3">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="card p-4 border border-secondary-subtle shadow">
                        <h1> Thêm Danh Mục</h1>
                        <hr />
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Tên Danh Mục</label>
                            <input type="text" className="form-control" id="email" placeholder="Mời Bạn Nhập Tên Danh Mục" {...register('name', { required: true })} />
                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Slug Danh Mục</label>
                            <input type="text" className="form-control" id="pwd" placeholder="Mời Bạn Nhập Slug Danh Mục" {...register('slug', { required: true })} />
                            {errors.slug && <p className="text-danger">{errors.slug.message}</p>}
                        </div>

                        <button className="btn btn-primary w-100" type="submit">Thêm</button>
                    </div>
                </div>
            </form>


        </>
    );
};

export default AddCategory;