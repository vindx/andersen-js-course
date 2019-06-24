import { ADD_ITEM, ADD_RECIPE, DELETE_ITEM, DELETE_RECIPE } from '../utilities/constants';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.initialization(this.view, this.model);
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

  initialization(view, model) {
    view.on(ADD_ITEM, this.addItem.bind(this));
    view.on(ADD_RECIPE, this.addRecipe.bind(this));
    view.on(DELETE_ITEM, this.deleteItem.bind(this));
    view.on(DELETE_RECIPE, this.deleteRecipe.bind(this));

    view.showRecipes(model.recipes);
    view.showItems(model.items);
  }
}

export default Controller;
