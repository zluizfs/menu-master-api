import { AddressRepository } from "@menu-master-api/interfaces/address.interface"
import { prisma } from "@menu-master-api/lib/prisma"

import { Prisma } from "@prisma/client"

export class PrismaAddressRepository implements AddressRepository {
	async create(data: Prisma.AddressCreateInput) {
		const address = await prisma.address.create({
			data,
		})

		return address
	}

	async findById(addressId: number) {
		const address = await prisma.address.findUnique({
			where: {
				addressId: addressId
			}
		})

		return address
	}

	async update(addressId: number, data: Prisma.AddressUpdateInput) {
		const address = await prisma.address.update({
			data,
			where: {
				addressId: addressId,
			}
		})

		return address
	}
}
