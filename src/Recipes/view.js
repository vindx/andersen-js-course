import { createElement, EventEmitter } from '../helpers';
import { dragStart, dragEnd, showIngredients } from '../DnD/dnd';

class RecipesView extends EventEmitter {
  constructor() {
    super();
    this.form = document.querySelector('.create_recipe_area');
    this.input = document.querySelector('#create_recipe_input');
    this.list = document.querySelector('#recipes_container');
    this.addInputButton = this.form.querySelector('.plus_element');

    this.form.addEventListener('submit', this.handleAdd.bind(this));
    this.addInputButton.addEventListener('click', this.handleAddInput.bind(this));
  }

  getIngredients() {
    const elements = this.form.querySelectorAll('.recipe_element_input');
    return Array.from(elements).reduce(
      (acc, element) => (element.value ? [...acc, element.value] : acc),
      []
    );
  }

  createElement(item) {
    const deleteButton = createElement(
      'button',
      { className: 'delete_button', onclick: event => event.stopPropagation() },
      'Удалить'
    );
    const liArray = item.ingredients.reduce(
      (acc, element) => [...acc, createElement('li', {}, element)],
      []
    );
    const ul = createElement('ul', { className: 'recipe_elements' }, ...liArray);
    const listItem = createElement(
      'div',
      {
        className: 'recipe',
        draggable: 'true',
        onclick: showIngredients.bind(this.list, item.id),
        ondragstart: dragStart.bind(this.list, item.id),
        ondragend: dragEnd.bind(this.list, item.id),
        'data-id': item.id,
      },
      item.name,
      ul,
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

  handleAddInput() {
    const label = this.form.querySelector('label');
    const newInput = createElement('input', { className: 'recipe_element_input' });

    label.appendChild(newInput);
  }

  handleAdd(event) {
    event.preventDefault();
    const firstIngredient = this.form.querySelector('.recipe_element_input');

    if (
      this.input.value.replace(/\s/g, '') !== '' &&
      firstIngredient.value.replace(/\s/g, '') !== ''
    ) {
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
    const label = this.form.querySelector('label');
    const elements = this.form.querySelectorAll('.recipe_element_input');
    const listItem = this.createElement(item);

    this.input.value = '';
    elements[0].value = '';
    Array.from(elements)
      .slice(1, elements.length)
      .forEach(element => label.removeChild(element));
    this.list.appendChild(listItem);
  }

  deleteItem(id) {
    const listItem = this.findItem(id);

    this.list.removeChild(listItem);
  }
}

export default RecipesView;
