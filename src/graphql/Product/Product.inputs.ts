import {Field, InputType} from 'type-graphql';
import Product from './Product.schema';

@InputType({description: 'New product data'})
export class ProductInput implements Partial<Product> {
	@Field() name: string;

	@Field() code: string;

	@Field() description: string;
}
