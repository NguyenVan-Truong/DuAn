import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './contexts/productContext.tsx';
import { CategoryProvider } from './contexts/categoryContext.tsx';
import { UserProvider } from './contexts/userContext.tsx';
// import { CartProvider } from './contexts/cartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<BrowserRouter>
			<ProductProvider>
				<CategoryProvider>
					<UserProvider>
						{/* <CartProvider> */}
						<App />
						{/* </CartProvider> */}
					</UserProvider>
				</CategoryProvider>
			</ProductProvider>
		</BrowserRouter>
	</>
);

// ! strict Mode = chế độ nghiêm ngặt.
