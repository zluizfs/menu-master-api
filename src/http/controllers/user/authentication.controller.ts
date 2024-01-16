import { FastifyReply, FastifyRequest } from "fastify"

import { AuthenticationService } from "@menu-master-api/services"
import { z } from "zod"
import { PrismaUsersRepository } from "@menu-master-api/repositories/prisma"
import { InvalidCredentialsError } from "@menu-master-api/services/errors"

export async function authentication(req: FastifyRequest, res: FastifyReply) {
	const authenticationUserBody = z.object({
		email: z.string().email(),
		password: z.string().min(6).max(30),
	})

	const { email, password } = authenticationUserBody.parse(req.body)

	try {
		const usersRepository = new PrismaUsersRepository()

		const authenticationService = new AuthenticationService(usersRepository)

		const { user } = await authenticationService.auth({
			email: email,
			password: password,
		})

		const token = await res.jwtSign(
			{},
			{
				sign: {
					sub: String(user.userId),
					expiresIn: "4h"
				},
			},
		)

		return await res.status(200).send({
			token,
		})
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return res.status(409).send({
				message: err.message,
			})
		}

		throw err
	}
}
