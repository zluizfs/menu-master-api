import { FastifyReply, FastifyRequest } from "fastify"

import {
	disheValidationBody,
} from "@menu-master-api/services/validations"
import { PrismaDisheRepository } from "@menu-master-api/repositories/prisma"
import { DisheService } from "@menu-master-api/services/dishe.services"

export async function create(req: FastifyRequest, res: FastifyReply) {
	const { name, description, price, imageUrl, dishesCategoryId } =
    disheValidationBody.parse(req.body)

	try {
		const disheRepository = new PrismaDisheRepository()

		const disheService = new DisheService(disheRepository)

		await disheService.create({
			name,
			description,
			price,
			imageUrl,
			dishesCategoryId,
		})
		return await res.status(201).send()
	} catch (err) {
		throw err
	}
}
