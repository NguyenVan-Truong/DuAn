import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from '~/apis';
import { TProduct } from '~/interfaces/Product';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';

const ProductList = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await instance.get('/products', {
                    params: {
                        _page: currentPage,
                        _limit: 3, // Số lượng sản phẩm trên mỗi trang
                        _sort: 'createdAt',
                        _order: 'asc',
                    },
                });
                setProducts(data.data.docs);
                setTotalPages(Math.ceil(data.data.total / 3)); // Giả sử bạn nhận được tổng số sản phẩm từ API
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const items = [];
        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </li>
            );
        }
        return items;
    };

    return (
        <main>
            {/* Carousel phần hiển thị các banner */}
            <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="https://file.hstatic.net/1000061481/file/nike_new_lights_92b8afa1c82e4491879f90a5eb8e6d8c.jpg" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://file.hstatic.net/200000211685/collection/banner_website_main_wider_e31070d0ad654188858946de0c5b95d7.png" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://example.com/your-third-banner.jpg" alt="Third slide" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <section className="bg-bg-secondary py-5">
                {/* Section phần giữ nguyên */}
            </section>

            <div className="album py-5 bg-body-tertiary">
                <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h1 className="display-4 fw-normal text-body-emphasis">Nike Air Max Dn</h1>
                    <p className="fs-5 text-body-secondary">The next generation of Air technology launches on March 26th. Preview the full lineup of colourways now.</p>
                </div>

                <div className="container">
                    {loading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <div>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {products.map((product, index) => (
                                    <div className="col" key={index}>
                                        <div className="card shadow-sm d-flex flex-column" style={{ height: '100%' }}>
                                            <img src={product.image} alt={product.title} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} />
                                            <div className="card-body d-flex flex-column">
                                                <h3 className="card-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.title}</h3>
                                                <p className="card-text flex-grow-1" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.description}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-2">
                                                    <div className="btn-group">
                                                        <Link to={`/products/${product._id}`}>
                                                            <button type="button" className="btn btn-sm btn-outline-secondary">Xem Chi Tiết</button>
                                                        </Link>
                                                        <button type="button" className="btn btn-sm btn-outline-secondary">Mua Ngay</button>
                                                    </div>
                                                    <small className="text-body-secondary">{product.price} VNĐ</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <nav>
                                <ul className="pagination justify-content-center mt-5">
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                            <DoubleLeftOutlined />
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                    </li>
                                    <li className="page-item disabled">
                                        {renderPagination()}
                                        <span className="page-link">{currentPage}</span>
                                    </li>
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                            <DoubleRightOutlined />
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProductList;
