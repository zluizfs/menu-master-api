import { RestaurantDishes } from "@prisma/client";

export interface RestaurantDishesServiceCreateRequest {
  restaurantId: number;
  dishId: number;
}

export interface RestaurantDishesRepository {
  findById(
    restaurantId: number,
    dishId: number
  ): Promise<RestaurantDishes | null>;
  create(data: RestaurantDishesServiceCreateRequest): Promise<RestaurantDishes>;
}
