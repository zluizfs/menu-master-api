export class DishNotExistsError extends Error {
	constructor() {
		super("Prato não encontrado!")
	}
}
