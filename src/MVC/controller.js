class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('addItem', this.addItem.bind(this));
    view.on('addRecipe', this.addRecipe.bind(this));
    view.on('deleteItem', this.deleteItem.bind(this));
    view.on('deleteRecipe', this.deleteRecipe.bind(this));

    view.showRecipes(model.recipes);
    view.showItems(model.items);
  }

  addItem(name) {
    const item = this.model.addItem({
      name,
      id: Date.now(),
    });

    this.view.addItem(item);
  }

  addRecipe(name) {
    const recipe = this.model.addRecipe({
      name,
      id: Date.now(),
      ingredients: this.view.getIngredients(),
    });

    this.view.addRecipe(recipe);
  }

  deleteItem(id) {
    this.model.deleteItem(id);
    this.view.deleteItem(id);
  }

  deleteRecipe(id) {
    this.model.deleteRecipe(id);
    this.view.deleteRecipe(id);
  }
}

export default Controller;
