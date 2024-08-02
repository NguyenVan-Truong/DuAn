import { Router } from "express";
import { checkPermission } from './../middlewares/checkPermission.js';
import { createOrder, deleteOrder, getOrderById, getOrders, getOrdersByUserId, updateOrderStatus } from "../controllers/order.js";
import { checkAuth } from "../middlewares/checkauth.js";

const routerOrder = Router();

routerOrder.post("/", checkAuth ,createOrder);

// Route để lấy danh sách đơn hàng
routerOrder.get('/',checkAuth, getOrders);

// Route để lấy thông tin chi tiết của một đơn hàng
routerOrder.get('/:id',checkAuth, getOrderById);
// Route để lấy danh sách đơn hàng theo userId
routerOrder.get('/user/:userId',checkAuth, getOrdersByUserId);
// Route để cập nhật trạng thái đơn hàng
routerOrder.patch('/:id',checkAuth, updateOrderStatus);

// Route để xóa đơn hàng
routerOrder.delete('/:id',checkAuth, deleteOrder);
export default routerOrder;
