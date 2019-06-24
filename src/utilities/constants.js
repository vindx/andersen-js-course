const ADD_ITEM = `addItem`;
const ADD_RECIPE = `addRecipe`;
const DELETE_ITEM = `deleteItem`;
const DELETE_RECIPE = `deleteRecipe`;

const REPLACE_VOIDS = /\s+/g;

const ERROR_EMPTY_RECIPE_AREA = `В верстаке нет рецепта! Исправь это, пожалуйста`;
const ERROR_EMPTY_ITEMS_AREA = `В верстаке ни одного предмета! Исправь это, пожалуйста`;
const ERROR_NOT_ENOUGH_ITEMS = `В рецепте не так! Тут не хватает:`;
const ERROR_EXTRA_ITEMS = `В верстаке есть лишние предметы:`;
const SUCCESS_CREATE_NEW_ITEM = `Поздравляю! Ты создал(а)`;
const ERROR_EMPTY_INPUT = `Заполни, пожалуйста, обязательные поля!`;

export {
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
};
