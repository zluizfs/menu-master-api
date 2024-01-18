export class DishCategoryNotExistsError extends Error {
  constructor() {
    super("Categoria não encontrada!");
  }
}
