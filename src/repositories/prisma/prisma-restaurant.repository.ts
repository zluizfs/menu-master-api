import {
	RestaurantCreateServiceRequest,
	RestaurantRepository,
	RestaurantServiceResponse,
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

	async findAll(nameOrDescription: string)  {
		const restaurant = await prisma.restaurant.findMany({
			where: {
				OR: [
					{
						name: {
							contains: nameOrDescription,
						},
					},
					{
						description: {
							contains: nameOrDescription,
						},
					},
				],
			},

		})
  
		return restaurant
	}
  

	async findById(restaurantId: number): Promise<RestaurantServiceResponse | null> {
		const restaurant = await prisma.restaurant.findUnique({
			where: {
				id: restaurantId,
			},
			include: {
				address: true
			}
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
				id: restaurantId,
			},
		})

		return address
	}
}
