import { RestaurantOpeningHours } from "@prisma/client"

export interface RestaurantOpeningHoursServiceResquest {
  day: number;
  openTime: Date;
  closeTime: Date;
}

export interface RestaurantOpeningHoursRepository {
  create(
    restaurantId: number,
    data: RestaurantOpeningHoursServiceResquest
  ): Promise<RestaurantOpeningHours>;
  findByIdAndRestaurantId(
    restaurantOpeningHoursId: number,
    restaurantId: number
  ): Promise<RestaurantOpeningHours | null>;
  findByDayAndRestaurantId(
    day: number,
    restaurantId: number
  ): Promise<RestaurantOpeningHours | null>;
}
