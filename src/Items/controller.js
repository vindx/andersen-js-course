class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addItem.bind(this));
    view.on('delete', this.deleteItem.bind(this));

    view.show(model.items);
  }

  addItem(name) {
    const item = this.model.addItem({
      name,
      id: Date.now(),
    });

    this.view.addItem(item);
  }

  deleteItem(id) {
    this.model.deleteItem(id);
    this.view.deleteItem(id);
  }
}

export default Controller;
