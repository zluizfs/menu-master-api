import {
	UserRepository,
} from "@menu-master-api/interfaces"
import { prisma } from "@menu-master-api/lib/prisma"

import { Prisma } from "@prisma/client"


export class PrismaUsersRepository implements UserRepository {

	async findByEmail(email: string): Promise<{
    userId: bigint;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    createdAt: Date;
  } | null> {
		const user = await prisma.user.findUnique({
			where: { email: email },
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
