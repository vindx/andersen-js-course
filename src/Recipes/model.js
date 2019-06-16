import { EventEmitter } from '../helpers';

class RecipesModel extends EventEmitter {
  constructor(items = []) {
    super();
    this.items = items;
  }

  // [
  //  {
  //    name: "Топор",
  //    id: "12312",
  //    ingredients: ["Палка", "Камень"],
  //  },
  //  {
  //    name: "Лук",
  //    id: "12332",
  //    ingredients: ["Палка", "Веревка"],
  //  },
  //  ...
  // ];

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
}

export default RecipesModel;
