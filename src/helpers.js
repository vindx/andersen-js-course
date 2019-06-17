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

function myAlert(string) {
  const messageArea = document.querySelector('.messages_area');
  const alertMessage = messageArea.querySelector('h2');
  alertMessage.textContent = string;
  if (messageArea.style.visibility === 'hidden') {
    messageArea.style.visibility = '';
  } else {
    messageArea.style.visibility = 'hidden';
  }
  setTimeout(function abc() {
    messageArea.style.visibility = 'hidden';
  }, 1000);
}

export { createElement, EventEmitter, myAlert };
