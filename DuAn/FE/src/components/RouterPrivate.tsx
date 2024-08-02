import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'antd';

type Props = {
    childrent: React.ReactNode,
    // usertk: number
}

const RouterPrivate = ({ childrent }: Props) => {
    const navigator = useNavigate()
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    return (
        (user.role === "admin") ? <>{childrent} </> :
            <>
                {toast.error("Bạn không có quyền truy cập")}
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="text-center">
                        <h1 className="text-danger mb-4">Thông báo</h1>
                        <h5 className="text-danger mb-3">Không Có Quyền Truy Cập</h5>
                        <h5 className="text-danger mb-4">Bạn không có quyền truy cập trang này. Vui lòng quay lại trang chủ hoặc liên hệ với quản trị viên.</h5>
                        <Link to='/'>
                            <Button >Trang chủ</Button>
                        </Link>
                    </div>
                </div>
            </>
    )
}

export default RouterPrivate