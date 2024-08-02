import z from 'zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { TProduct } from '~/interfaces/Product';
import { zodResolver } from '@hookform/resolvers/zod';
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

const EditProduct = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const { handleEditProduct } = useContext(ProductContext);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<TProduct>({
        resolver: zodResolver(productSchema),
    });

    const [productImage, setProductImage] = useState<string>('');
    const [newImage, setNewImage] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { data } = await instance.get(`/products/${id}`);
            setProductImage(data.data.image); // Lưu ảnh cũ
            reset(data.data);
        })();
    }, [id, reset]);

    useEffect(() => {
        (async () => {
            const { data } = await instance.get(`/categorys`);
            setCategories(data.data);
        })();
    }, []);

    const handleImageChange = (image: string) => {
        setNewImage(image); // Cập nhật ảnh mới
    };

    const onSubmit = async (product: TProduct) => {
        try {
            const updatedProduct = {
                ...product,
                image: newImage || productImage // Sử dụng ảnh mới nếu có, nếu không thì sử dụng ảnh cũ
            };
            handleEditProduct(updatedProduct);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <form onSubmit={handleSubmit((data) => onSubmit({ ...data, _id: id }))} className="centered-form mb-3">
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="card p-4 border border-secondary shadow">
                        <h1>Sửa Sản Phẩm</h1>
                        <hr />
                        <div className="mb-3 mt-3">
                            <label htmlFor="title" className="form-label">Tên Sản Phẩm</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Mời Bạn Nhập Tên Sản Phẩm"
                                {...register('title')}
                            />
                            {errors.title && <p className="text-danger">{errors.title.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Giá Sản Phẩm</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                placeholder="Mời Bạn Nhập Giá Sản Phẩm"
                                {...register('price', { valueAsNumber: true })}
                            />
                            {errors.price && <p className="text-danger">{errors.price.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoryId" className="form-label">Danh Mục Sản Phẩm</label>
                            <select
                                className="form-control"
                                id="categoryId"
                                {...register('categoryId', { required: true })}
                            >
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

                        {/* Hiển thị ảnh cũ chỉ khi không có ảnh mới */}
                        {!newImage && productImage && (
                            <img
                                src={productImage}
                                alt="Product"
                                width={250} height={250}
                                className="img-fluid mb-3"
                            />
                        )}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Mô Tả Sản Phẩm</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="Mời Bạn Nhập Mô Tả Sản Phẩm"
                                {...register('description')}
                            />
                            {errors.description && <p className="text-danger">{errors.description.message}</p>}
                        </div>
                        <button className="btn btn-primary w-100" type="submit">Sửa</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditProduct;
