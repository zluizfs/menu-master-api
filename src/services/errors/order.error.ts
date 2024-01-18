export class OrderNotExistsError extends Error {
	constructor() {
		super("Pedido não encontrado!")
	}
}
