import { Prisma, Restaurant } from "@prisma/client"

export interface RestaurantCreateServiceRequest {
  name: string
  description: string
  imageUrl: string
  phoneNumber: string
  rating: number
  address: Prisma.AddressCreateInput
}

export interface RestaurantServiceUpdateRequest  {
  modifiedRestaurant: Prisma.RestaurantUpdateInput
}

export interface RestaurantRepository {
  create(data: RestaurantCreateServiceRequest): Promise<Restaurant>
  findById(restaurantId: number): Promise<Restaurant | null>
  findByName(name: string): Promise<Restaurant | null>
  update(restaurantId: number, data: Prisma.RestaurantUpdateInput): Promise<Restaurant>
}
