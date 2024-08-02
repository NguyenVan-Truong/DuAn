import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import LayoutWebsite from './layouts/LayoutWebsite';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Admin/Dashboard';
import LayoutAdmin from './layouts/LayoutAdmin';
import AddProduct from './pages/Admin/AddProduct';

import EditProduct from './pages/Admin/EditProduct';

import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductItem from './components/ProductItem';
import ProfileUser from './components/ProfileUser';
import RouterPrivate from './components/RouterPrivate';
import CategoryList from './pages/Admin/Category/CategoryList';
import AddCategory from './pages/Admin/Category/AddCategory';
import EditCategory from './pages/Admin/Category/EditCategory';
import UserList from './pages/Admin/User/Userlist';
import EditUser from './pages/Admin/User/EditUser';
import AddUser from './pages/Admin/User/AddUser';
import FogotPasword from './pages/FogotPasword';
import CategoryDetail from './components/CategoryDetail';
import ProfileUserEdit from './components/ProfileUserEdit';
import CartTable from './pages/Cart';
import Orders from './pages/Order';
import Bill from './pages/Bill';
import OrderList from './pages/Admin/Order/OrderList';
import EditOrder from './pages/Admin/Order/EditOrder';
import OrderYour from './pages/Admin/Order/OrderYour';

const App: React.FC = () => {



	return (
		<div>

			<Routes>
				<Route path='/' element={<LayoutWebsite />}>
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<Products />} />
					<Route path="/products/:id" element={<ProductItem />} />
					<Route path="/category/:id" element={<CategoryDetail />} />
					<Route path='/signin' element={<Login />} />
					<Route path="/signup" element={<Register />} />
					<Route path='/forgot' element={<FogotPasword />} />
					<Route path='/users/:id' element={<ProfileUser />} />
					<Route path='/users/edit/:id' element={<ProfileUserEdit />} />
					<Route path='carts' element={<CartTable />} />
					<Route path='bill' element={<Bill />} />
					<Route path='orders/:id' element={<Orders />} />
					<Route path='orders/user/:id' element={<OrderYour />} />
				</Route>

				<Route element={<RouterPrivate childrent={<LayoutAdmin />}></RouterPrivate>}>
					<Route path='/admin' element={<Dashboard />} />
					<Route path='/admin/add' element={<AddProduct />} />
					<Route path='/admin/edit/:id' element={<EditProduct />} />
					<Route path='/admin/category' element={<CategoryList />} />
					<Route path='/admin/category/add' element={<AddCategory />} />
					<Route path='/admin/category/edit/:id' element={<EditCategory />} />
					<Route path='/admin/user' element={<UserList />} />
					<Route path='/admin/user/add' element={<AddUser />} />
					<Route path='/admin/user/edit/:id' element={<EditUser />} />
					<Route path='/admin/order' element={<OrderList />} />
					<Route path='/admin/order/:id' element={<EditOrder />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer />
		</div>
	);
};

export default App;
