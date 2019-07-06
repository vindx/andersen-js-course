import addElementToDepartmentsDB from '../utilities/requests-to-database/add-element-to-depatments-database';
import deleteElementFromDepartmentsDB from '../utilities/requests-to-database/delete-element-from-departments-database';
import changeElementFromDepartmentsDB from '../utilities/requests-to-database/change-element-from-departments-database';
import addElementToOfficesDB from '../utilities/requests-to-database/add-element-to-offices-database';
import deleteElementFromOfficesDB from '../utilities/requests-to-database/delete-element-from-offices-database';
import changeElementFromOfficesDB from '../utilities/requests-to-database/change-element-from-offices-database';
import {
  SERVER_URL,
  ADD_ELEMENT,
  DELETE_ELEMENT,
  CHANGE_ELEMENT,
  ADD_SUB_ELEMENT,
  SHOW_SUB_ELEMENTS,
  DELETE_SUB_ELEMENT,
  CHANGE_SUB_ELEMENT,
  FAILED_SERVER_CONNECTION,
} from '../utilities/helpers/constants';

class Controller {
  constructor(view) {
    this.view = view;

    this.initializations();

    fetch(`${SERVER_URL}/departments`)
      .catch(() => console.log(FAILED_SERVER_CONNECTION))
      .then(response => response.json())
      .then(elements => this.view.showElements(elements));
  }

  addElement(title) {
    addElementToDepartmentsDB(title, 'departments')
      .catch(() => console.log(FAILED_SERVER_CONNECTION))
      .then(element => this.view.addElement(element));
  }

  deleteElement(id) {
    deleteElementFromDepartmentsDB(id, 'departments')
      .catch(() => console.log(FAILED_SERVER_CONNECTION))
      .then(() =>
        fetch(`${SERVER_URL}/offices/${id}`, {
          method: 'DELETE',
        })
      )
      .then(() => this.view.deleteElement(id));
  }

  changeElement(id, title) {
    changeElementFromDepartmentsDB(id, title, 'departments')
      .catch(() => console.log(FAILED_SERVER_CONNECTION))
      .then(() => this.view.changeElement(id, title));
  }

  showSubElements(departmentId, subElements) {
    fetch(`${SERVER_URL}/offices/${departmentId}`)
      .catch(() => console.log(FAILED_SERVER_CONNECTION))
      .then(response => response.json())
      .then(elements => this.view.showSubElements(elements, subElements));
  }

  addSubElement(title, departmentId, input) {
    addElementToOfficesDB(title, departmentId, 'offices')
      .catch(() => console.log(FAILED_SERVER_CONNECTION))
      .then(element => this.view.addSubElement(element, departmentId, input));
  }

  deleteSubElement(departmentId, id) {
    deleteElementFromOfficesDB(departmentId, id, 'offices')
      .catch(() => console.log(FAILED_SERVER_CONNECTION))
      .then(() => this.view.deleteSubElement(departmentId, id));
  }

  changeSubElement(departmentId, id, title) {
    changeElementFromOfficesDB(departmentId, id, title, 'offices')
      .catch(() => console.log(FAILED_SERVER_CONNECTION))
      .then(() => this.view.changeSubElement(departmentId, id, title));
  }

  initializations() {
    this.view.on(ADD_ELEMENT, this.addElement.bind(this));
    this.view.on(DELETE_ELEMENT, this.deleteElement.bind(this));
    this.view.on(CHANGE_ELEMENT, this.changeElement.bind(this));

    this.view.on(SHOW_SUB_ELEMENTS, this.showSubElements.bind(this));
    this.view.on(ADD_SUB_ELEMENT, this.addSubElement.bind(this));
    this.view.on(DELETE_SUB_ELEMENT, this.deleteSubElement.bind(this));
    this.view.on(CHANGE_SUB_ELEMENT, this.changeSubElement.bind(this));
  }
}

export default Controller;
