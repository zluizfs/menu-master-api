import { Address, Prisma, Restaurant } from "@prisma/client"

export interface RestaurantCreateServiceRequest {
  name: string;
  description: string;
  imageUrl: string;
  phoneNumber: string;
  rating: number;
  address: Prisma.AddressCreateInput;
}

export interface RestaurantServiceUpdateRequest {
  modifiedRestaurant: Prisma.RestaurantUpdateInput;
}

export interface RestaurantServiceResponse {
  name: string;
  description: string;
  imageUrl: string;
  phoneNumber: string;
  rating: number;
  addressId: number;
  address: Address
}

export interface RestaurantRepository {
  create(data: RestaurantCreateServiceRequest): Promise<Restaurant>;
  findAll(nameOrDescription: string): Promise<Restaurant[] | null>;
  findById(restaurantId: number): Promise<RestaurantServiceResponse | null>;
  findByName(name: string): Promise<Restaurant | null>;
  update(
    restaurantId: number,
    data: Prisma.RestaurantUpdateInput
  ): Promise<Restaurant>;
}
