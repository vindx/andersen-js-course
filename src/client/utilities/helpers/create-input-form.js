import createElement from './create-HTML-element-blueprint';

const createInputForm = () => {
  const input = createElement('input', {
    type: 'text',
    className: 'sub_adding_input',
    placeholder: 'Наименование',
  });
  const label = createElement('label', {}, input);
  const createButton = createElement(
    'button',
    { className: 'sub_adding_button' },
    'Добавить кабинет'
  );
  const form = createElement('form', {}, label, createButton);
  return createElement(
    'div',
    { className: 'sub_elements', onclick: event => event.stopPropagation() },
    form
  );
};

export default createInputForm;
