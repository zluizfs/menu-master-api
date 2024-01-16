import { AddressUserRepository, AddressUserServiceRequest } from "@menu-master-api/interfaces/address-user.interface"
import { prisma } from "@menu-master-api/lib/prisma"

export class PrismaAddressUserRepository implements AddressUserRepository {
	async create(data: AddressUserServiceRequest) {
		const user = await prisma.addressUser.create({
			data,
		})

		return user
	}
}
