import { FastifyReply, FastifyRequest } from "fastify"

import { PrismaAddressRepository } from "@menu-master-api/repositories/prisma/prisma-address.repository"
import { AddressService } from "@menu-master-api/services/address.services"
import { addressValidationBody } from "@menu-master-api/services/validations"

export async function create(req: FastifyRequest, res: FastifyReply) {
	const { street, number, city, state, landmark, complement, neighborhood } =
    addressValidationBody.parse(req.body)

	try {
		const addressRepository = new PrismaAddressRepository()

		const addressService = new AddressService(addressRepository)

		await addressService.create({
			street: street,
			number: number,
			city: city,
			neighborhood: neighborhood,
			state: state,
			landmark: landmark,
			complement: complement,
		})
		return await res.status(201).send()
	} catch (err) {
		throw err
	}
}
