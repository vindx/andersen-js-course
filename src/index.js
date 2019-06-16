import './styles/main.css';
import './DnD/dnd';
import Model from './Items/model';
import View from './Items/view';
import Controller from './Items/controller';

const model = new Model();
const view = new View();
const controller = new Controller(model, view); // eslint-disable-line no-unused-vars
