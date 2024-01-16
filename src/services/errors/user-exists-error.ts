export class UserExistsError extends Error {
	constructor() {
		super("E-mail informado já existe!")
	}
}