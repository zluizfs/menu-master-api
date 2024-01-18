import { FastifyReply, FastifyRequest } from "fastify"

import { PrismaRestaurantRepository } from "@menu-master-api/repositories/prisma"
import { RestaurantService } from "@menu-master-api/services"
import { restaurantValidationQuery } from "@menu-master-api/services/validations"
import { z } from "zod"

export async function findAll(req: FastifyRequest, res: FastifyReply) {
	const { nameOrDescription } = restaurantValidationQuery.parse(req.query)

	try {
		const restaurantRepository = new PrismaRestaurantRepository()

		const restaurantService = new RestaurantService(restaurantRepository)

		const restaurants = await restaurantService.findAll(nameOrDescription || "")

		return await res.status(200).send(restaurants)
	} catch (err) {
		throw err
	}
}

export async function findById(req: FastifyRequest, res: FastifyReply) {
	const paramsRestaurantSchema = z.object({ restaurantId: z.string() })

	const { restaurantId } = paramsRestaurantSchema.parse(req.params)

	try {
		const restaurantRepository = new PrismaRestaurantRepository()

		const restaurantService = new RestaurantService(restaurantRepository)

		const restaurants = await restaurantService.findById(Number(restaurantId))

		return await res.status(200).send(restaurants)
	} catch (err) {
		throw err
	}
}

