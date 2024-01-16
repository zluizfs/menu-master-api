import { z } from "zod"

export const userValidationBody = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6).max(30),
	phoneNumber: z.string().min(10).max(11),
})