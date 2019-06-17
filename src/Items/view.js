import { createElement, EventEmitter } from '../helpers';
import { dragStart, dragEnd } from '../DnD/dnd';

class ItemsView extends EventEmitter {
  constructor() {
    super();
    this.form = document.querySelector('.create_item_area');
    this.input = document.querySelector('#create_item_input');
    this.list = document.querySelector('#items_container');

    this.form.addEventListener('submit', this.handleAdd.bind(this));
  }

  createElement(item) {
    const deleteButton = createElement('button', { className: 'delete_button' }, 'Удалить');
    const listItem = createElement(
      'div',
      {
        className: 'item',
        draggable: 'true',
        ondragstart: dragStart.bind(this.list, item.id),
        ondragend: dragEnd.bind(this.list, item.id),
        'data-id': item.id,
      },
      item.name,
      deleteButton
    );

    return this.addEventListeners(listItem);
  }

  addEventListeners(item) {
    const deleteButton = item.querySelector('.delete_button');

    deleteButton.addEventListener('click', this.handleDelete.bind(this));

    return item;
  }

  findItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  handleAdd(event) {
    event.preventDefault();

    if (this.input.value.replace(/\s/g, '') !== '') {
      this.emit('add', this.input.value);
    }
  }

  handleDelete(item) {
    const listItem = item.target.parentNode;
    const id = Number(listItem.getAttribute('data-id'));

    this.emit('delete', id);
  }

  show(items) {
    items.forEach(item => {
      const listItem = this.createElement(item);
      this.list.appendChild(listItem);
    });
  }

  addItem(item) {
    const listItem = this.createElement(item);

    this.input.value = '';
    this.list.appendChild(listItem);
  }

  deleteItem(id) {
    const listItem = this.findItem(id);

    this.list.removeChild(listItem);
  }
}

export default ItemsView;
