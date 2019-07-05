import EventEmitter from '../EventEmitter/EventEmitter';
import createElement from '../utilities/helpers/create-HTML-element';
import {
  ADD_ELEMENT,
  DELETE_ELEMENT,
  CHANGE_ELEMENT,
  REPLACE_VOIDS,
} from '../utilities/helpers/constants';

class View extends EventEmitter {
  constructor() {
    super();
    this.declarations();
  }

  findElement(id) {
    return this.elementsTable.querySelector(`[data-id="${id}"]`);
  }

  createElement(element) {
    const changingButton = createElement(
      'button',
      { className: 'element_changing_button' },
      'Изменить'
    );
    const deleteButton = createElement('button', { className: 'element_delete_button' }, 'Удалить');
    const elementItem = createElement('p', { className: 'element_name' }, element.title);
    const elements = createElement('div', { className: 'elements' }, elementItem);
    const elementButtons = createElement(
      'div',
      { className: 'element_buttons' },
      changingButton,
      deleteButton
    );
    const elementBlock = createElement(
      'div',
      // eslint-disable-next-line no-underscore-dangle
      { className: 'element_block', 'data-id': element._id },
      elements,
      elementButtons
    );

    return this.addEventListeners(elementBlock);
  }

  addEventListeners(element) {
    const changeButton = element.querySelector('.element_changing_button');
    const deleteButton = element.querySelector('.element_delete_button');

    changeButton.addEventListener('click', this.handleChangeElement.bind(this, element));
    deleteButton.addEventListener('click', this.handleDeleteElement.bind(this, element));

    return element;
  }

  handleAddElement(event) {
    event.preventDefault();
    if (this.addInput.value.replace(REPLACE_VOIDS, '') !== '') {
      this.emit(ADD_ELEMENT, this.addInput.value);
    }
  }

  handleDeleteElement(element) {
    const id = element.getAttribute('data-id');
    this.emit(DELETE_ELEMENT, id);
  }

  handleChangeElement(element) {
    const changeButton = element.querySelector('.element_changing_button');
    const item = element.querySelector('p');
    const id = element.getAttribute('data-id');
    let itemValue = item.textContent;

    if (changeButton.textContent === 'Изменить') {
      changeButton.textContent = 'Сохранить';
      const input = createElement('input', { value: `${itemValue}` });
      item.textContent = '';
      item.appendChild(input);
    } else {
      const input = element.querySelector('input');
      itemValue = input.value;
      this.emit(CHANGE_ELEMENT, id, itemValue);
    }
  }

  showElements(response) {
    response
      .then(elements => {
        elements.forEach(element => {
          const listElement = this.createElement(element);
          this.elementsTable.appendChild(listElement);
        });
      })
      .catch(err => console.log(err));
  }

  addElement(element) {
    const listElement = this.createElement(element);
    this.elementsTable.appendChild(listElement);
    this.addInput.value = '';
  }

  deleteElement(id) {
    const listElement = this.findElement(id);
    this.elementsTable.removeChild(listElement);
  }

  changeElement(id, title) {
    const listElement = this.findElement(id);
    const changeButton = listElement.querySelector('.element_changing_button');
    const item = listElement.querySelector('p');
    changeButton.textContent = 'Изменить';
    item.textContent = title;
  }

  declarations() {
    this.title = document.querySelector('.main_name');
    this.addInput = document.querySelector('.main_adding_input');
    this.addButton = document.querySelector('.main_adding_button');
    this.elementsTable = document.querySelector('.spreadsheet_of_elements');

    this.addButton.addEventListener('click', this.handleAddElement.bind(this));
  }
}

export default View;
