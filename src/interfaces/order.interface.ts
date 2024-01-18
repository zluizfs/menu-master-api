import { Order } from "@prisma/client"

export interface OrderCreateServiceRequest {
  total:  number 
  restaurantId: number
  orderDishes: { disheId: number}[]
}

export interface OrderRepository {
  create(userId: number, data: OrderCreateServiceRequest): Promise<Order>
  findById(orderId: number, restaurantId: number): Promise<Order | null>
  findByUserId(userId: number): Promise<Order[]>
}
