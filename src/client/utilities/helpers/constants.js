const SERVER_URL = 'http://localhost:3000';

const ADD_ELEMENT = 'addElement';
const DELETE_ELEMENT = 'deleteElement';
const CHANGE_ELEMENT = 'changeElement';
const ADD_SUB_ELEMENT = 'addSubElement';
const SHOW_SUB_ELEMENTS = 'showSubElements';
const DELETE_SUB_ELEMENT = 'deleteSubElement';
const CHANGE_SUB_ELEMENT = 'changeSubElement';

const FAILED_SERVER_CONNECTION = 'UPS! Some troubles with connection! Probably server is offline!';

const REPLACE_VOIDS = /\s+/g;

export {
  SERVER_URL,
  ADD_ELEMENT,
  CHANGE_ELEMENT,
  DELETE_ELEMENT,
  ADD_SUB_ELEMENT,
  SHOW_SUB_ELEMENTS,
  DELETE_SUB_ELEMENT,
  CHANGE_SUB_ELEMENT,
  FAILED_SERVER_CONNECTION,
  REPLACE_VOIDS,
};
