import { Category } from './Category';

export type TProduct = {
	_id?: number | string;
	title: string;
	description: string;
	price: number;
	categoryId?: Category;
	image?: string;
	quantity?: number;
};
