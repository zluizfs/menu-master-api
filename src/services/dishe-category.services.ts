import {
	DisheCategoryNotExistsError,
} from "./errors"
import {
	DisheCategoryRepository,
	DisheServiceUpdateRequest,
	DisheCategoryServiceCreateRequest,
} from "@menu-master-api/interfaces"

export class DisheCategoryService {
	constructor(private dishesCategoryRepository: DisheCategoryRepository) {}

	async findById(dishesCategoryId: number) {
		const disheCategory = await this.dishesCategoryRepository.findById(dishesCategoryId)

		if (!disheCategory) {
			throw new DisheCategoryNotExistsError()
		}

		return disheCategory
	}

	async create({
		...data
	}: DisheCategoryServiceCreateRequest) {

		const disheCategory = await this.dishesCategoryRepository.create({
			...data,
		})

		return {
			disheCategory,
		}
	}

	async update(
		disheCategoryId: number,
		{ modifiedDishe }: DisheServiceUpdateRequest
	) {
		const verifyDisheCategoryExists = await this.dishesCategoryRepository.findById(
			disheCategoryId
		)

		if (!verifyDisheCategoryExists) {
			throw new DisheCategoryNotExistsError()
		}

		const disheCategory = await this.dishesCategoryRepository.update(disheCategoryId, {
			...modifiedDishe,
		})

		return {
			disheCategory,
		}
	}
}
