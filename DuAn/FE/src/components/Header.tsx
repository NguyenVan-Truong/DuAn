import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CategoryContext } from '~/contexts/categoryContext';
import { message, Modal } from 'antd';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { state } = useContext(CategoryContext);

  const logout = () => {
    Modal.confirm({
      title: 'Xác nhận đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất?',
      onOk: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/signin');
        message.success('Đăng xuất thành công');
      },
      onCancel() {
        console.log('Người dùng đã huỷ đăng xuất');
      },
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top" data-bs-theme="dark">
        <div className="container">
          <div className="offcanvas offcanvas-end" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div className="offcanvas-body">
              <ul className="nav navbar-nav flex-grow-1 justify-content-between align-items-center">
                <li className="nav-item">
                  <NavLink className="nav-link text-dark text-decoration-none" to="/">Home</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-dark text-decoration-none" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Products
                  </a>
                  <ul className="dropdown-menu bg-light" aria-labelledby="navbarDropdown">
                    {state.categorys.map((category, index) => (
                      <li key={index}>
                        <NavLink className="dropdown-item text-dark text-decoration-none" to={`category/${category._id as string}`}>
                          {category.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark text-decoration-none" to="/features">Features</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark text-decoration-none" to="/enterprise">Enterprise</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark text-decoration-none" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link item text-dark" to="/carts">
                    <i className="cart bi bi-cart fs-4" />
                  </NavLink>
                </li>
                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                  <input
                    type="search"
                    className="form-control border-secondary bg-white text-dark"
                    placeholder="Search..."
                    aria-label="Search"
                  />
                </form>
                <div className="dropdown text-end">
                  {user.email ? (
                    <>
                      <a className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img
                          src={user.avatar} alt={user.email} width={32} height={32} className="rounded-circle"
                        />
                      </a>
                      <ul className="dropdown-menu text-small">
                        {user.role === 'admin' ? (
                          <li><Link className="dropdown-item" to="/admin">Admin</Link></li>
                        ) : null}
                        <li><Link className="dropdown-item" to={`/orders/user/${user._id}`}>Đơn hàng của bạn</Link></li>
                        <li><Link className="dropdown-item" to={`/users/${user._id}`}>Thông tin cá nhân</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item btn" onClick={logout}>Sign out</a></li>
                      </ul>
                    </>
                  ) : (
                    <div className="text-end">
                      <button type="button" className="btn btn-outline-dark me-2"><Link className="text-decoration-none text-warning" to="/signin">Đăng nhập</Link></button>
                      <button type="button" className="btn btn-warning"><Link className="text-decoration-none text-dark" to="/signup">Đăng Ký</Link></button>
                    </div>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div >
      </nav >

      <div className="navbar3">
        <div className="navbar4">
          <div className="running-text">
            <span>Chào mừng bạn đến với trang web bán hàng của chúng tôi! Chúng tôi rất vui mừng bạn đã ghé thăm và quan tâm đến các sản phẩm mà chúng tôi cung cấp.</span>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Header;
