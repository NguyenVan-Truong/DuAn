import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Avatar } from 'antd';
import instance from '~/apis';
import { User } from '~/interfaces/User';
import ImageUploader from '~/components/ImageUpload'; // Nếu bạn có component này

const EditUserForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await instance.get(`/users/${id}`);
                setUser(data.data);
                setAvatar(data.data.avatar); // Lưu avatar hiện tại
            } catch (error) {
                console.error("Lỗi tải người dùng:", error);
            }
        };
        fetchUser();
    }, [id]);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const { data } = await instance.patch(`/users/${id}`, { ...values, avatar });
            message.success("Cập nhật tài khoản thành công!");

            // Cập nhật localStorage
            localStorage.setItem('user', JSON.stringify(data.data));

            navigate(`/users/${id}`);
        } catch (error) {
            console.error("Cập nhật tài khoản thất bại:", error);
            message.error("Cập nhật tài khoản thất bại.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (newImage: string) => {
        setAvatar(newImage);
    };

    if (!user) {
        return <div>Đang tải...</div>;
    }

    return (
        <Card title="Sửa thông tin tài khoản" style={{ width: 400, margin: '0 auto', marginTop: 50 }}>
            <Form
                name="editUser"
                initialValues={{
                    email: user.email,
                }}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input readOnly />
                </Form.Item>

                <Form.Item
                    name="avatar"
                    label="Ảnh đại diện"
                >
                    <ImageUploader onImageChange={handleImageChange} />
                    {avatar && (
                        <Avatar
                            size={100}
                            src={avatar}
                            style={{ marginTop: 10, marginBottom: 10 }}
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default EditUserForm;
