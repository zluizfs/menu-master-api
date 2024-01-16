import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"

import { ZodError } from "zod"
import fastifyJwt from "@fastify/jwt"
import { env } from "./env"
import { userRoutes } from "./http/controllers/user/routes"
import { addressRoutes } from "./http/controllers/address/routes"

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
	origin: "*",
})

app.register(userRoutes)
app.register(addressRoutes)

app.setErrorHandler((err, _, res) => {
	if (err instanceof ZodError) {
		return res
			.status(400)
			.send({ message: "Erro de validação.", issues: err.format() })
	}

	if (env.NODE_ENV !== "production") {
		console.error(err)
	} 

	return res.status(500).send({ message: "Erro interno do servidor" })
})