import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import instance from '~/apis';
import { Category } from '~/interfaces/Category';
import { TProduct } from '~/interfaces/Product';

const CategoryDetail = () => {
    const { id } = useParams();
    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<TProduct[]>([]);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const { data } = await instance.get(`/categorys/${id}`);
                setCategory(data.data);
                setProducts(data.data.products); // Giả sử danh sách sản phẩm nằm trong data.data.products
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };
        getCategory();
    }, [id]);

    return (
        <div className="container my-5">
            <h2 className="mb-4">Danh Mục: {category?.name}</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {products.map((product) => (
                    <div className="col" key={product._id}>
                        <div className="card shadow-sm d-flex flex-column" style={{ height: '100%' }}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="card-img-top"
                                style={{ height: '250px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h3 className="card-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {product.title}
                                </h3>
                                <p className="card-text flex-grow-1" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {product.description}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <div className="btn-group">
                                        <Link to={`/products/${product._id}`}>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">
                                                Xem Chi Tiết
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">
                                            Mua Ngay
                                        </button>
                                    </div>
                                    <small className="text-body-secondary">{product.price} .000 VNĐ</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryDetail;
