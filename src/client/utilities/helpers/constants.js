const SERVER_URL = 'http://localhost:3000';

const ADD_ELEMENT = 'addElement';
const DELETE_ELEMENT = 'deleteElement';
const CHANGE_ELEMENT = 'changeElement';

const FAILED_SERVER_CONNECTION = 'UPS! Some troubles with connection! Probably server is offline!';

const REPLACE_VOIDS = /\s+/g;

export {
  SERVER_URL,
  ADD_ELEMENT,
  CHANGE_ELEMENT,
  DELETE_ELEMENT,
  FAILED_SERVER_CONNECTION,
  REPLACE_VOIDS,
};
