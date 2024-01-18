import { FastifyReply, FastifyRequest } from "fastify"

import { AddressUserUserService, UserService } from "@menu-master-api/services"
import { z } from "zod"
import {
	PrismaAddressRepository,
	PrismaAddressUserRepository,
	PrismaUsersRepository,
} from "@menu-master-api/repositories/prisma"
import { UserAlreadyRegistredError } from "@menu-master-api/services/errors"

export async function register(req: FastifyRequest, res: FastifyReply) {
	const createUserBody = z.object({
		name: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(6).max(30),
		phoneNumber: z.string().min(10).max(11),
	})

	const { email, name, password, phoneNumber } = createUserBody.parse(req.body)

	try {
		const usersRepository = new PrismaUsersRepository()

		const userService = new UserService(usersRepository)

		await userService.create({
			email: email,
			name: name,
			password: password,
			phoneNumber: phoneNumber,
		})
	} catch (err) {
		if (err instanceof UserAlreadyRegistredError) {
			return res.status(409).send({
				message: err.message,
			})
		}

		throw err
	}

	return await res.status(201).send()
}

export async function registerWithAddress(
	req: FastifyRequest,
	res: FastifyReply
) {
	const createUserBodyWithAddress = z.object({
		name: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(6).max(30),
		neighborhood: z.string(),
		phoneNumber: z.string().min(10).max(11),
		street: z.string().min(1),
		number: z.number(),
		city: z.string().min(2).max(150),
		state: z.string().min(2).max(2),
		landmark: z.string(),
		complement: z.string(),
	})

	const user = createUserBodyWithAddress.parse(req.body)

	try {
		const usersRepository = new PrismaUsersRepository()
		const addressRepository = new PrismaAddressRepository()
		const addressUserRepository = new PrismaAddressUserRepository()

		const addressUserService = new AddressUserUserService(
			usersRepository,
			addressRepository,
			addressUserRepository
		)

		await addressUserService.createUserAndAddress({
			...user,
		})
	} catch (err) {
		if (err instanceof UserAlreadyRegistredError) {
			return res.status(409).send({
				message: err.message,
			})
		}

		throw err
	}

	return await res.status(201).send()
}
