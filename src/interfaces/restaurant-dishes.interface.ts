import { RestaurantDishes } from "@prisma/client"

export interface RestaurantDishesServiceCreateRequest {
  restaurantId: number
  disheId: number
}

export interface RestaurantDishesRepository {
  findById(restaurantId: number, disheId: number): Promise<RestaurantDishes | null>
  create(data: RestaurantDishesServiceCreateRequest): Promise<RestaurantDishes>
}
