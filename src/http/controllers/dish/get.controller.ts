import { FastifyReply, FastifyRequest } from "fastify"

import { PrismaDishRepository } from "@menu-master-api/repositories/prisma"
import { DishService } from "@menu-master-api/services"
import { dishValidationQuery } from "@menu-master-api/services/validations"

export async function get(req: FastifyRequest, res: FastifyReply) {
	const { dishName, restaurantId} = dishValidationQuery.parse(req.query)

	try {
		const dishRepository = new PrismaDishRepository()

		const dishService = new DishService(dishRepository)

		const dishes = await dishService.findAll(
			dishName || "",
			+restaurantId
		)
		return await res.status(200).send(dishes)
	} catch (err) {
		throw err
	}
}
