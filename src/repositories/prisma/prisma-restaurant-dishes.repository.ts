import { RestaurantDishesRepository, RestaurantDishesServiceCreateRequest } from "@menu-master-api/interfaces"
import { prisma } from "@menu-master-api/lib/prisma"

export class PrismaRestaurantDishesRepository implements RestaurantDishesRepository {
	async findById(restaurantId: number, disheId: number) {
		const restaurantDishes = await prisma.restaurantDishes.findUnique({
			where: {
				disheId_restaurantId: {
					restaurantId,
					disheId
				}
			}
		})

		return restaurantDishes
	}
	async create(data: RestaurantDishesServiceCreateRequest) {
		const restaurantDishes = await prisma.restaurantDishes.create({
			data,
		})

		return restaurantDishes
	}
}
