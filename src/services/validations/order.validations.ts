import { z } from "zod";

export const orderValidationBody = z.object({
  total: z.number().min(1),
  restaurantId: z.number().min(1),
  orderDishes: z
    .object({
      dishId: z.number(),
    })
    .array()
    .min(1),
});
