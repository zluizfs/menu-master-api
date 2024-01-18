import { DisheCreateServiceRequest, DisheRepository } from "@menu-master-api/interfaces"
import { prisma } from "@menu-master-api/lib/prisma"

import { Prisma } from "@prisma/client"

export class PrismaDisheRepository implements DisheRepository {
	async create(data: DisheCreateServiceRequest) {
		const dishes = await prisma.dishe.create({
			data:{
				...data,
			}
		})

		return dishes
	}

	async findById(disheId: number) {
		const dishe = await prisma.dishe.findUnique({
			where: {
				disheId
			}
		})

		return dishe
	}

	async update(disheId: number, data: Prisma.DisheUpdateInput) {
		const dishes = await prisma.dishe.update({
			data,
			where: {
				disheId,
			}
		})

		return dishes
	}
}
