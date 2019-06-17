import { createElement, EventEmitter } from '../helpers';
import { dragEnd, dragStart, showIngredients } from '../DnD/dnd';

class View extends EventEmitter {
  constructor() {
    super();
    // свойства, связанные с рецептами
    this.recipeForm = document.querySelector('.create_recipe_area');
    this.recupeInput = document.querySelector('#create_recipe_input');
    this.recipeList = document.querySelector('#recipes_container');
    this.recipeAddInputButton = this.recipeForm.querySelector('.plus_element');

    this.recipeForm.addEventListener('submit', this.handleAddRecipe.bind(this));
    this.recipeAddInputButton.addEventListener('click', this.handleAddInput.bind(this));

    // свойства, связанные с предметами
    this.itemForm = document.querySelector('.create_item_area');
    this.itemInput = document.querySelector('#create_item_input');
    this.itemList = document.querySelector('#items_container');

    this.itemForm.addEventListener('submit', this.handleAddItem.bind(this));

    // this.recipeArea = document.querySelector('#workbench_recipe_container');
    // this.itemsArea = document.querySelector('#workbench_items_container');
    // this.craftingButton = document.querySelector('.create_recipe_item');
    // this.recipes = document.querySelector('#recipes_container');
    //
    // this.craftingButton.addEventListener('click', this.handleCraft.bind(this));
    // this.recipeArea.addEventListener('dragenter', dropRecipe.bind(this.recipes.findItem(item.id)));
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

  // метод создания рецепта как DOM элемент
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
        onclick: showIngredients.bind(this.recipeList, recipe.id),
        ondragstart: dragStart.bind(this.recipeList, recipe.id),
        ondragend: dragEnd.bind(this.recipeList, recipe.id),
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
      this.recupeInput.value.replace(/\s/g, '') !== '' &&
      firstIngredient.value.replace(/\s/g, '') !== ''
    ) {
      this.emit('addRecipe', this.recupeInput.value);
    }
  }

  // инициализация удаления рецепта
  handleDeleteRecipe(recipe) {
    const listRecipe = recipe.target.parentNode;
    const id = Number(listRecipe.getAttribute('data-id'));

    this.emit('deleteRecipe', id);
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

    this.recupeInput.value = '';
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

  // метод создания рецепта как DOM элемент
  createItem(item) {
    const deleteButton = createElement('button', { className: 'delete_button' }, 'Удалить');
    const listItem = createElement(
      'div',
      {
        className: 'item',
        draggable: 'true',
        ondragstart: dragStart.bind(this.itemList, item.id),
        ondragend: dragEnd.bind(this.itemList, item.id),
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

    if (this.itemInput.value.replace(/\s/g, '') !== '') {
      this.emit('addItem', this.itemInput.value);
    }
  }

  // инициализация удаления предмета
  handleDeleteItem(item) {
    const listItem = item.target.parentNode;
    const id = Number(listItem.getAttribute('data-id'));

    this.emit('deleteItem', id);
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
}

export default View;
