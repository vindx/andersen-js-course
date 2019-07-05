import addElementToDB from '../utilities/requests-to-database/add-element-to-database';
import deleteElementFromDB from '../utilities/requests-to-database/delete-element-from-database';
import changeElementFromDB from '../utilities/requests-to-database/change-element-from-database';
import {
  SERVER_URL,
  ADD_ELEMENT,
  DELETE_ELEMENT,
  CHANGE_ELEMENT,
  FAILED_SERVER_CONNECTION,
} from '../utilities/helpers/constants';

class Controller {
  constructor(view) {
    this.view = view;

    view.on(ADD_ELEMENT, this.addElement.bind(this));
    view.on(DELETE_ELEMENT, this.deleteElement.bind(this));
    view.on(CHANGE_ELEMENT, this.changeElement.bind(this));

    view.showElements(
      fetch(SERVER_URL)
        .then(response => response.json())
        .catch(() => console.log(FAILED_SERVER_CONNECTION))
    );
  }

  addElement(title) {
    addElementToDB(title)
      .then(element => this.view.addElement(element))
      .catch(() => console.log(FAILED_SERVER_CONNECTION));
  }

  deleteElement(id) {
    deleteElementFromDB(id)
      .then(() => this.view.deleteElement(id))
      .catch(() => console.log(FAILED_SERVER_CONNECTION));
  }

  changeElement(id, title) {
    changeElementFromDB(id, title)
      .then(() => this.view.changeElement(id, title))
      .catch(() => console.log(FAILED_SERVER_CONNECTION));
  }
}

export default Controller;
