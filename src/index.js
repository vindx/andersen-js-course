import './styles/main.css';

import Model from './MVC/model';
import View from './MVC/view';
import Controller from './MVC/controller';

const startingRecipes = [
  {
    name: 'Топор',
    id: Date.now() + 1,
    ingredients: ['Палка', 'Камень'],
  },
  {
    name: 'Простой лук',
    id: Date.now() + 2,
    ingredients: ['Палка', 'Веревка'],
  },
];

const startingItems = [
  {
    name: 'Камень',
    id: Date.now() + 100,
  },
  {
    name: 'Палка',
    id: Date.now() + 101,
  },
  {
    name: 'Веревка',
    id: Date.now() + 103,
  },
];

const model = new Model(startingRecipes, startingItems);
const view = new View();
const controller = new Controller(model, view); // eslint-disable-line no-unused-vars
