import { EventEmitter } from '../helpers';

class Model extends EventEmitter {
  constructor(recipes = [], items = []) {
    super();
    this.recipes = recipes;
    this.items = items;
  }

  addRecipe(recipe) {
    this.recipes.push(recipe);
    return recipe;
  }

  addItem(item) {
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(item => item.id === id);

    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  deleteRecipe(id) {
    const index = this.recipes.findIndex(item => item.id === id);

    if (index > -1) {
      this.recipes.splice(index, 1);
    }
  }
}

export default Model;
