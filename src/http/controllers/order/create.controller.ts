import { FastifyReply, FastifyRequest } from "fastify"

import {
	orderValidationBody,
} from "@menu-master-api/services/validations"
import { PrismaOrderRepository } from "@menu-master-api/repositories/prisma"
import { OrderService } from "@menu-master-api/services/order"

export async function create(req: FastifyRequest, res: FastifyReply) {
	const { total, restaurantId, orderDishes } = orderValidationBody.parse(
		req.body
	)

	try {
		const orderRepository = new PrismaOrderRepository()

		const orderService = new OrderService(orderRepository)

		const userId = Number(req.user.sub)

		await orderService.create(userId, {
			total,
			restaurantId,
			orderDishes,
		})

		return await res.status(201).send()
	} catch (err) {
		throw err
	}
}
