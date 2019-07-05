function createElement(tag, props, ...children) {
  const element = document.createElement(tag);
  Object.keys(props).forEach(key => {
    if (key.includes('data-id') || key.includes('ondrag')) {
      element.setAttribute(key, props[key]);
    }
    element[key] = props[key];
  });
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
}

export default createElement;
