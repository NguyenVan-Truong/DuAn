import { Link } from "react-router-dom"

const NotFound = () => {

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <p className="fs-4">Trang bạn tìm không tồn tại</p>
          <Link to="/" className="btn btn-primary mt-3">Quay lại trang chính</Link>
        </div>
      </div>
    </>
  )
}

export default NotFound