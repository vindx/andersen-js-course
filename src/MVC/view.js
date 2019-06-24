import EventEmitter from '../EventEmitter/EventEmitter';
import {
  ADD_ITEM,
  ADD_RECIPE,
  DELETE_ITEM,
  DELETE_RECIPE,
  REPLACE_VOIDS,
  ERROR_EMPTY_RECIPE_AREA,
  ERROR_EMPTY_ITEMS_AREA,
  ERROR_NOT_ENOUGH_ITEMS,
  ERROR_EXTRA_ITEMS,
  SUCCESS_CREATE_NEW_ITEM,
  ERROR_EMPTY_INPUT,
} from '../utilities/constants';
import { createElement, myAlert } from '../utilities/helpers';
import { dragEnd, dragStart, showIngredients, drop, dragOverForRecipe } from '../utilities/dnd';

class View extends EventEmitter {
  constructor() {
    super();

    this.declarationsAboutRecipes();
    this.declarationsAboutItems();
  }

  // МЕТОДЫ ДЛЯ РАБОТЫ С ВЕРСТАКОМ

  // проверка на наличие рецепта/предметов в верстаке
  handleCraftNewItem() {
    if (!this.recipeArea.childElementCount) {
      myAlert(ERROR_EMPTY_RECIPE_AREA);
    } else if (!this.itemArea.childElementCount) {
      myAlert(ERROR_EMPTY_ITEMS_AREA);
    } else {
      this.createNewItem();
    }
  }

  // сравнение(фильтрация) массива ингредиентов(по рецепту) с массивом предметов
  createNewItem() {
    const newItemName = this.recipeArea.querySelector('div').childNodes[0].textContent;
    const liArray = this.recipeArea.querySelectorAll('li');
    const ingredients = Array.from(liArray).map(element => element.textContent);
    const itemsOnWorkbench = Array.from(this.itemArea.children).map(
      element => element.childNodes[0].textContent
    );
    const missingItems = ingredients.filter(value => !itemsOnWorkbench.includes(value));
    const extraItems = itemsOnWorkbench.filter(value => !ingredients.includes(value));

    if (missingItems.length > 0) {
      myAlert(`${ERROR_NOT_ENOUGH_ITEMS} "${missingItems}"`);
    } else if (extraItems.length > 0) {
      myAlert(`${ERROR_EXTRA_ITEMS} "${extraItems}"`);
    } else {
      myAlert(`${SUCCESS_CREATE_NEW_ITEM} "${newItemName}"`);
      this.emit(ADD_ITEM, newItemName);
    }
  }

  // МЕТОДЫ ДЛЯ РАБОТЫ С РЕЦЕПТАМИ

  // метод получения массива ингредиентов (из инпутов) для добавления в модель
  getIngredients() {
    const elements = this.recipeForm.querySelectorAll('.recipe_element_input');
    return Array.from(elements).reduce(
      (acc, element) => (element.value ? [...acc, element.value] : acc),
      []
    );
  }

  // метод создания рецепта как DOM элемент + подписка на события utilities
  createRecipe(recipe) {
    const deleteButton = createElement(
      'button',
      { className: 'delete_button', onclick: event => event.stopPropagation() },
      'Удалить'
    );
    const liArray = recipe.ingredients.reduce(
      (acc, element) => [...acc, createElement('li', {}, element)],
      []
    );
    const ul = createElement('ul', { className: 'recipe_elements' }, ...liArray);
    const listRecipe = createElement(
      'div',
      {
        className: 'recipe',
        draggable: 'true',
        onclick: showIngredients.bind(this, recipe.id),
        ondragstart: dragStart.bind(this, recipe.id),
        ondragend: dragEnd.bind(this, recipe.id),
        'data-id': recipe.id,
      },
      recipe.name,
      ul,
      deleteButton
    );

    return this.addEventListenersRecipe(listRecipe);
  }

  // подписка на событие click к кнопке "Удалить", вешается в момент создания DOM элемента
  addEventListenersRecipe(recipe) {
    const deleteButton = recipe.querySelector('.delete_button');

    deleteButton.addEventListener('click', this.handleDeleteRecipe.bind(this));

    return recipe;
  }

  // поиск рецепта по уникальному значению
  findRecipe(id) {
    return this.recipeList.querySelector(`[data-id="${id}"]`);
  }

  // метод добавления инпутов для ингредиентов
  handleAddInput() {
    const label = this.recipeForm.querySelector('label');
    const newInput = createElement('input', { className: 'recipe_element_input' });

    label.appendChild(newInput);
  }

  // инициализация добавления рецепта(сразу после сабмита) + проверка полей инпутов
  handleAddRecipe(event) {
    event.preventDefault();
    const firstIngredient = this.recipeForm.querySelector('.recipe_element_input');

    if (
      this.recipeInput.value.replace(REPLACE_VOIDS, '') !== '' &&
      firstIngredient.value.replace(REPLACE_VOIDS, '') !== ''
    ) {
      this.emit(ADD_RECIPE, this.recipeInput.value);
    } else {
      myAlert(ERROR_EMPTY_INPUT);
    }
  }

  // инициализация удаления рецепта
  handleDeleteRecipe(recipe) {
    const listRecipe = recipe.target.parentNode;
    const id = Number(listRecipe.getAttribute('data-id'));

    this.emit(DELETE_RECIPE, id);
  }

  // отображение заранее созданных рецептов(из памяти)
  showRecipes(recipes) {
    recipes.forEach(recipe => {
      const listRecipe = this.createRecipe(recipe);
      this.recipeList.appendChild(listRecipe);
    });
  }

  // добавляет рецепт непосредственно в DOM + скидывает инпуты
  addRecipe(recipe) {
    const listRecipe = this.createRecipe(recipe);
    this.recipeList.appendChild(listRecipe);

    const label = this.recipeForm.querySelector('label');
    const elements = this.recipeForm.querySelectorAll('.recipe_element_input');

    this.recipeInput.value = '';
    elements[0].value = '';
    Array.from(elements)
      .slice(1, elements.length)
      .forEach(element => label.removeChild(element));
  }

  // удаление рецепта из DOM
  deleteRecipe(id) {
    const listRecipe = this.findRecipe(id);

    this.recipeList.removeChild(listRecipe);
  }

  // МЕТОДЫ ДЛЯ РАБОТЫ С ПРЕДМЕТАМИ

  // метод создания рецепта как DOM элемент + подписка на события utilities
  createItem(item) {
    const deleteButton = createElement('button', { className: 'delete_button' }, 'Удалить');
    const listItem = createElement(
      'div',
      {
        className: 'item',
        draggable: 'true',
        ondragstart: dragStart.bind(this, item.id),
        ondragend: dragEnd.bind(this, item.id),
        'data-id': item.id,
      },
      item.name,
      deleteButton
    );

    return this.addEventListenersItem(listItem);
  }

  // подписка на событие click к кнопке "Удалить", вешается в момент создания DOM элемента
  addEventListenersItem(item) {
    const deleteButton = item.querySelector('.delete_button');

    deleteButton.addEventListener('click', this.handleDeleteItem.bind(this));

    return item;
  }

  // поиск предмета по уникальному значению
  findItem(id) {
    return this.itemList.querySelector(`[data-id="${id}"]`);
  }

  // инициализация добавления предмета(сразу после сабмита) + проверка полей инпутов
  handleAddItem(event) {
    event.preventDefault();

    if (this.itemInput.value.replace(REPLACE_VOIDS, '') !== '') {
      this.emit(ADD_ITEM, this.itemInput.value);
    } else {
      myAlert(ERROR_EMPTY_INPUT);
    }
  }

  // инициализация удаления предмета
  handleDeleteItem(item) {
    const listItem = item.target.parentNode;
    const id = Number(listItem.getAttribute('data-id'));

    this.emit(DELETE_ITEM, id);
  }

  // отображение заранее созданных предметов(из памяти)
  showItems(items) {
    items.forEach(item => {
      const listItem = this.createItem(item);
      this.itemList.appendChild(listItem);
    });
  }

  // добавляет предмет непосредственно в DOM + скидывает инпуты
  addItem(item) {
    const listItem = this.createItem(item);
    this.itemList.appendChild(listItem);

    this.itemInput.value = '';
  }

  // удаление предмета из DOM
  deleteItem(id) {
    const listItem = this.findItem(id);

    this.itemList.removeChild(listItem);
  }

  // ОБЪЯВЛЕНИЯ ДЛЯ КОНУСТРУКТОРА

  declarationsAboutRecipes() {
    this.recipeForm = document.querySelector('.create_recipe_area');
    this.recipeInput = document.querySelector('#create_recipe_input');
    this.recipeList = document.querySelector('#recipes_container');
    this.recipeAddInputButton = this.recipeForm.querySelector('.plus_element');

    this.recipeForm.addEventListener('submit', this.handleAddRecipe.bind(this));
    this.recipeAddInputButton.addEventListener('click', this.handleAddInput.bind(this));

    // подписка зоны верстака для рецепта на события DnD
    this.recipeArea = document.querySelector('#workbench_recipe_container');
    this.recipeArea.addEventListener('dragover', dragOverForRecipe.bind(this.recipeArea));
    this.recipeArea.addEventListener('drop', drop.bind(this, this.recipeArea, this.recipeList));
    this.recipeArea.addEventListener(
      'dragleave',
      drop.bind(this, this.recipeList, this.recipeArea)
    );
  }

  declarationsAboutItems() {
    this.itemForm = document.querySelector('.create_item_area');
    this.itemInput = document.querySelector('#create_item_input');
    this.itemList = document.querySelector('#items_container');

    this.itemForm.addEventListener('submit', this.handleAddItem.bind(this));

    // подписка зоны верстака для предметов на события DnD
    this.itemArea = document.querySelector('#workbench_items_container');
    this.itemArea.addEventListener('dragover', event => event.preventDefault());
    this.itemArea.addEventListener('drop', drop.bind(this, this.itemArea, this.itemList));
    this.itemArea.addEventListener('dragleave', drop.bind(this, this.itemList, this.itemArea));

    this.craftingButton = document.querySelector('.create_recipe_item');
    this.craftingButton.addEventListener('click', this.handleCraftNewItem.bind(this));
  }
}

export default View;
