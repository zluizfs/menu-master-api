import {
	RestaurantOpeningHoursRepository,
	RestaurantOpeningHoursServiceResquest,
} from "@menu-master-api/interfaces"

import { prisma } from "@menu-master-api/lib/prisma"

import { Prisma } from "@prisma/client"

export class PrismaRestaurantOpeningHoursRepositoryRepository
implements RestaurantOpeningHoursRepository
{
	async findByIdAndRestaurantId(restaurantOpeningHoursId: number, restaurantId: number) {
		const restaurantOpeningHours = await prisma.restaurantOpeningHours.findUnique({
			where: {
				restaurantOpeningHoursId_restaurantId: {
					restaurantOpeningHoursId,
					restaurantId
				}
			}
		})

		return restaurantOpeningHours
	}

	async findByDayAndRestaurantId(day: number, restaurantId: number) {
		const restaurantOpeningHours = await prisma.restaurantOpeningHours.findFirst({
			where: {
				day,
				restaurantId
			}
		})

		return restaurantOpeningHours
	}

	
	async create(restaurantId: number, {
		day,
		openTime,
		closeTime,
	}: RestaurantOpeningHoursServiceResquest) {
		const restaurantOpeningHours = await prisma.restaurantOpeningHours.create({
			data: {
				restaurantId,
				day,
				openTime,
				closeTime,
			},
		})

		return restaurantOpeningHours
	}

	async findById(restaurantOpeningHoursId: number, restaurantId: number) {
		const restaurantOpeningHours = await prisma.restaurantOpeningHours.findUnique({
			where: {
				restaurantOpeningHoursId_restaurantId: {
					restaurantOpeningHoursId,
					restaurantId,
				}
			},
		})

		return restaurantOpeningHours
	}

	async update(restaurantOpeningHoursId: number, restaurantId: number, data: Prisma.RestaurantOpeningHoursUpdateInput) {
		const address = await prisma.restaurantOpeningHours.update({
			data,
			where: {
				restaurantOpeningHoursId_restaurantId: {
					restaurantOpeningHoursId,
					restaurantId,
				}
			},
		})

		return address
	}
}
