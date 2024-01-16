import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"

import { PrismaAddressRepository } from "@menu-master-api/repositories/prisma/prisma-address.repository"
import { AddressService } from "@menu-master-api/services/address.services"

export async function create(req: FastifyRequest, res: FastifyReply) {
	const createAddressBody = z.object({
		street: z.string().min(1),
		number: z.number(),
		city: z.string().min(2).max(150),
		state: z.string().min(2).max(2),
		landmark: z.string(),
		complement: z.string(),
	})

	const { street, number, city, state, landmark, complement } =
    createAddressBody.parse(req.body)

	try {
		const addressRepository = new PrismaAddressRepository()

		const addressService = new AddressService(addressRepository)

		await addressService.create({
			street: street,
			number: number,
			city: city,
			state: state,
			landmark: landmark,
			complement: complement,
		})
		return await res.status(201).send()
	} catch (err) {
		throw err
	}
}
