import z from 'zod';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import instance from '~/apis';
import { Category } from '~/interfaces/Category';

import { CategoryContext } from '~/contexts/categoryContext';

const productSchema = z.object({
    name: z.string().min(3).max(255),
    slug: z.string().min(1),

});



const EditCategory = () => {
    const { id } = useParams();
    const { handleEdit } = useContext(CategoryContext)
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<Category>({
        resolver: zodResolver(productSchema),
    });
    useEffect(() => {
        (async () => {
            const { data } = await instance.get(`/categorys/${id}`)
            console.log(data)
            reset(data.data)
        })()
    }, [id])
    // Use effect to set the value of categoryId when categories are loaded
    return (
        <>
            <form onSubmit={handleSubmit((data) => handleEdit({ ...data, _id: id }))} className="centered-form mb-3">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="card p-4 border border-secondary shadow">
                        <h1>Sửa Danh Mục</h1>
                        <hr />
                        <div className="mb-3 mt-3">
                            <label htmlFor="name" className="form-label">Tên Danh Mục</label>
                            <input type="text" className="form-control" id="name" placeholder="Mời Bạn Nhập Tên Danh Mục " {...register('name', { required: true })} />
                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="slug" className="form-label">Slug Danh Mục</label>
                            <input type="text" className="form-control" id="slug" placeholder="Mời Bạn Nhập Slug " {...register('slug', { required: true })} />
                            {errors.slug && <p className="text-danger">{errors.slug.message}</p>}
                        </div>

                        <button className="btn btn-primary w-100" type="submit">Sửa</button>
                    </div>
                </div>
            </form>


        </>
    );
};

export default EditCategory;
