import { Avatar, Button, Card, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import instance from '~/apis';
import { User } from '~/interfaces/User';
import { UserOutlined } from '@ant-design/icons';


const ProfileUser = () => {
    const params = useParams();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await instance.get(`/users/${params.id}`);
            // console.log('Dữ liệu tài khoản:', data.data);
            setUser(data.data);
        };
        getProduct();
    }, []);
    return (
        <div className="container mt-5">
            {user &&
                <Card title="Thông tin tài khoản" style={{ width: 300, margin: '0 auto', marginTop: 50 }}>
                    <Avatar
                        size={100}
                        icon={<UserOutlined />}
                        src={user.avatar}
                        style={{ marginBottom: 20 }}
                    />
                    <Descriptions column={1}>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">{user.createdAt}</Descriptions.Item>


                    </Descriptions>
                    <Link to={`/users/edit/${user._id}`}><Button>Sửa</Button></Link>
                </Card>
            }
        </div>
    );
};

export default ProfileUser;
