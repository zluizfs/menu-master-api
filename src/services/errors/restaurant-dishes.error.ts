export class RestaurantDishesAlrealdyLinked extends Error {
	constructor() {
		super("Prato já vinculado ao restaurante!")
	}
}