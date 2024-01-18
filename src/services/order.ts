import {
	OrderCreateServiceRequest,
	OrderRepository,
} from "@menu-master-api/interfaces"
import { OrderNotExistsError } from "./errors"

export class OrderService {
	constructor(private orderRepository: OrderRepository) {}

	async findById(orderId: number, restaurantId: number) {
		const order = await this.orderRepository.findById(orderId, restaurantId)

		if (!order) {
			throw new OrderNotExistsError()
		}

		return order
	}

	async findByUserId(userId: number) {
		const order = await this.orderRepository.findByUserId(userId)

		return order
	}

	async create(
		userId: number,
		{ total, restaurantId, orderDishes }: OrderCreateServiceRequest
	) {
		const order = await this.orderRepository.create(userId, {
			total,
			restaurantId,
			orderDishes
		})

		return {
			order,
		}
	}
}
