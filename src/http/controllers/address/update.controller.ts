import { FastifyReply, FastifyRequest } from "fastify"

import { z } from "zod"

import { PrismaAddressRepository } from "@menu-master-api/repositories/prisma/prisma-address.repository"
import { AddressService } from "@menu-master-api/services/address.services"
import { AddressNotExistsError } from "@menu-master-api/services/errors"
import { addressValidationBody } from "@menu-master-api/services/validations"

export async function update(req: FastifyRequest, res: FastifyReply) {
	const paramsAddressSchema = z.object({ addressId: z.string() })

	const { addressId } = paramsAddressSchema.parse(req.params)

	const address = addressValidationBody.parse(req.body)

	try {
		const addressRepository = new PrismaAddressRepository()

		const addressService = new AddressService(addressRepository)

		await addressService.update({
			addressId: Number(addressId),
			modifiedAddress: address,
		})

		return await res.status(200).send()
	} catch (err) {
		if (err instanceof AddressNotExistsError) {
			return res.status(404).send({
				message: err.message,
			})
		}

		throw err
	}
}
