import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '~/contexts/productContext';
import { Button, Popconfirm, message, Image, Flex } from 'antd';
const Dashboard = () => {
    const { state, onRemove } = useContext(ProductContext);

    const handleConfirm = (id: number | string) => {
        onRemove(id);
        message.success('Sản phẩm đã được xóa thành công!');
    };

    const handleCancel = () => {
        message.error('Hành động đã bị hủy!');
    };

    return (
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {state.products.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>
                            <Image width={50} height={50} src={item.image} /></td>
                        <td>{item.description}</td>
                        <td >
                            <Flex gap="small" wrap>
                                <Popconfirm
                                    title="Bạn chắc chắn muốn xóa sản phẩm này?"
                                    onConfirm={() => handleConfirm(item._id as string)}
                                    onCancel={handleCancel}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button danger>Remove</Button>
                                </Popconfirm>
                                <Link to={`/admin/edit/${item._id}`}>
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

export default Dashboard;
