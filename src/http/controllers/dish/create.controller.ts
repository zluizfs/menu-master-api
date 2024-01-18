import { FastifyReply, FastifyRequest } from "fastify"

import { dishValidationBody } from "@menu-master-api/services/validations"
import { PrismaDishRepository } from "@menu-master-api/repositories/prisma"
import { DishService } from "@menu-master-api/services/dish.services"

export async function create(req: FastifyRequest, res: FastifyReply) {
	const { name, description, price, imageUrl, dishesCategoryId, restaurantId } =
    dishValidationBody.parse(req.body)

	try {
		const dishRepository = new PrismaDishRepository()

		const dishService = new DishService(dishRepository)

		await dishService.create({
			name,
			description,
			price,
			imageUrl,
			dishesCategoryId,
			restaurantId,
		})
		return await res.status(201).send()
	} catch (err) {
		throw err
	}
}
