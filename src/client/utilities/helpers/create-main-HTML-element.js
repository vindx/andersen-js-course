import createElement from './create-HTML-element-blueprint';

const createMainHTMLElement = element => {
  const changingButton = createElement(
    'button',
    { className: 'element_changing_button', onclick: event => event.stopPropagation() },
    'Изменить'
  );
  const deleteButton = createElement(
    'button',
    { className: 'element_delete_button', onclick: event => event.stopPropagation() },
    'Удалить'
  );
  const elementItem = createElement('p', { className: 'element_name' }, element.title);
  const elements = createElement('div', { className: 'elements' }, elementItem);
  const elementButtons = createElement(
    'div',
    { className: 'element_buttons' },
    changingButton,
    deleteButton
  );
  return createElement(
    'div',
    // eslint-disable-next-line no-underscore-dangle
    { className: 'element_header' },
    elements,
    elementButtons
  );
};

export default createMainHTMLElement;
