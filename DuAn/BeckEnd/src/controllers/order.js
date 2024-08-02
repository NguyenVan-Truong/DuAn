import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const createOrder = async (req, res, next) => {
    try {
        const userId = req.userId;
        console.log('User ID:', userId);

        const cart = await Cart.findOne({ userId }).populate('products.product');
        console.log('Cart:', cart);

        if (!cart) {
            return res.status(400).json({ message: 'Không tìm thấy giỏ hàng' });
        }

        if (cart.products.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng trống' });
        }

        const order = new Order({
            userId: userId,
            products: cart.products.map(item => ({
                product: item.product._id,  // Sử dụng _id của sản phẩm
                quantity: item.quantity
            })),
            totalPrice: cart.totalPrice,
            status: 'pending' // Trạng thái mặc định
        });

        await order.save();

        // Xóa giỏ hàng sau khi tạo đơn hàng
        cart.products = [];
        cart.totalPrice = 0;
        await cart.save();

        return res.status(201).json({ message: 'Đơn hàng được tạo thành công', order });
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        next(error);
    }
};
export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('products.product').populate('userId');     ;
        return res.status(200).json({ orders });
    } catch (error) {
        next(error);
    }
};
export const getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('products.product');

        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }

        return res.status(200).json({ order });
    } catch (error) {
        next(error);
    }
};


// Controller function to get orders by userId
export const getOrdersByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ userId }).populate('products.product');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào' });
        }

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};


export const updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        // Kiểm tra giá trị status hợp lệ
        const validStatuses = ['pending', 'shipping', 'completed', 'cancel'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({ message: 'Trạng thái đơn hàng đã được cập nhật', order });
    } catch (error) {
        next(error);
    }
};
export const deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }

        return res.status(200).json({ message: 'Đơn hàng đã được xóa' });
    } catch (error) {
        next(error);
    }
};
