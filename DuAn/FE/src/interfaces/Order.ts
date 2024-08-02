import { TProduct } from './Product';
import { User } from './User';

export interface OrderProduct {
	product: TProduct;
	quantity: number;
}

export interface Order {
	_id: string;
	userId: User;
	products: OrderProduct[];
	totalPrice: number;
	status: 'pending' | 'completed' | 'shipping' | 'cancel';
	createdAt: Date;
	updatedAt: Date;
}
