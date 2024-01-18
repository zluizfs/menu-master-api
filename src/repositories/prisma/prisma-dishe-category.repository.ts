import { DisheCategoryRepository, DisheCategoryServiceCreateRequest } from "@menu-master-api/interfaces"
import { prisma } from "@menu-master-api/lib/prisma"

import { Prisma } from "@prisma/client"

export class PrismaDisheCategoryRepository implements DisheCategoryRepository {
	async create(data: DisheCategoryServiceCreateRequest) {
		const dishesCategory = await prisma.dishesCategory.create({
			data,
		})

		return dishesCategory
	}

	async findById(dishesCategoryId: number) {
		const dishesCategory = await prisma.dishesCategory.findUnique({
			where: {
				dishesCategoryId
			}
		})

		return dishesCategory
	}

	async update(dishesCategoryId: number, data: Prisma.DishesCategoryUpdateInput) {
		const dishesCategory = await prisma.dishesCategory.update({
			data,
			where: {
				dishesCategoryId,
			}
		})

		return dishesCategory
	}
}
