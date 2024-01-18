import { OrderCreateServiceRequest, OrderRepository } from "@menu-master-api/interfaces"
import { prisma } from "@menu-master-api/lib/prisma"

import { Prisma } from "@prisma/client"

export class PrismaOrderRepository implements OrderRepository {
	async create(userId: number, { total, restaurantId, orderDishes }: OrderCreateServiceRequest) {
		const order = await prisma.order.create({
			data: {
				total,
				restaurantId,
				userId,
				orderRestaurantDishes: {
					create: orderDishes.map(({ disheId }) => ({
						dishes: {
							connect: {
								disheId: disheId,
							},
						},
					})),
				},
			}
		})

		return order
	}

	async findById(orderId: number, restaurantId: number) {
		const order = await prisma.order.findUnique({
			where: {
				orderId,
				restaurantId
			}
		})

		return order
	}

	async findByUserId(userId: number) {
		const order = await prisma.order.findMany({
			where: {
				userId
			}
		})

		return order
	}

	async update(orderId: number,  data: Prisma.OrderUpdateInput) {
		const order = await prisma.order.update({
			data,
			where: {
				orderId,
			}
		})

		return order
	}
}
