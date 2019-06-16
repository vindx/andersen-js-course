import './styles/main.css';
import './DnD/dnd';
import ItemsModel from './Items/model';
import ItemsView from './Items/view';
import ItemsController from './Items/controller';

import RecipesModel from './Recipes/model';
import RecipesView from './Recipes/view';
import RecipesController from './Recipes/controller';

const startingItems = [
  {
    name: 'Камень',
    id: Date.now() + 1,
  },
  {
    name: 'Палка',
    id: Date.now() + 2,
  },
  {
    name: 'Веревка',
    id: Date.now() + 3,
  },
];

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

const itemsModel = new ItemsModel(startingItems);
const itemsView = new ItemsView();
const itemsController = new ItemsController(itemsModel, itemsView); // eslint-disable-line no-unused-vars

const recipesModel = new RecipesModel(startingRecipes);
const recipesView = new RecipesView();
const recipesController = new RecipesController(recipesModel, recipesView); // eslint-disable-line no-unused-vars
