import {
	DishCreateServiceRequest,
	DishRepository,
} from "@menu-master-api/interfaces"
import { prisma } from "@menu-master-api/lib/prisma"

import { Prisma } from "@prisma/client"

export class PrismaDishRepository implements DishRepository {
	async create(data: DishCreateServiceRequest) {
		const dishes = await prisma.dish.create({
			data: {
				...data,
			},
		})

		return dishes
	}

	async findAll(dishName: string, restaurantId: number) {
		const dishes = await prisma.dish.findMany({
			where: {
				name: { contains: dishName },
				restaurantId,
			},
		})

		return dishes
	}

	async findById(dishId: number) {
		const dish = await prisma.dish.findUnique({
			where: {
				dishId,
			},
		})

		return dish
	}

	async update(dishId: number, data: Prisma.DishUpdateInput) {
		const dishes = await prisma.dish.update({
			data,
			where: {
				dishId,
			},
		})

		return dishes
	}
}
