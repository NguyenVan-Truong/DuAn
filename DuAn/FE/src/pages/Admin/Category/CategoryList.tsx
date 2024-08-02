import { Button, Flex, message, Popconfirm } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoryContext } from '~/contexts/categoryContext';

const CategoryList = () => {
    const { state, onRemove } = useContext(CategoryContext);
    const handleConfirm = (id: number | string) => {
        onRemove(id);
        message.success('Danh mục đã được xóa thành công!');
    };

    const handleCancel = () => {
        message.error('Hành động đã bị hủy!');
    };

    return (
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {state.categorys.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                        <td>
                            <Flex gap="small" wrap>
                                <Popconfirm
                                    title="Bạn chắc chắn muốn xóa danh mục này?"
                                    onConfirm={() => handleConfirm(item._id as string)}
                                    onCancel={handleCancel}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button danger>Remove</Button>
                                </Popconfirm>
                                <Link to={`/admin/category/edit/${item._id}`}>
                                    <Button>Update</Button>
                                </Link>
                            </Flex>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CategoryList;
