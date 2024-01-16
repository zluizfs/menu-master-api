import {
	RestaurantCreateServiceRequest,
	RestaurantRepository,
} from "@menu-master-api/interfaces"

import { prisma } from "@menu-master-api/lib/prisma"

import { Prisma } from "@prisma/client"

export class PrismaRestaurantRepository implements RestaurantRepository {
	async create({
		name,
		description,
		imageUrl,
		phoneNumber,
		rating,
		address,
	}: RestaurantCreateServiceRequest) {
		const restaurant = await prisma.restaurant.create({
			data: {
				name,
				description,
				imageUrl,
				phoneNumber,
				rating,
				address: {
					create: {
						...address,
					},
				},
			},
		})

		return restaurant
	}

	async findById(restaurantId: number) {
		const restaurant = await prisma.restaurant.findUnique({
			where: {
				restaurantId: restaurantId,
			},
		})

		return restaurant
	}

	async findByName(name: string) {
		const restaurant = await prisma.restaurant.findFirst({
			where: {
				name: { contains: name },
			},
		})

		return restaurant
	}

	async update(restaurantId: number, data: Prisma.RestaurantUpdateInput) {
		const address = await prisma.restaurant.update({
			data,
			where: {
				restaurantId: restaurantId,
			},
		})

		return address
	}
}
