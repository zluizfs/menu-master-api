export class DisheCategoryNotExistsError extends Error {
	constructor() {
		super("Categoria não encontrada!")
	}
}