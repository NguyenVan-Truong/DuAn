// interface CartProduct {
// 	_id: string;
// 	product: {
// 		_id: string;
// 		title: string;
// 		price: number;
// 	};
// 	quantity: number;
// }

import { TProduct } from './Product';
import { User } from './User';
interface CartItem {
	product: TProduct;
	quantity: number;
}
export interface Cart {
	userId: User;
	products: CartItem[];
	totalPrice: number;
}
