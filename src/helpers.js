function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    if (key.includes('data-id')) {
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

class EventEmitter {
  constructor(events = {}) {
    this.events = events;
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, arg) {
    if (this.events[type]) {
      this.events[type].forEach(listener => listener(arg));
    }
  }
}

export { createElement, EventEmitter };
