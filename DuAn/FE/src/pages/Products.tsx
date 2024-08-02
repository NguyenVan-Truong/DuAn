import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  }, []);
  return (
    <div className="container">
      <div className="album py-5 bg-body-tertiary">
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal text-body-emphasis">Toàn Bộ Sản Phẩm</h1>

        </div>
      </div>
      <div className=" row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {products.map((product: any) => (
          <div className="conter col" key={product.id}>
            <div className=" card shadow-sm">
              <img src={product.images} alt={product.title} width="100%" height={250} />
              <div className="card-body">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-text">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link to={`/products/${product.id}`}>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Xem Chi Tiết</button>
                    </Link>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Mua Ngay</button>
                  </div>
                  <small className="text-body-secondary">{product.price}.000 VNĐ</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products