export class InvalidCredentialsError extends Error {
	constructor() {
		super("E-mail ou senha inválidos!")
	}
}

export class UserAlreadyRegistredError extends Error {
	constructor() {
		super("E-mail informado já existe!")
	}
}