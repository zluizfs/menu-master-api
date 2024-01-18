import { DishNotExistsError } from "./errors"
import {
	DishCreateServiceRequest,
	DishRepository,
	DishServiceUpdateRequest,
} from "@menu-master-api/interfaces"

export class DishService {
	constructor(private dishRepository: DishRepository) {}

	async findById(dishId: number) {
		const dish = await this.dishRepository.findById(dishId)

		if (!dish) {
			throw new DishNotExistsError()
		}

		return dish
	}

	async findAll(dishName: string, restaurantId: number) {
		const dishes = await this.dishRepository.findAll(dishName, restaurantId)
		return dishes
	}

	async create({ ...data }: DishCreateServiceRequest) {
		const dish = await this.dishRepository.create({
			...data,
		})

		return {
			dish,
		}
	}

	async update(dishId: number, { modifiedDish }: DishServiceUpdateRequest) {
		const verifyDishExists = await this.dishRepository.findById(dishId)

		if (!verifyDishExists) {
			throw new DishNotExistsError()
		}

		const dish = await this.dishRepository.update(dishId, {
			...modifiedDish,
		})

		return {
			dish,
		}
	}
}
