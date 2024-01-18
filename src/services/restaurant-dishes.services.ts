import {
	RestaurantDishesServiceCreateRequest,
	RestaurantDishesRepository,
} from "@menu-master-api/interfaces"
import { RestaurantDishesAlrealdyLinked } from "./errors"

export class RestaurantDishesService {
	constructor(private restaurantDishesRepository: RestaurantDishesRepository) {}

	async create({ dishId, restaurantId }: RestaurantDishesServiceCreateRequest) {
		const verifyRestaurantDishesIsLinked =
      await this.restaurantDishesRepository.findById(dishId, restaurantId)

		if (verifyRestaurantDishesIsLinked) {
			throw new RestaurantDishesAlrealdyLinked()
		}

		const restaurantDishes = await this.restaurantDishesRepository.create({
			dishId,
			restaurantId,
		})

		return {
			restaurantDishes,
		}
	}
}
