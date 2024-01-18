import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"

import { PrismaAddressRepository } from "@menu-master-api/repositories/prisma/prisma-address.repository"
import { AddressService } from "@menu-master-api/services/address.services"
import { AddressNotExistsError } from "@menu-master-api/services/errors"

export async function findById(req: FastifyRequest, res: FastifyReply) {
	const paramsAddressSchema = z.object({ addressId: z.string() })

	const { addressId } = paramsAddressSchema.parse(req.params)

	try {
		const addressRepository = new PrismaAddressRepository()

		const addressService = new AddressService(addressRepository)

		const address = await addressService.findById(Number(addressId))

		return await res.status(200).send(address)
	} catch (err) {
		if (err instanceof AddressNotExistsError) {
			return res.status(404).send({
				message: err.message,
			})
		}

		throw err
	}
}
