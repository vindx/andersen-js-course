// скрытие кнопки "Удалить" предмета/рецепта при старте перетаскивания
export function dragStart(id) {
  const item =
    this.itemList.querySelector(`[data-id="${id}"]`) ||
    this.itemArea.querySelector(`[data-id="${id}"]`) ||
    this.recipeList.querySelector(`[data-id="${id}"]`) ||
    this.recipeArea.querySelector(`[data-id="${id}"]`);
  const deleteButton = item.querySelector('.delete_button');
  deleteButton.style.display = 'none';
  // установка маркера для определения элемента при входе в обсласть верстака
  item.setAttribute('status', 'dragged');
}

// возврат кнопки "Удалить" при отпускании предмета/рецепта
export function dragEnd(id) {
  const item =
    this.itemList.querySelector(`[data-id="${id}"]`) ||
    this.itemArea.querySelector(`[data-id="${id}"]`) ||
    this.recipeList.querySelector(`[data-id="${id}"]`) ||
    this.recipeArea.querySelector(`[data-id="${id}"]`);
  const deleteButton = item.querySelector('.delete_button');
  deleteButton.style.display = '';
  item.setAttribute('status', 'dropped');
}

// отображение списка ингредиентов рецепта
export function showIngredients(id) {
  const item =
    this.recipeList.querySelector(`[data-id="${id}"]`) ||
    this.recipeArea.querySelector(`[data-id="${id}"]`);
  const ingredients = item.querySelector('.recipe_elements');
  if (ingredients.style.display === 'block') {
    ingredients.style.display = '';
  } else {
    ingredients.style.display = 'block';
  }
}

// положить предмет/рецепт в верстак + возврат предмета/рецепт с верстака
export function drop(area, items) {
  const item = items.querySelector(`[status="dragged"]`);
  if (item) {
    area.appendChild(item);
  }
}

// проверка на наличие рецепта в верстаке
export function dragOverForRecipe(event) {
  return this.recipeArea.children.length > 0 || event.preventDefault();
}
