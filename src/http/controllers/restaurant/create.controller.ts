import { FastifyReply, FastifyRequest } from "fastify"

import { PrismaRestaurantRepository } from "@menu-master-api/repositories/prisma"
import { RestaurantService } from "@menu-master-api/services"
import { restaurantValidationBody } from "@menu-master-api/services/validations/restaurant.validations"
import { RestaurantAlreadyRegisteredError } from "@menu-master-api/services/errors"

export async function create(req: FastifyRequest, res: FastifyReply) {
	const restaurant = restaurantValidationBody.parse(req.body)

	try {
		const restaurantRepository = new PrismaRestaurantRepository()

		const restaurantService = new RestaurantService(restaurantRepository)

		await restaurantService.create({
			...restaurant,
		})
		return await res.status(201).send()
	} catch (err) {
		if (err instanceof RestaurantAlreadyRegisteredError) {
			return res.status(409).send({
				message: err.message,
			})
		}

		throw err
	}
}
