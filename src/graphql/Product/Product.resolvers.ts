/* eslint-disable @typescript-eslint/no-unused-vars */
import {Context} from '../../context';
import {Arg, Ctx, Mutation, Query, Resolver} from 'type-graphql';
import Product from './Product.schema';
import {ProductInput} from './Product.inputs';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';

@Resolver(Product)
class ProductResolver {
	//constructor(private recipeService: RecipeService) {}

	@Query(returns => Product)
	async product(@Arg('id') id: string, @Ctx() ctx: Context): Promise<Product> {
		let product;
		try {
			product = await ctx.db.product.findUniqueOrThrow({where: {id}});
			if (!product) {
				throw new Error('No se encontró producto con el id dado.');
			}
			return product;
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError) {
				// The .code property can be accessed in a type-safe manner
				console.log('e', e.code);
				if (e.code === 'P2002') {
					console.log(
						'There is a unique constraint violation, a new user cannot be created with this email'
					);
				}
			}
			throw new Error(e as string);
		}
	}

	@Query(returns => [Product])
	async products(@Ctx() ctx: Context): Promise<Product[]> {
		return await ctx.db.product.findMany();
	}

	@Mutation(returns => Product)
	async addProduct(
		@Arg('input') input: ProductInput,
		@Ctx() ctx: Context
	): Promise<Product> {
		return await ctx.db.product.create({data: input});
	}

	@Mutation(returns => Boolean)
	async updateProduct(
		@Arg('id') id: string,
		@Arg('input') input: ProductInput,
		@Ctx() ctx: Context
	): Promise<Product> {
		try {
			return await ctx.db.product.update({data: input, where: {id}});
		} catch {
			throw new Error('Error al actualizar');
		}
	}
}

export default ProductResolver;
