import {
	RestarantOpeningHoursNotExistsError,
	RestaurantAlreadyRegisteredError,
} from "./errors"
import {
	RestaurantOpeningHoursRepository,
	RestaurantOpeningHoursServiceResquest,
} from "@menu-master-api/interfaces"

export class RestaurantOpeningHoursService {
	constructor(
    private restaurantOpeningHoursRepository: RestaurantOpeningHoursRepository
	) {}

	async findByIdAndRestaurantId(
		restaurantOpeningHoursId: number,
		restaurantId: number
	) {
		const restaurantOpeningHoursRepository =
      await this.restaurantOpeningHoursRepository.findByIdAndRestaurantId(
      	restaurantOpeningHoursId,
      	restaurantId
      )

		if (!restaurantOpeningHoursRepository) {
			throw new RestarantOpeningHoursNotExistsError()
		}

		return restaurantOpeningHoursRepository
	}

	async create(restaurantId: number,{
		day,
		openTime,
		closeTime
	}: RestaurantOpeningHoursServiceResquest) {
		const restaurantAlreadyRegistered =
      await this.restaurantOpeningHoursRepository.findByDayAndRestaurantId(day, restaurantId)

		if (restaurantAlreadyRegistered) {
			throw new RestaurantAlreadyRegisteredError()
		}

		const restaurant = await this.restaurantOpeningHoursRepository.create(restaurantId, {
			day,
			openTime,
			closeTime
		})

		return {
			restaurant,
		}
	}
}
