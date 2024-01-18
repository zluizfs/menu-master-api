import {
	RestaurantDishesServiceCreateRequest,
	RestaurantDishesRepository,
} from "@menu-master-api/interfaces"
import { RestaurantDishesAlrealdyLinked } from "./errors"

export class RestaurantDishesService {
	constructor(private restaurantDishesRepository: RestaurantDishesRepository) {}

	async create({
		disheId,
		restaurantId
	}: RestaurantDishesServiceCreateRequest) {
		const verifyRestaurantDishesIsLinked = await this.restaurantDishesRepository.findById(disheId, restaurantId)

		if(verifyRestaurantDishesIsLinked){
			throw new RestaurantDishesAlrealdyLinked()
		}

		const restaurantDishes = await this.restaurantDishesRepository.create({
			disheId,
			restaurantId
		})

		return {
			restaurantDishes,
		}
	}
}
