import { z } from "zod"

export const dishValidationBody = z.object({
	name: z.string().min(4).max(150),
	description: z.string().max(500),
	imageUrl: z.string().min(2).max(150),
	price: z.number().min(1),
	dishesCategoryId: z.number().min(1),
	restaurantId: z.number().min(1),
})

export const dishValidationQuery = z.object({
	dishName: z.string().optional(),
	restaurantId: z.string(),
})
