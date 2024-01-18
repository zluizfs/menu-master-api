export class DisheNotExistsError extends Error {
	constructor() {
		super("Prato não encontrado!")
	}
}