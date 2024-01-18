import { z } from "zod"
import { addressValidationBody } from "./address.validations"

export const restaurantValidationBody = z.object({
	name: z.string().min(4).max(150),
	description: z.string().min(10).max(250),
	imageUrl: z.string().min(2).max(150),
	rating: z.number(),
	phoneNumber: z.string().min(11),
	address: addressValidationBody,
})

export const restaurantValidationQuery = z.object({
	nameOrDescription: z.string().optional(),
})
