import { EventEmitter } from '../helpers';

class Model extends EventEmitter {
  constructor(items = []) {
    super();
    this.items = items;
  }

  // [
  //  {
  //    name: "Камень",
  //    id: "12312",
  //  },
  //  {
  //    name: "Палка",
  //    id: "12332",
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

export default Model;
