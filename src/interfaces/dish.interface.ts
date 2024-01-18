import { Dish, Prisma } from "@prisma/client"

export interface DishCreateServiceRequest {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  dishesCategoryId: number;
  restaurantId: number;
}

export interface DishServiceUpdateRequest {
  modifiedDish: Prisma.DishUpdateInput;
}

export interface DishRepository {
  create(data: DishCreateServiceRequest): Promise<Dish>;
  findAll(q: string, restaurantId: number): Promise<Dish[] | null>;
  findById(dishId: number): Promise<Dish | null>;
  update(dishId: number, data: Prisma.DishUpdateInput): Promise<Dish>;
}
