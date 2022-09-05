/* eslint-disable @typescript-eslint/no-unused-vars */
import {Context} from '../../context';
import {Arg, Ctx, Mutation, Query, Resolver} from 'type-graphql';
import Product from './Product.schema';
import {ProductInput} from './Product.inputs';

@Resolver(Product)
class ProductResolver {
	//constructor(private recipeService: RecipeService) {}

	@Query(returns => Product)
	async product(@Arg('id') id: string, @Ctx() ctx: Context): Promise<Product> {
		const product = await ctx.db.product.findUnique({where: {id}});
		if (!product) {
			throw new Error('No se encontró producto con el id dado.');
		}
		return product;
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
