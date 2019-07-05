import './styles/main.css';
import 'babel-polyfill';
import Controller from './View&Controller/Controller';
import View from './View&Controller/View';

const view = new View();
const controller = new Controller(view); // eslint-disable-line no-unused-vars
