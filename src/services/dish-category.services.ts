import { DishCategoryNotExistsError } from "./errors"
import {
	DishCategoryRepository,
	DishServiceUpdateRequest,
	DishCategoryServiceCreateRequest,
} from "@menu-master-api/interfaces"

export class DishCategoryService {
	constructor(private dishesCategoryRepository: DishCategoryRepository) {}

	async findById(dishesCategoryId: number) {
		const dishCategory = await this.dishesCategoryRepository.findById(
			dishesCategoryId
		)

		if (!dishCategory) {
			throw new DishCategoryNotExistsError()
		}

		return dishCategory
	}

	async create({ ...data }: DishCategoryServiceCreateRequest) {
		const dishCategory = await this.dishesCategoryRepository.create({
			...data,
		})

		return {
			dishCategory,
		}
	}

	async update(
		dishCategoryId: number,
		{ modifiedDish }: DishServiceUpdateRequest
	) {
		const verifyDishCategoryExists =
      await this.dishesCategoryRepository.findById(dishCategoryId)

		if (!verifyDishCategoryExists) {
			throw new DishCategoryNotExistsError()
		}

		const dishCategory = await this.dishesCategoryRepository.update(
			dishCategoryId,
			{
				...modifiedDish,
			}
		)

		return {
			dishCategory,
		}
	}
}
