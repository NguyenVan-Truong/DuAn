// pages/Admin/AddProduct.tsx
import z from 'zod';
import { useForm } from 'react-hook-form';
import { TProduct } from '~/interfaces/Product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import instance from '~/apis';
import { Category } from '~/interfaces/Category';
import { ProductContext } from '~/contexts/productContext';
import ImageUploader from '~/components/ImageUpload';

const productSchema = z.object({
    title: z.string().min(3).max(255),
    price: z.number().min(1),
    image: z.string().min(1),
    description: z.string().min(1),
    categoryId: z.string().min(1)
});

const AddProduct = () => {
    const { handleAdd } = useContext(ProductContext);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TProduct>({
        resolver: zodResolver(productSchema),
    });
    const [categories, setCategories] = useState<Category[]>([]);

    const handleImageChange = (newImage: string) => {
        setValue('image', newImage);
    };

    useEffect(() => {
        (async () => {
            const { data } = await instance.get('/categorys');
            setCategories(data.data);
        })();
    }, []);

    return (
        <form onSubmit={handleSubmit(handleAdd)} className="centered-form mb-3">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card p-4 border border-secondary shadow">
                    <h1> Thêm Sản Phẩm</h1>
                    <hr />
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">Tên Sản Phẩm</label>
                        <input type="text" className="form-control" id="email" placeholder="Mời Bạn Nhập Tên Sản Phẩm" {...register('title', { required: true })} />
                        {errors.title && <p className="text-danger">{errors.title.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Giá Sản Phẩm</label>
                        <input type="number" className="form-control" id="price" placeholder="Mời Bạn Nhập Giá Sản Phẩm" {...register('price', { required: true, valueAsNumber: true })} />
                        {errors.price && <p className="text-danger">{errors.price.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryId" className="form-label">Danh mục Sản Phẩm</label>
                        <select className="form-control" id="categoryId" {...register('categoryId', { required: true })}>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && <p className="text-danger">{errors.categoryId.message}</p>}
                    </div>
                    <div className="mb-3">
                        <ImageUploader onImageChange={handleImageChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Mô Tả Sản Phẩm</label>
                        <input type="text" className="form-control" id="description" placeholder="Mời Bạn Nhập Mô Tả Sản Phẩm" {...register('description', { required: true })} />
                        {errors.description && <p className="text-danger">{errors.description.message}</p>}
                    </div>
                    <button className="btn btn-primary w-100" type="submit">Thêm</button>
                </div>
            </div>
        </form>
    );
};

export default AddProduct;
