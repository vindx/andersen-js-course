function dnd() {
  const recipesContainer = document.querySelector('#recipes_container');
  const itemsContainer = document.querySelector('#items_container');
  const workbenchRecipeContainer = document.querySelector('#workbench_recipe_container');
  const workbenchItemsContainer = document.querySelector('#workbench_items_container');
  const recipes = document.querySelectorAll('.recipe');
  const items = document.querySelectorAll('.item');

  // скрытие кнопки "Удалить" предмета/рецепта при старте перетаскивания
  function dragStart(event) {
    const deleteButton = event.target.querySelector('.delete_button');
    deleteButton.style.display = 'none';
    // атрибут для дальнейшего определения предмета/рецепта среди их множества
    event.target.setAttribute('status', 'dragged');
  }

  // возврат кнопки "Удалить" при отпускании предмета/рецепта
  function dragEnd(event) {
    const deleteButton = event.target.querySelector('.delete_button');
    if (deleteButton.style.display === 'none') {
      deleteButton.style.display = '';
    } else {
      deleteButton.style.display = 'none';
    }
    // атрибут для дальнейшего определения предмета/рецепта среди их множества
    event.target.setAttribute('status', 'dropped');
  }

  // отображение списка ингредиентов рецепта
  function showIngredients(event) {
    const ingredients = event.target.querySelector('.recipe_elements');
    if (ingredients.style.display === 'block') {
      ingredients.style.display = '';
    } else {
      ingredients.style.display = 'block';
    }
  }

  // положить предмет в верстак
  function dropItems() {
    Array.from(items).forEach(element => {
      if (element.getAttribute('status') === 'dragged') {
        this.appendChild(element);
      }
    });
  }

  // проверка на наличие рецепта в верстаке
  function dragOverForRecipe(event) {
    return this.children.length > 0 || event.preventDefault();
  }

  // положить рецепт в верстак
  function dropRecipe() {
    Array.from(recipes).forEach(element => {
      if (element.getAttribute('status') === 'dragged') {
        this.appendChild(element);
      }
    });
  }

  // возврат предмета(ов) с верстака
  function dragLeaveForItems() {
    Array.from(items).forEach(element => {
      if (element.getAttribute('status') === 'dragged') {
        itemsContainer.appendChild(element);
      }
    });
  }

  // возврат рецепта с верстака
  function dragLeaveForRecipe() {
    Array.from(recipes).forEach(element => {
      if (element.getAttribute('status') === 'dragged') {
        recipesContainer.appendChild(element);
      }
    });
  }

  // все слушатели, связанные с предметами
  Array.from(items).forEach(element => {
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragend', dragEnd);
  });
  workbenchItemsContainer.addEventListener('dragover', event => event.preventDefault());
  workbenchItemsContainer.addEventListener('drop', dropItems);
  workbenchItemsContainer.addEventListener('dragleave', dragLeaveForItems);

  // все слушатели, связанные с рецептами
  Array.from(recipes).forEach(element => {
    element.addEventListener('click', showIngredients);
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragend', dragEnd);
  });
  workbenchRecipeContainer.addEventListener('dragover', dragOverForRecipe);
  workbenchRecipeContainer.addEventListener('drop', dropRecipe);
  workbenchRecipeContainer.addEventListener('dragleave', dragLeaveForRecipe);
}

dnd();
