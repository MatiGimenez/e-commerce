/* eslint-disable @typescript-eslint/no-unused-vars */
import {Field, ID, ObjectType} from 'type-graphql';

@ObjectType()
class Product {
	@Field(type => ID) id?: string;

	@Field() name: string;

	@Field() code: string;

	@Field() description: string;
}

export default Product;
