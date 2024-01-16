import { AddressRepository } from "@menu-master-api/interfaces/address.interface"
import { prisma } from "@menu-master-api/lib/prisma"

import { Prisma } from "@prisma/client"

export class PrismaAddressRepository implements AddressRepository {
	async create(data: Prisma.AddressCreateInput) {
		const user = await prisma.address.create({
			data,
		})

		return user
	}
}
