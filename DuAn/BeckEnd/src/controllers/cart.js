import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res, next) => {
	try {
        const userId = req.userId; 

        // Tìm giỏ hàng của người dùng
        const cart = await Cart.findOne({ userId }).populate('userId').populate("products.product");
        if (!cart) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
        }

        return res.json({
            message: "Lấy giỏ hàng thành công",
            cart,
        });
    } catch (error) {
        next(error);
    }
};

export const addToCart = async (req, res, next) => {
	try {
        const { productId, quantity } = req.body;

        // Kiểm tra xem productId và quantity có được cung cấp không
        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID và số lượng là bắt buộc" });
        }

        // Tìm sản phẩm trong cơ sở dữ liệu
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        // Tìm giỏ hàng của người dùng
        let cart = await Cart.findOne({ userId: req.userId });

        // Nếu giỏ hàng không tồn tại, tạo mới
        if (!cart) {
            cart = new Cart({ userId: req.userId, products: [], totalPrice: 0 });
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const findIndex = cart.products.findIndex((p) => p.product.toString() === productId);
        if (findIndex === -1) {
            // Nếu sản phẩm chưa có, thêm mới
            cart.products.push({ product: productId, quantity });
        } else {
            // Nếu sản phẩm đã có, cập nhật số lượng
            cart.products[findIndex].quantity += quantity;
        }

        // Cập nhật tổng giá của giỏ hàng
        cart.totalPrice += product.price * quantity;
        await cart.save();

        return res.status(200).json({
            message: "Thêm sản phẩm vào giỏ hàng thành công",
            cart,
        });
    } catch (error) {
        next(error);
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { productId } = req.params;

        let cart = await Cart.findOne({ userId }).populate('products.product');
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const findIndex = cart.products.findIndex((p) => p.product._id.toString() === productId);
        if (findIndex === -1) return res.status(404).json({ message: "Product not found in cart" });

        const product = cart.products[findIndex];
        if (product && product.product && product.product.price) {
            const priceReduction = product.quantity * product.product.price;
            cart.totalPrice = Math.max(cart.totalPrice - priceReduction, 0);
        } else {
            return res.status(500).json({ message: "Invalid product data" });
        }

        cart.products = cart.products.filter((p) => p.product._id.toString() !== productId);
        await cart.save();

        return res.status(200).json({
            message: "Remove product from cart successfully",
            cart,
        });
    } catch (error) {
        next(error);
    }
};


// import Order from '../models/Order.js';
// export const checkout = async (req, res, next) => {
//     try {
//         const userId = req.userId;
    
//         // Tìm giỏ hàng của người dùng
//         const cart = await Cart.findOne({ userId }).populate("products.product");
    
//         if (!cart) return res.status(400).json({ message: "Cart is empty" });
    
//         // Tính tổng giá tiền từ giỏ hàng (nếu cần thiết)
//         let totalPrice = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        
//         // Tạo đơn hàng mới từ giỏ hàng của người dùng
//         const order = new Order({
//           userId: userId,
//           products: cart.products.map(item => ({
//             product: item.product._id,
//             quantity: item.quantity
//           })),
//           totalPrice: totalPrice,
//           status: 'Pending' // Trạng thái mặc định của đơn hàng
//         });
    
//         // Lưu đơn hàng vào cơ sở dữ liệu
//         await order.save();
    
//         // Xóa giỏ hàng sau khi thanh toán
//         cart.products = [];
//         cart.totalPrice = 0;
//         await cart.save();
    
//         // Phản hồi thành công
//         return res.status(200).json({ message: "Checkout successfully", order });
    
//       } catch (error) {
//         // Xử lý lỗi bất ngờ
//         next(error);
//       }
// };
