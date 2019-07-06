import EventEmitter from '../EventEmitter/EventEmitter';
import createElement from '../utilities/helpers/create-HTML-element-blueprint';
import createMainHTMLElement from '../utilities/helpers/create-main-HTML-element';
import createInputForm from '../utilities/helpers/create-input-form';
import {
  ADD_ELEMENT,
  DELETE_ELEMENT,
  CHANGE_ELEMENT,
  REPLACE_VOIDS,
  ADD_SUB_ELEMENT,
  SHOW_SUB_ELEMENTS,
  DELETE_SUB_ELEMENT,
  CHANGE_SUB_ELEMENT,
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
    const elementHeader = createMainHTMLElement(element);
    const subElements = createInputForm();
    const elementBlock = createElement(
      'div',
      {
        className: 'element_block',
        // eslint-disable-next-line no-underscore-dangle
        'data-id': element._id,
        // eslint-disable-next-line no-underscore-dangle
        onclick: this.handleShowSubElements.bind(this, element._id, subElements),
      },
      elementHeader,
      subElements
    );

    return this.addEventListeners(elementBlock);
  }

  addEventListeners(element) {
    const changeButton = element.querySelector('.element_changing_button');
    const deleteButton = element.querySelector('.element_delete_button');
    const addButton = element.querySelector('.sub_adding_button');

    changeButton.addEventListener('click', this.handleChangeElement.bind(this, element));
    deleteButton.addEventListener('click', this.handleDeleteElement.bind(this, element));
    addButton.addEventListener('click', this.handleAddSubElement.bind(this, element));

    return element;
  }

  createSubElement(element) {
    const elementHeader = createMainHTMLElement(element);
    const elementBlock = createElement(
      'div',
      {
        className: 'element_block',
        // eslint-disable-next-line no-underscore-dangle
        'data-id': element._id,
      },
      elementHeader
    );
    return this.addSubEventListeners(elementBlock);
  }

  addSubEventListeners(element) {
    const changeButton = element.querySelector('.element_changing_button');
    const deleteButton = element.querySelector('.element_delete_button');

    changeButton.addEventListener('click', this.handleChangeSubElement.bind(this, element));
    deleteButton.addEventListener('click', this.handleDeleteSubElement.bind(this, element));

    return element;
  }

  showElements(elements) {
    elements.forEach(element => {
      const listElement = this.createElement(element);
      this.elementsTable.appendChild(listElement);
    });
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
      const input = createElement('input', {
        value: `${itemValue}`,
        onclick: event => event.stopPropagation(),
      });
      item.textContent = '';
      item.appendChild(input);
    } else {
      const input = element.querySelector('input');
      itemValue = input.value;
      this.emit(CHANGE_ELEMENT, id, itemValue);
    }
  }

  handleShowSubElements(id, subElements) {
    const subBlock = subElements;
    if (subBlock.style.display === 'block') {
      subBlock.style.display = 'none';
    } else {
      subBlock.style.display = 'block';
      if (subBlock.getAttribute('status') !== 'data_was_gotten') {
        subBlock.setAttribute('status', 'data_was_gotten');
        this.emit(SHOW_SUB_ELEMENTS, id, subElements);
      }
    }
  }

  showSubElements(elements, subElements) {
    elements.forEach(element => {
      const listElement = this.createSubElement(element);
      subElements.appendChild(listElement);
    });
  }

  handleAddSubElement(element) {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    const input = element.querySelector('.sub_adding_input');
    const id = element.getAttribute('data-id');
    if (input.value.replace(REPLACE_VOIDS, '') !== '') {
      this.emit(ADD_SUB_ELEMENT, input.value, id, input);
    }
  }

  handleDeleteSubElement(element) {
    const id = element.getAttribute('data-id');
    const subBlock = element.parentNode;
    const departmentBlock = subBlock.parentNode;
    const departmentId = departmentBlock.getAttribute('data-id');

    this.emit(DELETE_SUB_ELEMENT, departmentId, id);
  }

  handleChangeSubElement(element) {
    const subBlock = element.parentNode;
    const departmentBlock = subBlock.parentNode;
    const departmentId = departmentBlock.getAttribute('data-id');
    const changeButton = element.querySelector('.element_changing_button');
    const item = element.querySelector('p');
    const id = element.getAttribute('data-id');
    let itemValue = item.textContent;

    if (changeButton.textContent === 'Изменить') {
      changeButton.textContent = 'Сохранить';
      const input = createElement('input', {
        value: `${itemValue}`,
        onclick: event => event.stopPropagation(),
      });
      item.textContent = '';
      item.appendChild(input);
    } else {
      const input = element.querySelector('input');
      itemValue = input.value;
      this.emit(CHANGE_SUB_ELEMENT, departmentId, id, itemValue);
    }
  }

  addElement(element) {
    const listElement = this.createElement(element);
    this.elementsTable.appendChild(listElement);
    this.addInput.value = '';
  }

  addSubElement(element, departmentId, input) {
    const subInput = input;
    const listElement = this.createSubElement(element);
    const parentElement = this.elementsTable.querySelector(`[data-id="${departmentId}"]`);
    const subElements = parentElement.querySelector('.sub_elements');
    subElements.appendChild(listElement);
    subInput.value = '';
  }

  deleteElement(id) {
    const listElement = this.findElement(id);
    this.elementsTable.removeChild(listElement);
  }

  deleteSubElement(departmentId, id) {
    const listParent = this.findElement(departmentId);
    const listElement = listParent.querySelector(`[data-id="${id}"]`);
    const subBlock = listParent.querySelector('.sub_elements');
    subBlock.removeChild(listElement);
  }

  changeElement(id, title) {
    const listElement = this.findElement(id);
    const changeButton = listElement.querySelector('.element_changing_button');
    const item = listElement.querySelector('p');
    changeButton.textContent = 'Изменить';
    item.textContent = title;
  }

  changeSubElement(departmentId, id, title) {
    const parentElement = this.findElement(departmentId);
    const subElements = parentElement.querySelector('.sub_elements');
    const listElement = subElements.querySelector(`[data-id="${id}"]`);
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
