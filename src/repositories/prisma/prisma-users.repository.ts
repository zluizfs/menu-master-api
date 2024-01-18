import { UserRepository } from "@menu-master-api/interfaces"
import { prisma } from "@menu-master-api/lib/prisma"

import { Prisma } from "@prisma/client"

export class PrismaUsersRepository implements UserRepository {
	async findById(userId: number)  {
		const user = await prisma.user.findUnique({
			where: { userId },
			include: {
				addresses: {
					include: {
						address: true,
					},
				},
			},
		})

		return user
	}

	async findByEmail(email: string)  {
		const user = await prisma.user.findUnique({
			where: { email: email },
			include: {
				addresses: {
					include: {
						address: true,
					},
				},
			},
		})

		return user
	}
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		})

		return user
	}
}
