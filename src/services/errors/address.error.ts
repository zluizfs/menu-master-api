export class AddressNotExistsError extends Error {
	constructor() {
		super("Endereço não encontrado!")
	}
}