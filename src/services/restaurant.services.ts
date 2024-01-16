import { RestaurantAlreadyRegisteredError, RestaurantNotExistsError } from "./errors"
import {
	RestaurantCreateServiceRequest,
	RestaurantRepository,
	RestaurantServiceUpdateRequest,
} from "@menu-master-api/interfaces"

export class RestaurantService {
	constructor(private restaurantRepository: RestaurantRepository) {}

	async findById(restaurantId: number) {
		const restaurant = await this.restaurantRepository.findById(restaurantId)

		if (!restaurant) {
			throw new RestaurantNotExistsError()
		}

		return restaurant
	}

	async findByName(name: string) {
		const restaurant = await this.restaurantRepository.findByName(name)

		if (!restaurant) {
			throw new RestaurantNotExistsError()
		}

		return restaurant
	}


	async create({
		name,
		description,
		imageUrl,
		phoneNumber,
		rating,
		address,
	}: RestaurantCreateServiceRequest) {
		const restaurantAlreadyRegistered = await this.restaurantRepository.findByName(name)

		if (restaurantAlreadyRegistered) {
			throw new RestaurantAlreadyRegisteredError()
		}
    
		const restaurant = await this.restaurantRepository.create({
			name,
			description,
			imageUrl,
			phoneNumber,
			rating,
			address,
		})

		return {
			restaurant,
		}
	}

	async update({ restaurantId, modifiedRestaurant }: RestaurantServiceUpdateRequest) {
		const verifyRestaurantExists = await this.restaurantRepository.findById(
			restaurantId
		)

		if (!verifyRestaurantExists) {
			throw new RestaurantNotExistsError()
		}

		const restaurant = await this.restaurantRepository.update(restaurantId, {
			...modifiedRestaurant,
		})

		return {
			restaurant,
		}
	}
}
