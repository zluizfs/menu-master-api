export class RestaurantNotExistsError extends Error {
	constructor() {
		super("Restaurante não encontrado!")
	}
}

export class RestaurantAlreadyRegisteredError extends Error {
	constructor() {
		super("Restaurante já cadastrado!")
	}
}