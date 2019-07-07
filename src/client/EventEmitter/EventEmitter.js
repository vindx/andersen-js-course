class EventEmitter {
  constructor(events = {}) {
    this.events = events;
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(listener => listener(...args));
    }
  }
}

export default EventEmitter;
